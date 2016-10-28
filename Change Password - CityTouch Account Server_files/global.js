function monitorCapsLock() {
    CapsLock.addListener(
        function (status) {
            if (status) {
                $('.capslock').removeClass('hidden');
            } else {
                $('.capslock').addClass('hidden');
            }
        });
}

function clonePager() {
    var $pagination = $(".pagination:last");
    if ($pagination) {
        var div = $("<div class='pager'></div>");
        $pagination.clone().appendTo(div);
        div.prependTo("#grid-list");
    }
}

function init() {
    $('#signinform').submit(function () {
        $("#Username").val($("#Username").val().toLowerCase());
        return true;
    });

    (function () {
        $.fn.extend({
            dataantiforgery: function (n) {
                var t;
                return t = {}, $.extend(t, n), this.find("*[data-antiforgery]").each(function () {
                    var a;
                    var c = $(this).data("confirm");
                    return a = $(this).data("antiforgery"), $(this).on("click", function (e) {
                        if (e.result === false) { return false; }

                        var href = $(this).attr('href');
                        if (typeof href === typeof undefined || href === null) {
                            href = $(this).data('href');
                        }
                        if (typeof href === typeof undefined || href === null) {
                            return false;
                        }

                        var submitFunc = function () {

                            var form = $("<form>" + a + "</form>");
                            form.attr(
                            {
                                id: "formform",
                                action: href,
                                method: "POST",
                            });

                            $("body").append(form);
                            $("#formform").submit();
                            $("#formform").remove();
                        }

                        if (c) {
                            bootbox.dialog({ animate: false, message: c, title: "Confirmation", buttons: { yes: { label: "Yes", className: "btnConfirmYes", callback: submitFunc }, no: { label: "No", className: "btnConfirmNo" } } });
                        } else {
                            submitFunc();
                        }

                        return false;
                    });
                });
            }
        });
    }).call(this);

    $('body').dataantiforgery();

    $("*[data-autopostback]").change(function () {
        $(this).closest('form').submit();
    });

    monitorCapsLock();
    clonePager();

    setTimeout(function () {
        $(".autohide").hide(500);
    }, 3000);
}

$(function () { init(); });
