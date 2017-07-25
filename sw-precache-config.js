module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css'
  ],
   runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 20,
          name: 'google-apis-cache'
        }
      }
    },
    {
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 20,
          name: 'google-apis-cache'
        }
      }
    },
    {
     urlPattern: /^https:\/\/apis\.google\.com\/js\/api\.js/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 20,
          name: 'apis-google-cache'
        }
      }
    },
    {
     urlPattern: /^https:\/\/code\.jquery\.com/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 20,
          name: 'jquery-cache'
        }
      }
    },
    {
     urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 20,
          name: 'boostrap-cdn-cache'
        }
      }
    },
    {
     urlPattern: /^https:\/\/api\.spotify\.com\/v1/,
      handler: 'networkFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 20,
          name: 'spotify-api-cache'
        }
      }
    },
     {
     urlPattern: /^https:\/\/p\.scdn\.co\/mp3\-preview\//,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 20,
          name: 'spotify-preview-tracks-cache'
        }
      }
     },
    {
     urlPattern: /^https:\/\/i\.scdn\.co\/image\//,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 20,
          name: 'spotify-album-cover-cache'
        }
      }
     }
  ],
   // importScripts: [
   //    'sw-toolbox.js',
   //    'toolbox-script.js'
   //  ],
  maximumFileSizeToCacheInBytes: 5000000
};
