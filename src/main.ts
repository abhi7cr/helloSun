import { enableProdMode } from '@angular/core';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapWorkerUi, WORKER_UI_LOCATION_PROVIDERS , UiArguments, FnArg, PRIMITIVE, SerializerTypes, ServiceMessageBrokerFactory,  ClientMessageBrokerFactory} from '@angular/platform-webworker';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const SPOTIFY_CHANNEL = 'SPOTIFY';

if (environment.production) {
  enableProdMode();
}

//platformBrowserDynamic().bootstrapModule(AppModule);
bootstrapWorkerUi('../webworker.bundle.js', WORKER_UI_LOCATION_PROVIDERS)
.then((ref: any)=> {
	   let brokerFactory: ServiceMessageBrokerFactory = ref.injector.get(ServiceMessageBrokerFactory);
	   let broker = brokerFactory.createMessageBroker(SPOTIFY_CHANNEL, false);
   	   broker.registerMethod("authorize", [PRIMITIVE], (url: string) =>{
   	   		window.location.assign(url+'&redirect_uri='+ window.location.href), PRIMITIVE
   	   	});
   	   broker.registerMethod("getAccessToken", [], () => {
			return Promise.resolve(localStorage.getItem('access_token'));
   	   		// return new Promise<any>((resolve) => { 
			// 		  	 let access_token:string = localStorage.getItem('access_token');
			// 			 resolve(access_token) 
		    }, PRIMITIVE);

       broker.registerMethod("setAccessToken", [PRIMITIVE], (access_token: string) => {
					  	 localStorage.setItem('access_token', access_token), PRIMITIVE
			  });
});
