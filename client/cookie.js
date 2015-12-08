var CookieHandler = (function() {

  var url = 'http://server.dev:4567/cookie';
  var cookieName = '_client.cookie';

  var init = function() {
    makeRequest();
  };

  var makeRequest = function() {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = onRequestComplete;
    httpRequest.open('POST', url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequest.withCredentials = true;
    httpRequest.send();
  };

  var onRequestComplete = function() {
    var COMPLETE = 4
    var OK = 200;

    if (this.readyState === COMPLETE && this.status == OK) {
      createCookie(this.response);
      showCookieValues();
    }
  };

  var createCookie = function(data) {
    document.cookie = cookieName + "=" + data;
  };

  var showCookieValues = function() {
    var cookie = getCookie();
    document.getElementById('cookie-id').innerHTML = cookie.id;
    document.getElementById('cookie-creation').innerHTML = cookie.creation_time;
  };

  var getCookie = function() {
    var re = new RegExp(cookieName + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? JSON.parse(unescape(value[1])) : null;
  }

  return {
    init : init
  };

})();

window.addEventListener("load", CookieHandler.init);
