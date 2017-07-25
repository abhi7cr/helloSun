// Route #1
toolbox.router.get('/(.*)', toolbox.cacheFirst, {
  cache: {
    name: 'googleapis',
    maxEntries: 20,
  },
  origin: /\.googleapis\.com$/
});

// Route #2
toolbox.router.get('/(.*)', toolbox.cacheFirst, {
  cache: {
    name: 'apisgoogle',
    maxEntries: 20,
  },
  origin: /apis.google\.com$/
});

// Route #3
toolbox.router.get('/(.*)', toolbox.cacheFirst, {
  cache: {
    name: 'bootstrap-cdn',
    maxEntries: 5
  },
  origin: /\.bootstrapcdn\.com$/
});

// Route #3
toolbox.router.get(/\.(?:png|gif|jpg)$/, toolbox.cacheFirst, {
  cache: {
    name: 'images-cache',
    maxEntries: 50
  }
});