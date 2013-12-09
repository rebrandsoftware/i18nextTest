//main

function toast(msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msg + "</h3></div>")
        .css({
            display: "block",
            opacity: 0.90,
            position: "fixed",
            padding: "7px",
            "text-align": "center",
            width: "270px",
            left: ($(window).width() - 284) / 2,
            top: $(window).height() / 2
        })
        .appendTo($.mobile.pageContainer).delay(1500)
        .fadeOut(400, function () {
            $(this).remove();
        });
}

var app = {
    

    initialize: function () {
        $(document).ready(function () {
            console.log("document ready");
            // translate nav
            findPhoneLangLong(function (langLong) {
                console.log("LangLong: " + langLong);
                getLangShort(langLong, function (lang) {
                    mLanguage = lang;
                    //toast("langShort: " + lang);
                    
                    var option = {
                      lng: lang,
                      debug: true,
                      customLoad: function(lng, ns, options, loadComplete) {
                         // load the file for given language and namespace
                         console.log("lng: " + lng);
                         var myurl = "translations/" + lng + "/translation.json";
                         
                         $.ajax({
                            url: myurl,
                            crossDomain: false,
                            dataType: 'json'
                        })
                            .done(function (data) {
                                loadComplete(null, data); // or loadComplete('some error'); if failed
                            })
                            .fail(function (xhr, err) {
                                loadComplete(formatErrorMessage(xhr, err));
                            });    
                        }
                    };
                    
                    i18n.init(option, function () {
                        // save to use translation function as resources are fetched
                        toast("init");
                        bTransInit = true;
                        $("body").i18n();
                        var $elAppNameHeader = $('#appNameHeader');
                        if (window.innerHeight > window.innerWidth) {
                            $elAppNameHeader.html(i18n.t('app.nameShort'));
                        } else {
                            $elAppNameHeader.html(i18n.t('app.name'));
                        }
                    });
                });
            });            
        });

        $('[data-role=page]').on('pagebeforeshow', function (event) {
            if (bTransInit === true) {
                console.log('pageshow translate');
                $("body").i18n();
            }
        });

        
        $(window).on("orientationchange", function (event) {
            console.log("orientation");
            var $elAppNameHeader = $('#appNameHeader');
            var viewport = {
                    width: $(window).width(),
                    height: $(window).height()
                };
                console.log("viewport width: " + viewport.width);
                console.log("viewport height: " + viewport.height);
            if (viewport.height < viewport.width) {
                
                if (viewport.height < 350) {
                    console.log("short");
                    $elAppNameHeader.html(i18n.t('app.nameShort'));
                } else {
                    console.log("long");
                    $elAppNameHeader.html(i18n.t('app.name'));
                }
            } else {
                console.log("long");
                $elAppNameHeader.html(i18n.t('app.name'));
            }
        });
        
        $('#selLang').on('change', function () {
            var $elLang = $('#selLang');
            var lang = $elLang.val();
            //toast('Saving Lang: ' + lang);
            console.log("saving lang: " + lang);
                    console.log("LangShrt: " + lang);
                    mLanguage = lang;
                    i18n.init({
                        lng: lang,
                        debug: true
                    }, function () {
                        // save to use translation function as resources are fetched
                        //console.log('translate app');
                        if (bTransInit === true) {
                            console.log('new lang selected');
                            $("body").i18n();
                            //toast("new lang");

                            //if we're debugging, delete all passwords and add new translated ones
                            //console.log("Deubbing password import")
                            //app.deletePassAll(mUsername, false, function(success) {
                            //    //console.log('Deleted all');
                            //    loadExampleLangs
                            //    loadExampleLangs(function(success) {
                            //       //console.log('loaded example langs');
                            //     getLangExample(lang, function(example) {
                            //          //console.log("Got example: " + example);
                            //         app.importPasswords(example, "", function(success) {
                            //             //console.log("imported examples");
                            //            toast("Imported examples"); 
                            //         });
                            //      }); 
                            //   });
                            //});
                        }
                    });
               
        });
        
        
    },


};

app.initialize();