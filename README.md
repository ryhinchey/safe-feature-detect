# 🕵️ safe-feature-detect

A lightweight and extendable feature detection library heavily inspired by the great [Feature.js](http://featurejs.com/).  Like Feature.js, this library stays under 1kb minified & gzipped.
In addition, `safe-feature-detect` caches detections and will not throw an error if for some reason it's called during server side rendering.

## Installation
`npm install safe-feature-detect`

## Usage

```javascript
  const { features, addFeature } = require('safe-feature-detect');

  features.matchMedia()
  features.deviceMotion()
  features.deviceOrientation()
  features.historyAPI()
  features.serviceWorker()
  features.touch()
  features.async()
  features.defer()
  features.fetch()
  features.srcset()
  features.sizes()
  features.HTMLPictureElement()
  features.webworkers()
  features.intl()
  features.fileReader()
  features.flex()
  features.sticky()

  addFeature('localStorage', () => {
    try {
      window.localStorage.setItem('test', 'foo');
      window.localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  });

  features.localStorage();
```
