if (Cookies.get('cookieConsent') === undefined) {
  var visibleClass = 'cookie-consent cookie-consent--visible';
  var invisibleClass = 'cookie-consent cookie-consent--invisible';
  var cookieDiv = document.getElementsByClassName('cookie-consent')[0];
  cookieDiv.className = visibleClass;

  document.getElementsByClassName('cookie-consent__confirmation')[0].addEventListener('click', function(e) {
    Cookies.set('cookieConsent', 'confirmed');
    cookieDiv.className = invisibleClass;
  });
}
