(() => {
  'use strict';
  const config = window.CONTACT_PAGE || {};
  document.title = config.title || 'Contact us';
  if (config.backgroundImage) {
    try {
      const image = new URL(config.backgroundImage, location.href);
      if (['https:', 'http:'].includes(image.protocol)) {
        document.querySelector('.backdrop').style.backgroundImage = `url(${JSON.stringify(image.href)})`;
      }
    } catch (_) { /* Keep the built-in gradient if the image URL is invalid. */ }
  }
  const link = document.querySelector('#contact-link');
  let destination;
  try {
    const url = new URL(config.whatsappUrl);
    if (url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com'].includes(url.hostname) && url.pathname !== '/') {
      if (config.message) url.searchParams.set('text', config.message);
      destination = url.href;
    }
  } catch (_) { /* Missing destination is a preview state, never a third-party contact. */ }
  if (destination) {
    link.href = destination;
    link.rel = 'noopener noreferrer';
  } else {
    document.querySelector('#setup').hidden = false;
    link.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('#setup').focus();
    });
  }
  // Do not prevent touchstart, contextmenu or pointerdown: iOS owns link previews.
  const ua = navigator.userAgent;
  const android = /Android/i.test(ua);
  const ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  const inApp = /TikTok|musical_ly|Bytedance|trill|Instagram|FBAN|FBAV|ByteLocale|BytedanceWebview/i.test(ua) || (android && /; wv\)/i.test(ua));
  // Explicit visual previews only; production links should omit this parameter.
  const preview = new URLSearchParams(location.search).get('preview');
  const showAndroid = preview === 'android' || (preview !== 'ios' && android && inApp);
  document.querySelector('.browser-help').hidden = !showAndroid;
  document.querySelector('.menu-arrow').toggleAttribute('hidden', !showAndroid);
  link.hidden = showAndroid;
  document.querySelector('.fallback').hidden = showAndroid;
  document.body.classList.toggle('android-guide', showAndroid);
  // Once opened externally on Android, continue to WhatsApp; desktop goes directly too.
  if (destination && !showAndroid && preview !== 'ios' && !ios) {
    location.replace(destination);
  }
})();

