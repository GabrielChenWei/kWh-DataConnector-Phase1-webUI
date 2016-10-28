(function SilverlightJsBridge(appContainer) {
  if (!appContainer) {
    throw new Error('The module \'ApplicationContainer\' is required');
  }

  var stateMap = {
    fullScreen: false,
    silverlightContainer: null,
    wasShellOpenBeforeFullScreen: false
  };

  var jQueryMap = {
    $siteHeader: $('#site-header'),
    $mainContent: $('#mainContent'),
    $leftPane: $('#left-pane')
  };
  
  var isHtmlVisible = function () {
    if ($('#sl-container').data('splitter')) {
      return (jQueryMap.$mainContent.width() - jQueryMap.$leftPane.width()) > $('#sl-container').data('splitter').position();
    }
    return true;
  }

  var toggleSplitView = function () {
    var splitter = $('#sl-container').data('splitter');
    if (!isHtmlVisible()) {
      splitter.position('50%');
      splitter.refresh();
    } else {
      splitter.position('100%');
      splitter.refresh();
    }
  };

  var toggleFullScreen = function () {
    stateMap.fullScreen = !stateMap.fullScreen;
    if (stateMap.fullScreen) {
      if (isHtmlVisible()) {
        stateMap.wasShellOpenBeforeFullScreen = true;
        toggleSplitView();
      }
      jQueryMap.$siteHeader.hide();
    } else {
      if (stateMap.wasShellOpenBeforeFullScreen) {
        stateMap.wasShellOpenBeforeFullScreen = false;
        toggleSplitView();
      }
      jQueryMap.$siteHeader.show();
    }
    appContainer.resizeMainContent();
  };

  var pluginLoaded = function (sender) {
    this.silverlightContainer = sender.getHost();
  };

  var showJobsForAsset = function (assetId) {
    if (assetId) {
      if (!isHtmlVisible()) {
        toggleSplitView();
      }
      $(window).trigger('sl_showjobsforasset', { assetId: assetId });
    }
  };

  var showJob = function (jobId) {
    if (jobId) {
      if (!isHtmlVisible()) {
        toggleSplitView();
      }
      $(window).trigger('sl_showjob', { jobId: jobId });
    }
  };

  var showJobsForFault = function (faultId) {
    if (faultId) {
      if (!isHtmlVisible()) {
        toggleSplitView();
      }
      $(window).trigger('sl_showjobsforfault', { faultId: faultId });
    }
  };

  var hideJobsForFault = function () {
    $(window).trigger('sl_hidejobsforfault');
  }

  var createMultiAssetDataCorrectionJob = function (assetKind, assetIds) {
    var parsedAssetIds = JSON.parse(assetIds);
    if (parsedAssetIds) {
      if (!isHtmlVisible()) {
        toggleSplitView();
      }
      $(window).trigger('sl_createmadcjob', { assetKind: assetKind, assetIds: parsedAssetIds });
    }
  };

  var setAssetSelection = function (arrayOfAssetSelectionsJson) {
    $(window).trigger('sl_assetselection', { newValue: JSON.parse(arrayOfAssetSelectionsJson || []) });
  };

  appContainer.SilverlightJsBridge = {
    setAssetSelection: setAssetSelection,
    isHtmlVisible: isHtmlVisible,
    toggleFullScreen: toggleFullScreen,
    pluginLoaded: pluginLoaded,
    toggleSplitView: toggleSplitView,
    showJobsForAsset: showJobsForAsset,
    showJob: showJob,
    showJobsForFault: showJobsForFault,
    hideJobsForFault: hideJobsForFault,
    createMultiAssetDataCorrectionJob: createMultiAssetDataCorrectionJob
};
})(ApplicationContainer);

var getSilverlightBridgeObject = function () {
  return ApplicationContainer.SilverlightJsBridge;
};
