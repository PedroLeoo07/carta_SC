(function ($) {
    function m(a, b, c) {
        var d = h[b.type] || {};
        return a == null ? (c || !b.def ? null : b.def) : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : a < 0 ? 0 : d.max < a ? d.max : a);
    }

    function n(b) {
        var c = f(), d = c._rgba = [];
        return b = b.toLowerCase(), l(e, function (a, e) {
            var f, h = e.re.exec(b), i = h && e.parse(h), j = e.space || "rgba";
            if (i) return f = c[j](i), c[g[j].cache] = f[g[j].cache], d = c._rgba = f._rgba, !1;
        }), d.length ? (d.join() === "0,0,0,0" && $.extend(d, k.transparent), c) : k[b];
    }

    function o(a, b, c) {
        return c = (c + 1) % 1, c * 6 < 1 ? a + (b - a) * c * 6 : c * 2 < 1 ? b : c * 3 < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a;
    }

    var c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        d = /^([\-+])=\s*(\d+\.?\d*)/,
        e = [
            { re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function (a) { return [a[1], a[2], a[3], a[4]]; } },
            { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (a) { return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]; } }
        ],
        f = $.Color = function (b, c, d, e) { return new $.Color.fn.parse(b, c, d, e); },
        g = {
            rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } },
            hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } }
        },
        h = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } },
        i = f.support = {},
        j = $("<p>")[0],
        k,
        l = $.each;

    j.style.cssText = "background-color:rgba(1,1,1,.5)";
    i.rgba = j.style.backgroundColor.indexOf("rgba") > -1;

    l(g, function (a, b) {
        b.cache = "_" + a;
        b.props.alpha = { idx: 3, type: "percent", def: 1 };
    });

    f.fn = $.extend(f.prototype, {
        parse: function (c, d, e, h) {
            if (c === undefined) return this._rgba = [null, null, null, null], this;
            if (c.jquery || c.nodeType) c = $(c).css(d), d = undefined;
            var i = this, j = $.type(c), o = this._rgba = [];
            d !== undefined && (c = [c, d, e, h], j = "array");
            if (j === "string") return this.parse(n(c) || k._default);
            if (j === "array") return l(g.rgba.props, function (a, b) { o[b.idx] = m(c[b.idx], b); }), this;
        },
        toRgbaString: function () {
            var b = "rgba(", c = $.map(this._rgba, function (a, b) { return a == null ? b > 2 ? 1 : 0 : a; });
            return c[3] === 1 && (c.pop(), b = "rgb("), b + c.join() + ")";
        }
    });

    f.hook = function (b) {
        var c = b.split(" ");
        l(c, function (b, c) {
            $.cssHooks[c] = {
                set: function (b, d) {
                    var e, g, h = "";
                    if (d !== "transparent" && ($.type(d) !== "string" || (e = n(d)))) {
                        d = f(e || d);
                        if (!i.rgba && d._rgba[3] !== 1) {
                            g = c === "backgroundColor" ? b.parentNode : b;
                            while ((h === "" || h === "transparent") && g && g.style) try {
                                h = $.css(g, "backgroundColor"), g = g.parentNode;
                            } catch (j) {}
                            d = d.blend(h && h !== "transparent" ? h : "_default");
                        }
                        d = d.toRgbaString();
                    }
                    try { b.style[c] = d; } catch (j) {}
                }
            };
            $.fx.step[c] = function (b) {
                b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0);
                $.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos));
            };
        });
    };
    f.hook(c);
    k = $.Color.names = {
        aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff",
        gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000",
        navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000",
        silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00",
        transparent: [null, null, null, 0], _default: "#ffffff"
    };
})(jQuery);
