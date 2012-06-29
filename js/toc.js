;(function($){
$.treelist = $.treelist || {};
$.treelist.options = {
    controlClass: "treelist-control",
    collapsedClass: "treelist-collapsed",
    expandedClass: "treelist-expanded",
    titleClass: "treelist-title",
    titleClass: "treelist-control-title",
    expandedHtml: "&#9662;",
    collapsedHtml: "&#9656;",
    titleSelector: "a, .treelist-title",
    speed: 100,
    activeSelector: "",
    activeClass: "active"
};
$.treelist.buildTree_ = function (ITEM, OPTIONS) {
    var TEMP = $("<div/>");
    $(ITEM).after(TEMP);
    $(ITEM).detach();
    try {
        $("ol,ul", ITEM).prev(OPTIONS.titleSelector).each(function (ITEM, TEMP) {
            var LINK = $("<a></a>", {
                "class": OPTIONS.controlClass
            }).html(OPTIONS.collapsedHtml);
            $(TEMP).addClass(OPTIONS.titleClass).before(LINK);
            LINK.bind("expand", function (ITEM, TEMP) {
                TEMP = "undefined" !== typeof TEMP ? TEMP : OPTIONS.speed;
                $(this).html(OPTIONS.expandedHtml).removeClass(OPTIONS.collapsedClass).addClass(OPTIONS.expandedClass);
                $(this).nextAll("ol,ul").show(TEMP)
            });
            LINK.bind("collapse", function (ITEM, TEMP) {
                TEMP = "undefined" !== typeof TEMP ? TEMP : OPTIONS.speed;
                $(this).html(OPTIONS.collapsedHtml).removeClass(OPTIONS.expandedClass).addClass(OPTIONS.collapsedClass);
                $(this).nextAll("ol,ul").hide(TEMP)
            });
            LINK.click(function () {
                $(this).hasClass(OPTIONS.expandedClass) ? $(this).trigger("collapse") : $(this).trigger("expand")
            });
            $(TEMP).is("a") || ($(TEMP).addClass(OPTIONS.controlTitleClass), $(TEMP).click(function () {
                LINK.click()
            }));
            var PARENT_LINK = LINK.parent(),
                h = null;
            OPTIONS.activeSelector && 0 < PARENT_LINK.find(OPTIONS.activeSelector).length ? LINK.trigger("expand", [h]) : LINK.trigger("collapse", [h])
        }), OPTIONS.activeSelector && $("ol,ul", ITEM).find(OPTIONS.activeSelector).each(function () {
            $(this).parent().addClass(OPTIONS.activeClass)
        })
    } finally {
        TEMP.replaceWith(ITEM)
    }
};
$.fn.treelist = function (a) {
   var b = $.extend({}, $.treelist.options, a);
    this.each(function (a, d) {
        var e = b;
        $.treelist.buildTree_(d, e)
    });
    return this
};
})(jQuery);
