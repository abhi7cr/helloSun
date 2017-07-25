import { enableProdMode } from '@angular/core';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapWorkerUi, WORKER_UI_LOCATION_PROVIDERS , UiArguments, FnArg, PRIMITIVE, ServiceMessageBrokerFactory,  ClientMessageBrokerFactory} from '@angular/platform-webworker';

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
   	
});
