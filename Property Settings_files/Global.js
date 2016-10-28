var Global = (function() {
  var addLoadEvent = function (func) {
    if (window.addEventListener) {
      window.addEventListener('load', func, false);
    } else if (window.attachEvent) {
      window.attachEvent('load', func);
    }
  }

  return {
    addLoadEvent: addLoadEvent
  };
})();
