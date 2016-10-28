(function JsSilverlightBridge(appContainer) {
  if (!appContainer) {
    throw new Error('The module \'ApplicationContainer\' is required');
  }

  appContainer.JsSilverlightBridge = (function() {
    var getBridge = function () {
      return document.getElementById('sl-obj').content.JSSilverlightBridge;
    }

    return {
      setAssetSelectionForJobs: function(assetIds) {
        getBridge().SelectAssetsForJob(JSON.stringify(assetIds));
      },
      printJob: function(jobId, assetId) {
        getBridge().PrintJob(jobId, assetId);
      },
      printMultipleJobs: function(jobIds, assetIds) {
        getBridge().PrintMultipleJobs(JSON.stringify(jobIds), JSON.stringify(assetIds));
      }
    }
  })();
})(ApplicationContainer);
