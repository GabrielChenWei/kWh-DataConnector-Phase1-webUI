var ApplicationContainer = (function ($) {
  var
    jQueryMap = {
      $siteHeader: $('#site-header'),
      $mainContent: $('#mainContent'),
      $logOff: $('#logOff'),
      $selectedSiteId: $('#selectedSiteId'),
      $leftPane: $('#left-pane'),
      $rightPane: $('#right-pane'),
      $splitter: null
    },
    initModule,
    logOff,
    resizeMainContent,
    getViewportBounds,
    getShellBridgeObject;

  getShellBridgeObject = function () {
    var hideSilverlight = function () {
      jQueryMap.$splitter.position(0);
      jQueryMap.$splitter.refresh();
    };

    var showSilverlight = function () {
      jQueryMap.$splitter.position('50%');
      jQueryMap.$splitter.refresh();
    };

    var hideShell = function () {
      getSilverlightBridgeObject().toggleSplitView();
    };

    return {
      hideSilverlight: hideSilverlight,
      showSilverlight: showSilverlight,
      hideShell: hideShell
    };
  };

  logOff = function () {
    var logOffUrl = $('#logOffUrl');
    var aft = logOffUrl.text();

    var form = $('<form><input type="hidden" name="__XAntiForgeryToken__" value="' + aft + '"></form>');
    form.attr(
    {
      id: 'formform',
      action: logOffUrl.attr('href'),
      method: 'POST',
    });

    $('body').append(form);
    $('#formform').submit();
    $('#formform').remove();
  };

  getViewportBounds = function () {
    var viewportwidth;
    var viewportheight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth !== 'undefined') {
      viewportwidth = window.innerWidth;
      viewportheight = window.innerHeight;
    } else if (typeof document.documentElement !== 'undefined'
      && typeof document.documentElement.clientWidth !== 'undefined'
      && document.documentElement.clientWidth !== 0) {
      // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
      viewportwidth = document.documentElement.clientWidth;
      viewportheight = document.documentElement.clientHeight;
    } else {
      // older versions of IE
      viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
      viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    }

    return {
      width: viewportwidth,
      height: viewportheight
    };
  };

  resizeMainContent = function () {
    var viewportBounds = getViewportBounds();
    var h = viewportBounds.height;
    var hHeader = jQueryMap.$siteHeader.outerHeight(true); /*height + margin*/
    var margin = 25;
    var hMainContent = h - hHeader - margin;

    var hOtherContent = jQueryMap.$mainContent.outerHeight();
    if (hOtherContent < hMainContent) {
      jQueryMap.$mainContent.outerHeight(hMainContent);
    }

    if (jQueryMap.$siteHeader.is(':visible')) {
      jQueryMap.$mainContent.css('height', function () { return h - hHeader - margin; });
    } else {
      jQueryMap.$mainContent.css('height', h - margin);
    }
    $('#page-wrapper').css('height', function () { return h - hHeader - margin - 100; });

    $('#right-pane').show();

    if (viewportBounds.width < 767) {
      var adminHeader = $('#admin-header').outerHeight(true);
      var sideMenuHeight = $('#side-menu').outerHeight(true);
      var tabBarHeight = $('#tab-bar').outerHeight(true);
      var newHeight = h - margin - hHeader - adminHeader - tabBarHeight - sideMenuHeight;
      $('#page-wrapper').outerHeight(newHeight);
    }

    if ($('#admin-pane').length > 0) {
      $('#admin-pane').css('height', function () { return $(window).height() - hHeader - 167; });
    }

    if ($('#admin-side-nav').length > 0) {
      $('#admin-side-nav').css('min-height', function () { return $(window).height() - hHeader - 190; });
    }

    if ($('#view-container').length > 0) {
      $('#view-container').css('height', function () { return $(window).height() - hHeader - 170; });
    }

    if ($('#user-preferences-container').length > 0) {
      $('#user-preferences-container').css('height', function () { return $(window).height() - hHeader - 180; });
    }
  };

  initModule = function () {
    jQueryMap.$selectedSiteId.change(function () {
      $(this).parents('form').submit();
    });

    $().ready(function () {
      var isAmsEnabled = $('#right-pane').length > 0;
      if (isAmsEnabled) {
        jQueryMap.$splitter = $('#sl-container').split({
          limit: 0,
          orientation: 'vertical',  
          position: '100%'
        });
      }
    });

    jQueryMap.$logOff.click(logOff);
    $('#logOff').attr('href', '#');

    $(window).resize(resizeMainContent);
    resizeMainContent();

    $('form input[type="text"]:first').focus();
  };

  return {
    initModule: initModule,
    resizeMainContent: resizeMainContent,
    getShellBridgeObject: getShellBridgeObject
  };

})(jQuery);

Global.addLoadEvent(function () {
  ApplicationContainer.initModule($);
});
