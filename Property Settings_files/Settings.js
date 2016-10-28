(function() {
    $(document).ready(function () {

        var actionName = window.location.pathname.toLocaleLowerCase();

        $("#tab-container a").each(function () {
            if (getNormalisedHref.call(this) == actionName) {
                $(this).parent().addClass("selected");
            } else {
                if (actionName == "/" || actionName.match(/\/settings$/) || actionName.match(/\/userpreferences$/)) {
                    $("#tab-container li:first").addClass("selected");
                } else {
                    $("#tab-container li:nth-child(2)").addClass("selected");
                }
            }
        });
        
        var allMenuItemsUnselected = true;

        $("#admin-side-nav a").each(function () {
            if (getNormalisedHref.call(this) == actionName) {
                $(this).parent().addClass("selected");
                allMenuItemsUnselected = false;
                adjustPaddingForTwoLines.call(this);
                return;
            }

            adjustPaddingForTwoLines.call(this);
        });

        if (allMenuItemsUnselected) {
            $("#admin-side-nav li:first").addClass("selected");
        }

        function getNormalisedHref() {
            if ($(this).attr("href") == null) {
                return null;
            } else {
                return ($(this).attr("href").toLocaleLowerCase());
            }
        }
        
        function adjustPaddingForTwoLines() {
            if ($(this).text().length > 23) {
                $(this).addClass("wrapped");
            }
        }

        $('#activity-indicator').hide();
    });
})();
