$(document).ready(function() {
    var c = $("#search-input"),
        d = $("#url-result"),
        e = $("#cursor"),
        a = $(".preview-search-link");
    d.attr("value", window.location);
    d.mouseup(function() { this.select() });
    d.focus(function() { this.select() });

    function b(g) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(g + "=");
            if (c_start != -1) {
                c_start = c_start + g.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) { c_end = document.cookie.length }
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }
    if (b("theme") == "dark") {
        $("body").addClass("dark-theme").removeClass("light-theme");
        $("#qwt-logo").attr("src", "img/qwt-logo-dark-theme.png");
        $("#qwt-theme-url-param").attr("value", "1")
    } else {
        if (b("theme") == "light") {
            $("body").addClass("light-theme").removeClass("dark-theme");
            $("#qwt-logo").attr("src", "img/qwt-logo-light-theme.png");
            $("#qwt-theme-url-param").attr("value", "-1")
        }
    }
    if (window.location.search == "") {
        d.attr("value", window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search);
        $("#search-form").submit(function(g) {
            g.preventDefault();
            g.stopPropagation();
            window.location = d.attr("value");
            return false
        });
        c.keyup(function(h) {
            var g = $("#search-input").val();
            $(this).attr("value", $(this).val());
            d.attr("value", window.location.protocol + "//" + window.location.host + window.location.pathname + "?q=" + encodeURIComponent(g));
            a.attr("href", window.location.protocol + "//" + window.location.host + window.location.pathname + "?q=" + encodeURIComponent(g))
        })
    } else {
        var f = decodeURIComponent(window.location.search);
        if (f.substr(0, 3) == "?q=") {
            f = f.substr(3);
            f = f.replace(/(\S)\+(\S)/g, "$1 $2")
        }
        if (f.length > 0) {
            e.show();
            e.attr("src", "img/cursor-default.png");
            d.text(window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search);
            d.attr("href", window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search);
            if ($("body").width() > 650) {
                e.animate({ top: "20px", left: "400px" }, 2250);
                setTimeout(function() { e.attr("src", "img/cursor-text.png") }, 1500);
                c.delay(2250).typetype(f, {
                    callback: function() {
                        e.animate({ top: "10px", left: "600px" }, 1000);
                        setTimeout(function() { $("#search-submit").addClass("hovered") }, 800);
                        setTimeout(function() { e.attr("src", "img/cursor-pointer.png") }, 800);
                        setTimeout(function() {
                            $("#search-submit").trigger("click");
                            $("#search-submit").addClass("active")
                        }, 1100)
                    }
                })
            } else {
                if ($("body").width() <= 650) {
                    e.animate({ top: "16px", left: "200px" }, 1700);
                    setTimeout(function() { e.attr("src", "img/cursor-text.png") }, 1100);
                    c.delay(2000).typetype(f, {
                        callback: function() {
                            e.animate({ top: "10px", left: "260px" }, 800);
                            setTimeout(function() { $("#search-submit").addClass("hovered") }, 320);
                            setTimeout(function() { e.attr("src", "img/cursor-pointer.png") }, 320);
                            setTimeout(function() { $("#search-submit").trigger("click") }, 1000)
                        }
                    })
                }
            }
        }
    }
    $("#search-form").click(function() { $("#search-input").focus() });
    $("#shorten-url-result").click(function(g) {
        g.preventDefault();
        g.stopPropagation();
        var i = "https://is.gd/create.php?format=json&url=" + encodeURIComponent(d.attr("value")),
            h;
        if (!h) {
            $.getJSON(i, function(j) {
                h = j.shorturl;
                h = h.replace("http:", "https:");
                d.attr("value", h)
            })
        } else { d.attr("value", h) }
    });
    $("#dark-theme-icon").click(function() {
        $("body").addClass("dark-theme").removeClass("light-theme");
        $("#qwt-logo").attr("src", "img/qwt-logo-dark-theme.png");
        $("#qwt-theme-url-param").attr("value", "1");
        document.cookie = "theme=dark; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;"
    });
    $("#light-theme-icon").click(function() {
        $("body").addClass("light-theme").removeClass("dark-theme");
        $("#qwt-logo").attr("src", "img/qwt-logo-light-theme.png");
        $("#qwt-theme-url-param").attr("value", "-1");
        document.cookie = "theme=light; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;"
    })
});