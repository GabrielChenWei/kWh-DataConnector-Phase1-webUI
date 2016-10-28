Global.addLoadEvent(function() {
  var keepAliveTimeout = 5 * 60 * 1000; // ms
  var errorKeepAliveTimeout = 10 * 1000; // ms
  var appRoot = $('meta[name=applicationRoot]').attr("content");

  // use post request to avoid caching
  function keepAlive() {
    $.ajax({
      url: appRoot + "/home/keepalive",
      type: 'POST',
      success: function() {
        setTimeout(keepAlive, keepAliveTimeout);
      },
      error: function() {
        setTimeout(keepAlive, errorKeepAliveTimeout);
      }
    });
  }

  // periodically send keep alive to refresh the browser cookies
  // you need to disable httpOnly on the server, see global.asax            
  setTimeout(keepAlive, keepAliveTimeout);

  //        Code against clickjacking. See https://www.owasp.org/index.php/Clickjacking 
  //        Page will appear empty by default, and show the content only if Javascript is enabled 
  //        and this script has been executed
  if (self === top) {
    var silverlightContainer = document.getElementById("sl-wrapper");
    if (silverlightContainer) {
      silverlightContainer.style.display = "block";
    }
  } else {
    top.location = self.location;
  }
});
