const cache = (fn) => {
  let value;
  return () => {
    if (value === undefined) {
      value = fn();
    }

    return value;
  };
};

const safe = (fn) => {
  if (typeof window !== 'undefined') {
    return () => fn();
  }

  return () => { };
};

export const features = {
  matchMedia: safe(cache(() => !!window.matchMedia)),

  deviceMotion: safe(cache(() => ('DeviceMotionEvent' in window))),

  deviceOrientation: safe(cache(() => ('DeviceOrientationEvent' in window))),

  historyAPI: safe(cache(() => window.history && 'pushState' in window.history)),

  serviceWorker: safe(cache(() => 'serviceWorker' in (window.navigator || {}))),

  // Tests if touch events are supported, but doesn't necessarily reflect a
  // touchscreen device
  touch: safe(cache(() => !!(('ontouchstart' in window) ||
    (window.navigator || {}).msPointerEnabled &&
    window.MSGesture ||
    window.DocumentTouch &&
    document instanceof DocumentTouch))),

  async: safe(cache(() => ('async' in document.createElement('script')))),

  defer: safe(cache(() => ('defer' in document.createElement('script')))),

  fetch: safe(cache(() => 'fetch' in window)),

  srcset: safe(cache(() => ('srcset' in document.createElement('img')))),

  sizes: safe(cache(() => ('sizes' in document.createElement('img')))),

  HTMLPictureElement: safe(cache(() => ('HTMLPictureElement' in window))),

  webworkers: safe(cache(() => 'Worker' in window)),

  intl: safe(cache(() => 'Intl' in window)),

  fileReader: safe(cache(() => 'FileReader' in window)),

  flex: safe(cache(() => {
    const el = document.createElement('p');
    el.style.flexBasis = '1px';

    return el.style.flexBasis === '1px';
  })),

  sticky: safe(cache(() => {
    const el = document.createElement('p');
    el.style.position = 'sticky';

    return el.style.position === 'sticky';
  })),
};


export const addFeature = (name, test) => {
  if (typeof test !== 'function') {
    throw new TypeError('Feature test is not a Function');
  }

  features[name] = safe(cache(test));
};

