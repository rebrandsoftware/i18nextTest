function findPhoneLangLong(callback) {
    var prefLang = "";
    
        //console.log("prefLang: " + setting);
        prefLang = "auto";
        prefLang = prefLang.toLowerCase();
        if (prefLang === "auto") {
            try {
                navigator.getPreferredLanguage(
                    function (language) {
                        var lang = language.value;
                        lang = lang.toLowerCase();
                        //console.log("found langauge: " + lang);
                        callback(lang);
                    },
                    function () {
                        //console.log("Language Error");
                        var lang = "en-us";
                        callback(lang);
                    }
                );
            } catch (err) {
                //console.log("Non phonegap lang error");
                var lang = navigator.language;
                //console.log("Lang from browser: " + lang);
                if (lang === "" || lang === undefined) {
                    lang = "en-us";
                } else {
                    lang = lang.toLowerCase();
                }
                callback(lang);
            }
        } else {
            callback(prefLang);
        }
}

function getLangShort(langLong, callback) {
    var a = langLong.split("-");
    var lang = "";
    var bFound = false;
    var l = supportedLanguages.length;
    if (a[0] === "zh") {
        if (a.length > 0) {
            lang = a[0] + "-" + a[1];
        } else {
            lang = "zh-hans";
        }
    } else {
        lang = a[0];
    }

    for (var i = 0; i < l; i++) {
        if (lang === supportedLanguages[i]) {
            bFound = true;
            break;
        }
    }
    if (bFound === false) {
        lang = "en";
    }
    lang = lang.toLowerCase();
    callback(lang);
}