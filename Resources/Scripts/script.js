var LSFTheme = {
    Init: function () {
        LSFTheme.carousel();
    },
    carousel: function () {

        $(LSFStore.Data_Selector).find(".owl-carousel").each(function () {

            var $this = $(this), pluginOptions = $this.data('plugin-options');


            if (pluginOptions) {

                pluginOptions = jQuery.parseJSON(pluginOptions.replace(/'/g, '\"'));

                if (pluginOptions['items'] === undefined) {
                    items = parseInt($this.parents(LSFStore.Data_Selector).width() / 198);
                    pluginOptions['items'] = items;
                }


                var Itemscount = $this.find(".product_item").length;

                if (pluginOptions['items'] == Itemscount) {
                    pluginOptions['mouseDrag'] = false;
                    pluginOptions['nav'] = false;
                }


                $this.owlCarousel(pluginOptions);


                if ($this.hasClass('thumbs')) {
                    $this.on("click", ".owl-item", function (e) {
                        e.preventDefault();
                        var $this = $(this);
                        var $thumbchild = $this.find(".thumb_item");
                        $(".thumb_item").removeClass("Thumbactive");
                        $thumbchild.addClass("Thumbactive");
                        var number = $(this).index();
                        $(".owl-carousel.big-images").trigger("to.owl.carousel", number);
                    });
                }
                $('.owl-prev').attr('type', 'button');
                $('.owl-next').attr('type', 'button');
            }
        });
    },


    sort_pageSize: function (url) {
        url = url.split("?")[0]
        LSFTheme.Redirect(url);
    },
    Redirect: function (url) {
        window.location.href = url;
    },

    //ViewModeIcons: function (moduleId) {
    //    if ($.cookie != null && $.cookie("ViewMode_" + moduleId) != null && $.cookie("ViewMode_" + moduleId) != "" && $.cookie("ViewMode_" + moduleId) == "list") {
    //        $('.product_view_icon a:last-child').addClass('active');
    //    }
    //    else {
    //        $('.product_view_icon a:first-child').addClass('active');
    //    }
    //}

}

//widget search
var search = {

    search_widget: function (WidgetID, Search_url) {

        var Keyword = $('#' + WidgetID).find('#Search').val();
        Keyword = jQuery.trim(Keyword);
        if (Keyword != null && Keyword != '') {
            var test = LSFStore.AjaxPageClick($(LSFStore.Data_Selector), Search_url, Keyword);

            if (test)
                window.location = Search_url + "?query=" + Keyword;
        }
        else
            showNotifyMsg(LSF_Localization.EmptySearchBox, "error", "Store");

        return false;
    },
    searchKeyPress: function (e) {
        e = e || window.event;
        if (e.keyCode == 13) {
            document.getElementById('button_search').click();
            return false;
        }
        return true;
    }
};
var Edit_product = {
    ProductEdit: function (productid) {
        LSFTheme.Redirect(LSFStore.ManageURL + "#/catalog/products/product/" + productid);
    },

    ProductDelete: function (productid, url, page) {
        if (productid > 0) {
            LsfWebapi.webApi.post('product/delete', 'ProductID=' + productid).success(function (data) {
                if (page == 'Home')
                    location.reload();
                else
                    LSFTheme.Redirect(url);
            });
        }
    }
};

var variation = {
    total_product_cost: function (variation_id) {
        var product_total_cost = $(LSFStore.Data_Selector).find("#product_price").text();
        $(LSFStore.Data_Selector).find(".product_detail product_attribute_" + variation_id + " option:selected").text()
    }
}

function ChangeCurrency(Object) {
    if (Object.value != null) {
        $.removeCookie("StoreCurrency_" + LSFStore.ModuleID);
        $.cookie("StoreCurrency_" + LSFStore.ModuleID, Object.value, { path: '/' });
        location.reload();
    }
}