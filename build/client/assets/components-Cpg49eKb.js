var np = Object.defineProperty;
var rp = (e, t, n) =>
  t in e
    ? np(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Ml = (e, t, n) => rp(e, typeof t != "symbol" ? t + "" : t, n);
import { r as v, g as lp, R as Qc } from "./jsx-runtime-56DGgGmo.js";
function ip(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const i = Object.getOwnPropertyDescriptor(r, l);
          i &&
            Object.defineProperty(
              e,
              l,
              i.get ? i : { enumerable: !0, get: () => r[l] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
var Yc = { exports: {} },
  et = {},
  Xc = { exports: {} },
  Jc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(z, j) {
    var W = z.length;
    z.push(j);
    e: for (; 0 < W; ) {
      var ee = (W - 1) >>> 1,
        re = z[ee];
      if (0 < l(re, j)) (z[ee] = j), (z[W] = re), (W = ee);
      else break e;
    }
  }
  function n(z) {
    return z.length === 0 ? null : z[0];
  }
  function r(z) {
    if (z.length === 0) return null;
    var j = z[0],
      W = z.pop();
    if (W !== j) {
      z[0] = W;
      e: for (var ee = 0, re = z.length, $e = re >>> 1; ee < $e; ) {
        var He = 2 * (ee + 1) - 1,
          Tt = z[He],
          Pe = He + 1,
          nt = z[Pe];
        if (0 > l(Tt, W))
          Pe < re && 0 > l(nt, Tt)
            ? ((z[ee] = nt), (z[Pe] = W), (ee = Pe))
            : ((z[ee] = Tt), (z[He] = W), (ee = He));
        else if (Pe < re && 0 > l(nt, W)) (z[ee] = nt), (z[Pe] = W), (ee = Pe);
        else break e;
      }
    }
    return j;
  }
  function l(z, j) {
    var W = z.sortIndex - j.sortIndex;
    return W !== 0 ? W : z.id - j.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var o = Date,
      a = o.now();
    e.unstable_now = function () {
      return o.now() - a;
    };
  }
  var u = [],
    s = [],
    d = 1,
    c = null,
    f = 3,
    x = !1,
    g = !1,
    k = !1,
    _ = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(z) {
    for (var j = n(s); j !== null; ) {
      if (j.callback === null) r(s);
      else if (j.startTime <= z)
        r(s), (j.sortIndex = j.expirationTime), t(u, j);
      else break;
      j = n(s);
    }
  }
  function S(z) {
    if (((k = !1), p(z), !g))
      if (n(u) !== null) (g = !0), Fe(P);
      else {
        var j = n(s);
        j !== null && Qt(S, j.startTime - z);
      }
  }
  function P(z, j) {
    (g = !1), k && ((k = !1), m(y), (y = -1)), (x = !0);
    var W = f;
    try {
      for (
        p(j), c = n(u);
        c !== null && (!(c.expirationTime > j) || (z && !A()));

      ) {
        var ee = c.callback;
        if (typeof ee == "function") {
          (c.callback = null), (f = c.priorityLevel);
          var re = ee(c.expirationTime <= j);
          (j = e.unstable_now()),
            typeof re == "function" ? (c.callback = re) : c === n(u) && r(u),
            p(j);
        } else r(u);
        c = n(u);
      }
      if (c !== null) var $e = !0;
      else {
        var He = n(s);
        He !== null && Qt(S, He.startTime - j), ($e = !1);
      }
      return $e;
    } finally {
      (c = null), (f = W), (x = !1);
    }
  }
  var R = !1,
    T = null,
    y = -1,
    M = 5,
    O = -1;
  function A() {
    return !(e.unstable_now() - O < M);
  }
  function Y() {
    if (T !== null) {
      var z = e.unstable_now();
      O = z;
      var j = !0;
      try {
        j = T(!0, z);
      } finally {
        j ? he() : ((R = !1), (T = null));
      }
    } else R = !1;
  }
  var he;
  if (typeof h == "function")
    he = function () {
      h(Y);
    };
  else if (typeof MessageChannel < "u") {
    var oe = new MessageChannel(),
      Ee = oe.port2;
    (oe.port1.onmessage = Y),
      (he = function () {
        Ee.postMessage(null);
      });
  } else
    he = function () {
      _(Y, 0);
    };
  function Fe(z) {
    (T = z), R || ((R = !0), he());
  }
  function Qt(z, j) {
    y = _(function () {
      z(e.unstable_now());
    }, j);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (z) {
      z.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      g || x || ((g = !0), Fe(P));
    }),
    (e.unstable_forceFrameRate = function (z) {
      0 > z || 125 < z
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (M = 0 < z ? Math.floor(1e3 / z) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (z) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = f;
      }
      var W = f;
      f = j;
      try {
        return z();
      } finally {
        f = W;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (z, j) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var W = f;
      f = z;
      try {
        return j();
      } finally {
        f = W;
      }
    }),
    (e.unstable_scheduleCallback = function (z, j, W) {
      var ee = e.unstable_now();
      switch (
        (typeof W == "object" && W !== null
          ? ((W = W.delay), (W = typeof W == "number" && 0 < W ? ee + W : ee))
          : (W = ee),
        z)
      ) {
        case 1:
          var re = -1;
          break;
        case 2:
          re = 250;
          break;
        case 5:
          re = 1073741823;
          break;
        case 4:
          re = 1e4;
          break;
        default:
          re = 5e3;
      }
      return (
        (re = W + re),
        (z = {
          id: d++,
          callback: j,
          priorityLevel: z,
          startTime: W,
          expirationTime: re,
          sortIndex: -1,
        }),
        W > ee
          ? ((z.sortIndex = W),
            t(s, z),
            n(u) === null &&
              z === n(s) &&
              (k ? (m(y), (y = -1)) : (k = !0), Qt(S, W - ee)))
          : ((z.sortIndex = re), t(u, z), g || x || ((g = !0), Fe(P))),
        z
      );
    }),
    (e.unstable_shouldYield = A),
    (e.unstable_wrapCallback = function (z) {
      var j = f;
      return function () {
        var W = f;
        f = j;
        try {
          return z.apply(this, arguments);
        } finally {
          f = W;
        }
      };
    });
})(Jc);
Xc.exports = Jc;
var op = Xc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ap = v,
  be = op;
function N(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Gc = new Set(),
  br = {};
function jn(e, t) {
  cr(e, t), cr(e + "Capture", t);
}
function cr(e, t) {
  for (br[e] = t, e = 0; e < t.length; e++) Gc.add(t[e]);
}
var Ut = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Xo = Object.prototype.hasOwnProperty,
  up =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hs = {},
  ps = {};
function sp(e) {
  return Xo.call(ps, e)
    ? !0
    : Xo.call(hs, e)
      ? !1
      : up.test(e)
        ? (ps[e] = !0)
        : ((hs[e] = !0), !1);
}
function cp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function dp(e, t, n, r) {
  if (t === null || typeof t > "u" || cp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Be(e, t, n, r, l, i, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o);
}
var Ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Ne[e] = new Be(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Ne[t] = new Be(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Ne[e] = new Be(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Ne[e] = new Be(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Ne[e] = new Be(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Ne[e] = new Be(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Ne[e] = new Be(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Ne[e] = new Be(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Ne[e] = new Be(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Qa = /[\-:]([a-z])/g;
function Ya(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Qa, Ya);
    Ne[t] = new Be(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Qa, Ya);
    Ne[t] = new Be(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Qa, Ya);
  Ne[t] = new Be(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Ne[e] = new Be(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ne.xlinkHref = new Be(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Ne[e] = new Be(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Xa(e, t, n, r) {
  var l = Ne.hasOwnProperty(t) ? Ne[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (dp(t, n, l, r) && (n = null),
    r || l === null
      ? sp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Wt = ap.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  zl = Symbol.for("react.element"),
  Kn = Symbol.for("react.portal"),
  Qn = Symbol.for("react.fragment"),
  Ja = Symbol.for("react.strict_mode"),
  Jo = Symbol.for("react.profiler"),
  Zc = Symbol.for("react.provider"),
  qc = Symbol.for("react.context"),
  Ga = Symbol.for("react.forward_ref"),
  Go = Symbol.for("react.suspense"),
  Zo = Symbol.for("react.suspense_list"),
  Za = Symbol.for("react.memo"),
  qt = Symbol.for("react.lazy"),
  bc = Symbol.for("react.offscreen"),
  ms = Symbol.iterator;
function _r(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ms && e[ms]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var fe = Object.assign,
  vo;
function Ar(e) {
  if (vo === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      vo = (t && t[1]) || "";
    }
  return (
    `
` +
    vo +
    e
  );
}
var yo = !1;
function go(e, t) {
  if (!e || yo) return "";
  yo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (s) {
          var r = s;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (s) {
          r = s;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (
        var l = s.stack.split(`
`),
          i = r.stack.split(`
`),
          o = l.length - 1,
          a = i.length - 1;
        1 <= o && 0 <= a && l[o] !== i[a];

      )
        a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (l[o] !== i[a]) {
          if (o !== 1 || a !== 1)
            do
              if ((o--, a--, 0 > a || l[o] !== i[a])) {
                var u =
                  `
` + l[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= o && 0 <= a);
          break;
        }
    }
  } finally {
    (yo = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Ar(e) : "";
}
function fp(e) {
  switch (e.tag) {
    case 5:
      return Ar(e.type);
    case 16:
      return Ar("Lazy");
    case 13:
      return Ar("Suspense");
    case 19:
      return Ar("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = go(e.type, !1)), e;
    case 11:
      return (e = go(e.type.render, !1)), e;
    case 1:
      return (e = go(e.type, !0)), e;
    default:
      return "";
  }
}
function qo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Qn:
      return "Fragment";
    case Kn:
      return "Portal";
    case Jo:
      return "Profiler";
    case Ja:
      return "StrictMode";
    case Go:
      return "Suspense";
    case Zo:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case qc:
        return (e.displayName || "Context") + ".Consumer";
      case Zc:
        return (e._context.displayName || "Context") + ".Provider";
      case Ga:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Za:
        return (
          (t = e.displayName || null), t !== null ? t : qo(e.type) || "Memo"
        );
      case qt:
        (t = e._payload), (e = e._init);
        try {
          return qo(e(t));
        } catch {}
    }
  return null;
}
function hp(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return qo(t);
    case 8:
      return t === Ja ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function hn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ed(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function pp(e) {
  var t = ed(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (o) {
          (r = "" + o), i.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Fl(e) {
  e._valueTracker || (e._valueTracker = pp(e));
}
function td(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = ed(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function mi(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function bo(e, t) {
  var n = t.checked;
  return fe({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function vs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = hn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function nd(e, t) {
  (t = t.checked), t != null && Xa(e, "checked", t, !1);
}
function ea(e, t) {
  nd(e, t);
  var n = hn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? ta(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && ta(e, t.type, hn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function ys(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function ta(e, t, n) {
  (t !== "number" || mi(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Br = Array.isArray;
function lr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + hn(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function na(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return fe({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function gs(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92));
      if (Br(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: hn(n) };
}
function rd(e, t) {
  var n = hn(t.value),
    r = hn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function ws(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ld(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ra(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? ld(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Il,
  id = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Il = Il || document.createElement("div"),
          Il.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Il.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function el(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Vr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  mp = ["Webkit", "ms", "Moz", "O"];
Object.keys(Vr).forEach(function (e) {
  mp.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Vr[t] = Vr[e]);
  });
});
function od(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Vr.hasOwnProperty(e) && Vr[e])
      ? ("" + t).trim()
      : t + "px";
}
function ad(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = od(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var vp = fe(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function la(e, t) {
  if (t) {
    if (vp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function ia(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var oa = null;
function qa(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var aa = null,
  ir = null,
  or = null;
function Ss(e) {
  if ((e = Sl(e))) {
    if (typeof aa != "function") throw Error(N(280));
    var t = e.stateNode;
    t && ((t = Ji(t)), aa(e.stateNode, e.type, t));
  }
}
function ud(e) {
  ir ? (or ? or.push(e) : (or = [e])) : (ir = e);
}
function sd() {
  if (ir) {
    var e = ir,
      t = or;
    if (((or = ir = null), Ss(e), t)) for (e = 0; e < t.length; e++) Ss(t[e]);
  }
}
function cd(e, t) {
  return e(t);
}
function dd() {}
var wo = !1;
function fd(e, t, n) {
  if (wo) return e(t, n);
  wo = !0;
  try {
    return cd(e, t, n);
  } finally {
    (wo = !1), (ir !== null || or !== null) && (dd(), sd());
  }
}
function tl(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ji(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var ua = !1;
if (Ut)
  try {
    var Lr = {};
    Object.defineProperty(Lr, "passive", {
      get: function () {
        ua = !0;
      },
    }),
      window.addEventListener("test", Lr, Lr),
      window.removeEventListener("test", Lr, Lr);
  } catch {
    ua = !1;
  }
function yp(e, t, n, r, l, i, o, a, u) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, s);
  } catch (d) {
    this.onError(d);
  }
}
var Kr = !1,
  vi = null,
  yi = !1,
  sa = null,
  gp = {
    onError: function (e) {
      (Kr = !0), (vi = e);
    },
  };
function wp(e, t, n, r, l, i, o, a, u) {
  (Kr = !1), (vi = null), yp.apply(gp, arguments);
}
function Sp(e, t, n, r, l, i, o, a, u) {
  if ((wp.apply(this, arguments), Kr)) {
    if (Kr) {
      var s = vi;
      (Kr = !1), (vi = null);
    } else throw Error(N(198));
    yi || ((yi = !0), (sa = s));
  }
}
function Un(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function hd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Es(e) {
  if (Un(e) !== e) throw Error(N(188));
}
function Ep(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Un(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return Es(l), e;
        if (i === r) return Es(l), t;
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) (n = l), (r = i);
    else {
      for (var o = !1, a = l.child; a; ) {
        if (a === n) {
          (o = !0), (n = l), (r = i);
          break;
        }
        if (a === r) {
          (o = !0), (r = l), (n = i);
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a; ) {
          if (a === n) {
            (o = !0), (n = i), (r = l);
            break;
          }
          if (a === r) {
            (o = !0), (r = i), (n = l);
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function pd(e) {
  return (e = Ep(e)), e !== null ? md(e) : null;
}
function md(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = md(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var vd = be.unstable_scheduleCallback,
  xs = be.unstable_cancelCallback,
  xp = be.unstable_shouldYield,
  kp = be.unstable_requestPaint,
  ve = be.unstable_now,
  Cp = be.unstable_getCurrentPriorityLevel,
  ba = be.unstable_ImmediatePriority,
  yd = be.unstable_UserBlockingPriority,
  gi = be.unstable_NormalPriority,
  Rp = be.unstable_LowPriority,
  gd = be.unstable_IdlePriority,
  Ki = null,
  Ct = null;
function Pp(e) {
  if (Ct && typeof Ct.onCommitFiberRoot == "function")
    try {
      Ct.onCommitFiberRoot(Ki, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var vt = Math.clz32 ? Math.clz32 : Tp,
  _p = Math.log,
  Lp = Math.LN2;
function Tp(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((_p(e) / Lp) | 0)) | 0;
}
var jl = 64,
  Ul = 4194304;
function $r(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function wi(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? (r = $r(a)) : ((i &= o), i !== 0 && (r = $r(i)));
  } else (o = n & ~l), o !== 0 ? (r = $r(o)) : i !== 0 && (r = $r(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - vt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function Np(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Dp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var o = 31 - vt(i),
      a = 1 << o,
      u = l[o];
    u === -1
      ? (!(a & n) || a & r) && (l[o] = Np(a, t))
      : u <= t && (e.expiredLanes |= a),
      (i &= ~a);
  }
}
function ca(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function wd() {
  var e = jl;
  return (jl <<= 1), !(jl & 4194240) && (jl = 64), e;
}
function So(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function gl(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - vt(t)),
    (e[t] = n);
}
function Op(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - vt(n),
      i = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i);
  }
}
function eu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - vt(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var Z = 0;
function Sd(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Ed,
  tu,
  xd,
  kd,
  Cd,
  da = !1,
  Al = [],
  ln = null,
  on = null,
  an = null,
  nl = new Map(),
  rl = new Map(),
  en = [],
  Mp =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function ks(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ln = null;
      break;
    case "dragenter":
    case "dragleave":
      on = null;
      break;
    case "mouseover":
    case "mouseout":
      an = null;
      break;
    case "pointerover":
    case "pointerout":
      nl.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      rl.delete(t.pointerId);
  }
}
function Tr(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = Sl(t)), t !== null && tu(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function zp(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (ln = Tr(ln, e, t, n, r, l)), !0;
    case "dragenter":
      return (on = Tr(on, e, t, n, r, l)), !0;
    case "mouseover":
      return (an = Tr(an, e, t, n, r, l)), !0;
    case "pointerover":
      var i = l.pointerId;
      return nl.set(i, Tr(nl.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (i = l.pointerId), rl.set(i, Tr(rl.get(i) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function Rd(e) {
  var t = kn(e.target);
  if (t !== null) {
    var n = Un(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = hd(n)), t !== null)) {
          (e.blockedOn = t),
            Cd(e.priority, function () {
              xd(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function ti(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = fa(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (oa = r), n.target.dispatchEvent(r), (oa = null);
    } else return (t = Sl(n)), t !== null && tu(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Cs(e, t, n) {
  ti(e) && n.delete(t);
}
function Fp() {
  (da = !1),
    ln !== null && ti(ln) && (ln = null),
    on !== null && ti(on) && (on = null),
    an !== null && ti(an) && (an = null),
    nl.forEach(Cs),
    rl.forEach(Cs);
}
function Nr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    da ||
      ((da = !0),
      be.unstable_scheduleCallback(be.unstable_NormalPriority, Fp)));
}
function ll(e) {
  function t(l) {
    return Nr(l, e);
  }
  if (0 < Al.length) {
    Nr(Al[0], e);
    for (var n = 1; n < Al.length; n++) {
      var r = Al[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    ln !== null && Nr(ln, e),
      on !== null && Nr(on, e),
      an !== null && Nr(an, e),
      nl.forEach(t),
      rl.forEach(t),
      n = 0;
    n < en.length;
    n++
  )
    (r = en[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < en.length && ((n = en[0]), n.blockedOn === null); )
    Rd(n), n.blockedOn === null && en.shift();
}
var ar = Wt.ReactCurrentBatchConfig,
  Si = !0;
function Ip(e, t, n, r) {
  var l = Z,
    i = ar.transition;
  ar.transition = null;
  try {
    (Z = 1), nu(e, t, n, r);
  } finally {
    (Z = l), (ar.transition = i);
  }
}
function jp(e, t, n, r) {
  var l = Z,
    i = ar.transition;
  ar.transition = null;
  try {
    (Z = 4), nu(e, t, n, r);
  } finally {
    (Z = l), (ar.transition = i);
  }
}
function nu(e, t, n, r) {
  if (Si) {
    var l = fa(e, t, n, r);
    if (l === null) No(e, t, r, Ei, n), ks(e, r);
    else if (zp(l, e, t, n, r)) r.stopPropagation();
    else if ((ks(e, r), t & 4 && -1 < Mp.indexOf(e))) {
      for (; l !== null; ) {
        var i = Sl(l);
        if (
          (i !== null && Ed(i),
          (i = fa(e, t, n, r)),
          i === null && No(e, t, r, Ei, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else No(e, t, r, null, n);
  }
}
var Ei = null;
function fa(e, t, n, r) {
  if (((Ei = null), (e = qa(r)), (e = kn(e)), e !== null))
    if (((t = Un(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = hd(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Ei = e), null;
}
function Pd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Cp()) {
        case ba:
          return 1;
        case yd:
          return 4;
        case gi:
        case Rp:
          return 16;
        case gd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var nn = null,
  ru = null,
  ni = null;
function _d() {
  if (ni) return ni;
  var e,
    t = ru,
    n = t.length,
    r,
    l = "value" in nn ? nn.value : nn.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return (ni = l.slice(e, 1 < r ? 1 - r : void 0));
}
function ri(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Bl() {
  return !0;
}
function Rs() {
  return !1;
}
function tt(e) {
  function t(n, r, l, i, o) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(i) : i[a]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Bl
        : Rs),
      (this.isPropagationStopped = Rs),
      this
    );
  }
  return (
    fe(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Bl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Bl));
      },
      persist: function () {},
      isPersistent: Bl,
    }),
    t
  );
}
var wr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  lu = tt(wr),
  wl = fe({}, wr, { view: 0, detail: 0 }),
  Up = tt(wl),
  Eo,
  xo,
  Dr,
  Qi = fe({}, wl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: iu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Dr &&
            (Dr && e.type === "mousemove"
              ? ((Eo = e.screenX - Dr.screenX), (xo = e.screenY - Dr.screenY))
              : (xo = Eo = 0),
            (Dr = e)),
          Eo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : xo;
    },
  }),
  Ps = tt(Qi),
  Ap = fe({}, Qi, { dataTransfer: 0 }),
  Bp = tt(Ap),
  $p = fe({}, wl, { relatedTarget: 0 }),
  ko = tt($p),
  Hp = fe({}, wr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Wp = tt(Hp),
  Vp = fe({}, wr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Kp = tt(Vp),
  Qp = fe({}, wr, { data: 0 }),
  _s = tt(Qp),
  Yp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Xp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Jp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Gp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Jp[e]) ? !!t[e] : !1;
}
function iu() {
  return Gp;
}
var Zp = fe({}, wl, {
    key: function (e) {
      if (e.key) {
        var t = Yp[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ri(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Xp[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: iu,
    charCode: function (e) {
      return e.type === "keypress" ? ri(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ri(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  qp = tt(Zp),
  bp = fe({}, Qi, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ls = tt(bp),
  em = fe({}, wl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: iu,
  }),
  tm = tt(em),
  nm = fe({}, wr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  rm = tt(nm),
  lm = fe({}, Qi, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  im = tt(lm),
  om = [9, 13, 27, 32],
  ou = Ut && "CompositionEvent" in window,
  Qr = null;
Ut && "documentMode" in document && (Qr = document.documentMode);
var am = Ut && "TextEvent" in window && !Qr,
  Ld = Ut && (!ou || (Qr && 8 < Qr && 11 >= Qr)),
  Ts = " ",
  Ns = !1;
function Td(e, t) {
  switch (e) {
    case "keyup":
      return om.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Nd(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Yn = !1;
function um(e, t) {
  switch (e) {
    case "compositionend":
      return Nd(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ns = !0), Ts);
    case "textInput":
      return (e = t.data), e === Ts && Ns ? null : e;
    default:
      return null;
  }
}
function sm(e, t) {
  if (Yn)
    return e === "compositionend" || (!ou && Td(e, t))
      ? ((e = _d()), (ni = ru = nn = null), (Yn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Ld && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var cm = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ds(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!cm[e.type] : t === "textarea";
}
function Dd(e, t, n, r) {
  ud(r),
    (t = xi(t, "onChange")),
    0 < t.length &&
      ((n = new lu("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Yr = null,
  il = null;
function dm(e) {
  Hd(e, 0);
}
function Yi(e) {
  var t = Gn(e);
  if (td(t)) return e;
}
function fm(e, t) {
  if (e === "change") return t;
}
var Od = !1;
if (Ut) {
  var Co;
  if (Ut) {
    var Ro = "oninput" in document;
    if (!Ro) {
      var Os = document.createElement("div");
      Os.setAttribute("oninput", "return;"),
        (Ro = typeof Os.oninput == "function");
    }
    Co = Ro;
  } else Co = !1;
  Od = Co && (!document.documentMode || 9 < document.documentMode);
}
function Ms() {
  Yr && (Yr.detachEvent("onpropertychange", Md), (il = Yr = null));
}
function Md(e) {
  if (e.propertyName === "value" && Yi(il)) {
    var t = [];
    Dd(t, il, e, qa(e)), fd(dm, t);
  }
}
function hm(e, t, n) {
  e === "focusin"
    ? (Ms(), (Yr = t), (il = n), Yr.attachEvent("onpropertychange", Md))
    : e === "focusout" && Ms();
}
function pm(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Yi(il);
}
function mm(e, t) {
  if (e === "click") return Yi(t);
}
function vm(e, t) {
  if (e === "input" || e === "change") return Yi(t);
}
function ym(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var gt = typeof Object.is == "function" ? Object.is : ym;
function ol(e, t) {
  if (gt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Xo.call(t, l) || !gt(e[l], t[l])) return !1;
  }
  return !0;
}
function zs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Fs(e, t) {
  var n = zs(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = zs(n);
  }
}
function zd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? zd(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Fd() {
  for (var e = window, t = mi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = mi(e.document);
  }
  return t;
}
function au(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function gm(e) {
  var t = Fd(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    zd(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && au(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        (r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = Fs(n, i));
        var o = Fs(n, r);
        l &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var wm = Ut && "documentMode" in document && 11 >= document.documentMode,
  Xn = null,
  ha = null,
  Xr = null,
  pa = !1;
function Is(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  pa ||
    Xn == null ||
    Xn !== mi(r) ||
    ((r = Xn),
    "selectionStart" in r && au(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Xr && ol(Xr, r)) ||
      ((Xr = r),
      (r = xi(ha, "onSelect")),
      0 < r.length &&
        ((t = new lu("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Xn))));
}
function $l(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Jn = {
    animationend: $l("Animation", "AnimationEnd"),
    animationiteration: $l("Animation", "AnimationIteration"),
    animationstart: $l("Animation", "AnimationStart"),
    transitionend: $l("Transition", "TransitionEnd"),
  },
  Po = {},
  Id = {};
Ut &&
  ((Id = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Jn.animationend.animation,
    delete Jn.animationiteration.animation,
    delete Jn.animationstart.animation),
  "TransitionEvent" in window || delete Jn.transitionend.transition);
function Xi(e) {
  if (Po[e]) return Po[e];
  if (!Jn[e]) return e;
  var t = Jn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Id) return (Po[e] = t[n]);
  return e;
}
var jd = Xi("animationend"),
  Ud = Xi("animationiteration"),
  Ad = Xi("animationstart"),
  Bd = Xi("transitionend"),
  $d = new Map(),
  js =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function vn(e, t) {
  $d.set(e, t), jn(t, [e]);
}
for (var _o = 0; _o < js.length; _o++) {
  var Lo = js[_o],
    Sm = Lo.toLowerCase(),
    Em = Lo[0].toUpperCase() + Lo.slice(1);
  vn(Sm, "on" + Em);
}
vn(jd, "onAnimationEnd");
vn(Ud, "onAnimationIteration");
vn(Ad, "onAnimationStart");
vn("dblclick", "onDoubleClick");
vn("focusin", "onFocus");
vn("focusout", "onBlur");
vn(Bd, "onTransitionEnd");
cr("onMouseEnter", ["mouseout", "mouseover"]);
cr("onMouseLeave", ["mouseout", "mouseover"]);
cr("onPointerEnter", ["pointerout", "pointerover"]);
cr("onPointerLeave", ["pointerout", "pointerover"]);
jn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
jn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
jn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
jn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
jn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
jn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Hr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  xm = new Set("cancel close invalid load scroll toggle".split(" ").concat(Hr));
function Us(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Sp(r, t, void 0, e), (e.currentTarget = null);
}
function Hd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o],
            u = a.instance,
            s = a.currentTarget;
          if (((a = a.listener), u !== i && l.isPropagationStopped())) break e;
          Us(l, a, s), (i = u);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((a = r[o]),
            (u = a.instance),
            (s = a.currentTarget),
            (a = a.listener),
            u !== i && l.isPropagationStopped())
          )
            break e;
          Us(l, a, s), (i = u);
        }
    }
  }
  if (yi) throw ((e = sa), (yi = !1), (sa = null), e);
}
function le(e, t) {
  var n = t[wa];
  n === void 0 && (n = t[wa] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Wd(t, e, 2, !1), n.add(r));
}
function To(e, t, n) {
  var r = 0;
  t && (r |= 4), Wd(n, e, r, t);
}
var Hl = "_reactListening" + Math.random().toString(36).slice(2);
function al(e) {
  if (!e[Hl]) {
    (e[Hl] = !0),
      Gc.forEach(function (n) {
        n !== "selectionchange" && (xm.has(n) || To(n, !1, e), To(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Hl] || ((t[Hl] = !0), To("selectionchange", !1, t));
  }
}
function Wd(e, t, n, r) {
  switch (Pd(t)) {
    case 1:
      var l = Ip;
      break;
    case 4:
      l = jp;
      break;
    default:
      l = nu;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !ua ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1);
}
function No(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var a = r.stateNode.containerInfo;
        if (a === l || (a.nodeType === 8 && a.parentNode === l)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var u = o.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = o.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            o = o.return;
          }
        for (; a !== null; ) {
          if (((o = kn(a)), o === null)) return;
          if (((u = o.tag), u === 5 || u === 6)) {
            r = i = o;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  fd(function () {
    var s = i,
      d = qa(n),
      c = [];
    e: {
      var f = $d.get(e);
      if (f !== void 0) {
        var x = lu,
          g = e;
        switch (e) {
          case "keypress":
            if (ri(n) === 0) break e;
          case "keydown":
          case "keyup":
            x = qp;
            break;
          case "focusin":
            (g = "focus"), (x = ko);
            break;
          case "focusout":
            (g = "blur"), (x = ko);
            break;
          case "beforeblur":
          case "afterblur":
            x = ko;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            x = Ps;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Bp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = tm;
            break;
          case jd:
          case Ud:
          case Ad:
            x = Wp;
            break;
          case Bd:
            x = rm;
            break;
          case "scroll":
            x = Up;
            break;
          case "wheel":
            x = im;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Kp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = Ls;
        }
        var k = (t & 4) !== 0,
          _ = !k && e === "scroll",
          m = k ? (f !== null ? f + "Capture" : null) : f;
        k = [];
        for (var h = s, p; h !== null; ) {
          p = h;
          var S = p.stateNode;
          if (
            (p.tag === 5 &&
              S !== null &&
              ((p = S),
              m !== null && ((S = tl(h, m)), S != null && k.push(ul(h, S, p)))),
            _)
          )
            break;
          h = h.return;
        }
        0 < k.length &&
          ((f = new x(f, g, null, n, d)), c.push({ event: f, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (x = e === "mouseout" || e === "pointerout"),
          f &&
            n !== oa &&
            (g = n.relatedTarget || n.fromElement) &&
            (kn(g) || g[At]))
        )
          break e;
        if (
          (x || f) &&
          ((f =
            d.window === d
              ? d
              : (f = d.ownerDocument)
                ? f.defaultView || f.parentWindow
                : window),
          x
            ? ((g = n.relatedTarget || n.toElement),
              (x = s),
              (g = g ? kn(g) : null),
              g !== null &&
                ((_ = Un(g)), g !== _ || (g.tag !== 5 && g.tag !== 6)) &&
                (g = null))
            : ((x = null), (g = s)),
          x !== g)
        ) {
          if (
            ((k = Ps),
            (S = "onMouseLeave"),
            (m = "onMouseEnter"),
            (h = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((k = Ls),
              (S = "onPointerLeave"),
              (m = "onPointerEnter"),
              (h = "pointer")),
            (_ = x == null ? f : Gn(x)),
            (p = g == null ? f : Gn(g)),
            (f = new k(S, h + "leave", x, n, d)),
            (f.target = _),
            (f.relatedTarget = p),
            (S = null),
            kn(d) === s &&
              ((k = new k(m, h + "enter", g, n, d)),
              (k.target = p),
              (k.relatedTarget = _),
              (S = k)),
            (_ = S),
            x && g)
          )
            t: {
              for (k = x, m = g, h = 0, p = k; p; p = Wn(p)) h++;
              for (p = 0, S = m; S; S = Wn(S)) p++;
              for (; 0 < h - p; ) (k = Wn(k)), h--;
              for (; 0 < p - h; ) (m = Wn(m)), p--;
              for (; h--; ) {
                if (k === m || (m !== null && k === m.alternate)) break t;
                (k = Wn(k)), (m = Wn(m));
              }
              k = null;
            }
          else k = null;
          x !== null && As(c, f, x, k, !1),
            g !== null && _ !== null && As(c, _, g, k, !0);
        }
      }
      e: {
        if (
          ((f = s ? Gn(s) : window),
          (x = f.nodeName && f.nodeName.toLowerCase()),
          x === "select" || (x === "input" && f.type === "file"))
        )
          var P = fm;
        else if (Ds(f))
          if (Od) P = vm;
          else {
            P = pm;
            var R = hm;
          }
        else
          (x = f.nodeName) &&
            x.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (P = mm);
        if (P && (P = P(e, s))) {
          Dd(c, P, n, d);
          break e;
        }
        R && R(e, f, s),
          e === "focusout" &&
            (R = f._wrapperState) &&
            R.controlled &&
            f.type === "number" &&
            ta(f, "number", f.value);
      }
      switch (((R = s ? Gn(s) : window), e)) {
        case "focusin":
          (Ds(R) || R.contentEditable === "true") &&
            ((Xn = R), (ha = s), (Xr = null));
          break;
        case "focusout":
          Xr = ha = Xn = null;
          break;
        case "mousedown":
          pa = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (pa = !1), Is(c, n, d);
          break;
        case "selectionchange":
          if (wm) break;
        case "keydown":
        case "keyup":
          Is(c, n, d);
      }
      var T;
      if (ou)
        e: {
          switch (e) {
            case "compositionstart":
              var y = "onCompositionStart";
              break e;
            case "compositionend":
              y = "onCompositionEnd";
              break e;
            case "compositionupdate":
              y = "onCompositionUpdate";
              break e;
          }
          y = void 0;
        }
      else
        Yn
          ? Td(e, n) && (y = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (y = "onCompositionStart");
      y &&
        (Ld &&
          n.locale !== "ko" &&
          (Yn || y !== "onCompositionStart"
            ? y === "onCompositionEnd" && Yn && (T = _d())
            : ((nn = d),
              (ru = "value" in nn ? nn.value : nn.textContent),
              (Yn = !0))),
        (R = xi(s, y)),
        0 < R.length &&
          ((y = new _s(y, e, null, n, d)),
          c.push({ event: y, listeners: R }),
          T ? (y.data = T) : ((T = Nd(n)), T !== null && (y.data = T)))),
        (T = am ? um(e, n) : sm(e, n)) &&
          ((s = xi(s, "onBeforeInput")),
          0 < s.length &&
            ((d = new _s("onBeforeInput", "beforeinput", null, n, d)),
            c.push({ event: d, listeners: s }),
            (d.data = T)));
    }
    Hd(c, t);
  });
}
function ul(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function xi(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = tl(e, n)),
      i != null && r.unshift(ul(e, i, l)),
      (i = tl(e, t)),
      i != null && r.push(ul(e, i, l))),
      (e = e.return);
  }
  return r;
}
function Wn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function As(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      s = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 &&
      s !== null &&
      ((a = s),
      l
        ? ((u = tl(n, i)), u != null && o.unshift(ul(n, u, a)))
        : l || ((u = tl(n, i)), u != null && o.push(ul(n, u, a)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var km = /\r\n?/g,
  Cm = /\u0000|\uFFFD/g;
function Bs(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      km,
      `
`,
    )
    .replace(Cm, "");
}
function Wl(e, t, n) {
  if (((t = Bs(t)), Bs(e) !== t && n)) throw Error(N(425));
}
function ki() {}
var ma = null,
  va = null;
function ya(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ga = typeof setTimeout == "function" ? setTimeout : void 0,
  Rm = typeof clearTimeout == "function" ? clearTimeout : void 0,
  $s = typeof Promise == "function" ? Promise : void 0,
  Pm =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof $s < "u"
        ? function (e) {
            return $s.resolve(null).then(e).catch(_m);
          }
        : ga;
function _m(e) {
  setTimeout(function () {
    throw e;
  });
}
function Do(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), ll(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  ll(t);
}
function un(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Hs(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Sr = Math.random().toString(36).slice(2),
  kt = "__reactFiber$" + Sr,
  sl = "__reactProps$" + Sr,
  At = "__reactContainer$" + Sr,
  wa = "__reactEvents$" + Sr,
  Lm = "__reactListeners$" + Sr,
  Tm = "__reactHandles$" + Sr;
function kn(e) {
  var t = e[kt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[At] || n[kt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Hs(e); e !== null; ) {
          if ((n = e[kt])) return n;
          e = Hs(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Sl(e) {
  return (
    (e = e[kt] || e[At]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Gn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function Ji(e) {
  return e[sl] || null;
}
var Sa = [],
  Zn = -1;
function yn(e) {
  return { current: e };
}
function ie(e) {
  0 > Zn || ((e.current = Sa[Zn]), (Sa[Zn] = null), Zn--);
}
function ne(e, t) {
  Zn++, (Sa[Zn] = e.current), (e.current = t);
}
var pn = {},
  ze = yn(pn),
  Ke = yn(!1),
  Nn = pn;
function dr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return pn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Qe(e) {
  return (e = e.childContextTypes), e != null;
}
function Ci() {
  ie(Ke), ie(ze);
}
function Ws(e, t, n) {
  if (ze.current !== pn) throw Error(N(168));
  ne(ze, t), ne(Ke, n);
}
function Vd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, hp(e) || "Unknown", l));
  return fe({}, n, r);
}
function Ri(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || pn),
    (Nn = ze.current),
    ne(ze, e),
    ne(Ke, Ke.current),
    !0
  );
}
function Vs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n
    ? ((e = Vd(e, t, Nn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ie(Ke),
      ie(ze),
      ne(ze, e))
    : ie(Ke),
    ne(Ke, n);
}
var Mt = null,
  Gi = !1,
  Oo = !1;
function Kd(e) {
  Mt === null ? (Mt = [e]) : Mt.push(e);
}
function Nm(e) {
  (Gi = !0), Kd(e);
}
function gn() {
  if (!Oo && Mt !== null) {
    Oo = !0;
    var e = 0,
      t = Z;
    try {
      var n = Mt;
      for (Z = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Mt = null), (Gi = !1);
    } catch (l) {
      throw (Mt !== null && (Mt = Mt.slice(e + 1)), vd(ba, gn), l);
    } finally {
      (Z = t), (Oo = !1);
    }
  }
  return null;
}
var qn = [],
  bn = 0,
  Pi = null,
  _i = 0,
  lt = [],
  it = 0,
  Dn = null,
  Ft = 1,
  It = "";
function En(e, t) {
  (qn[bn++] = _i), (qn[bn++] = Pi), (Pi = e), (_i = t);
}
function Qd(e, t, n) {
  (lt[it++] = Ft), (lt[it++] = It), (lt[it++] = Dn), (Dn = e);
  var r = Ft;
  e = It;
  var l = 32 - vt(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var i = 32 - vt(t) + l;
  if (30 < i) {
    var o = l - (l % 5);
    (i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (l -= o),
      (Ft = (1 << (32 - vt(t) + l)) | (n << l) | r),
      (It = i + e);
  } else (Ft = (1 << i) | (n << l) | r), (It = e);
}
function uu(e) {
  e.return !== null && (En(e, 1), Qd(e, 1, 0));
}
function su(e) {
  for (; e === Pi; )
    (Pi = qn[--bn]), (qn[bn] = null), (_i = qn[--bn]), (qn[bn] = null);
  for (; e === Dn; )
    (Dn = lt[--it]),
      (lt[it] = null),
      (It = lt[--it]),
      (lt[it] = null),
      (Ft = lt[--it]),
      (lt[it] = null);
}
var qe = null,
  Ze = null,
  se = !1,
  mt = null;
function Yd(e, t) {
  var n = ot(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Ks(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (qe = e), (Ze = un(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (qe = e), (Ze = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Dn !== null ? { id: Ft, overflow: It } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = ot(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (qe = e),
            (Ze = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ea(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function xa(e) {
  if (se) {
    var t = Ze;
    if (t) {
      var n = t;
      if (!Ks(e, t)) {
        if (Ea(e)) throw Error(N(418));
        t = un(n.nextSibling);
        var r = qe;
        t && Ks(e, t)
          ? Yd(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (se = !1), (qe = e));
      }
    } else {
      if (Ea(e)) throw Error(N(418));
      (e.flags = (e.flags & -4097) | 2), (se = !1), (qe = e);
    }
  }
}
function Qs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  qe = e;
}
function Vl(e) {
  if (e !== qe) return !1;
  if (!se) return Qs(e), (se = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !ya(e.type, e.memoizedProps))),
    t && (t = Ze))
  ) {
    if (Ea(e)) throw (Xd(), Error(N(418)));
    for (; t; ) Yd(e, t), (t = un(t.nextSibling));
  }
  if ((Qs(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ze = un(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ze = null;
    }
  } else Ze = qe ? un(e.stateNode.nextSibling) : null;
  return !0;
}
function Xd() {
  for (var e = Ze; e; ) e = un(e.nextSibling);
}
function fr() {
  (Ze = qe = null), (se = !1);
}
function cu(e) {
  mt === null ? (mt = [e]) : mt.push(e);
}
var Dm = Wt.ReactCurrentBatchConfig;
function Or(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (o) {
            var a = l.refs;
            o === null ? delete a[i] : (a[i] = o);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function Kl(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      N(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    ))
  );
}
function Ys(e) {
  var t = e._init;
  return t(e._payload);
}
function Jd(e) {
  function t(m, h) {
    if (e) {
      var p = m.deletions;
      p === null ? ((m.deletions = [h]), (m.flags |= 16)) : p.push(h);
    }
  }
  function n(m, h) {
    if (!e) return null;
    for (; h !== null; ) t(m, h), (h = h.sibling);
    return null;
  }
  function r(m, h) {
    for (m = new Map(); h !== null; )
      h.key !== null ? m.set(h.key, h) : m.set(h.index, h), (h = h.sibling);
    return m;
  }
  function l(m, h) {
    return (m = fn(m, h)), (m.index = 0), (m.sibling = null), m;
  }
  function i(m, h, p) {
    return (
      (m.index = p),
      e
        ? ((p = m.alternate),
          p !== null
            ? ((p = p.index), p < h ? ((m.flags |= 2), h) : p)
            : ((m.flags |= 2), h))
        : ((m.flags |= 1048576), h)
    );
  }
  function o(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function a(m, h, p, S) {
    return h === null || h.tag !== 6
      ? ((h = Ao(p, m.mode, S)), (h.return = m), h)
      : ((h = l(h, p)), (h.return = m), h);
  }
  function u(m, h, p, S) {
    var P = p.type;
    return P === Qn
      ? d(m, h, p.props.children, S, p.key)
      : h !== null &&
          (h.elementType === P ||
            (typeof P == "object" &&
              P !== null &&
              P.$$typeof === qt &&
              Ys(P) === h.type))
        ? ((S = l(h, p.props)), (S.ref = Or(m, h, p)), (S.return = m), S)
        : ((S = ci(p.type, p.key, p.props, null, m.mode, S)),
          (S.ref = Or(m, h, p)),
          (S.return = m),
          S);
  }
  function s(m, h, p, S) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== p.containerInfo ||
      h.stateNode.implementation !== p.implementation
      ? ((h = Bo(p, m.mode, S)), (h.return = m), h)
      : ((h = l(h, p.children || [])), (h.return = m), h);
  }
  function d(m, h, p, S, P) {
    return h === null || h.tag !== 7
      ? ((h = Tn(p, m.mode, S, P)), (h.return = m), h)
      : ((h = l(h, p)), (h.return = m), h);
  }
  function c(m, h, p) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return (h = Ao("" + h, m.mode, p)), (h.return = m), h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case zl:
          return (
            (p = ci(h.type, h.key, h.props, null, m.mode, p)),
            (p.ref = Or(m, null, h)),
            (p.return = m),
            p
          );
        case Kn:
          return (h = Bo(h, m.mode, p)), (h.return = m), h;
        case qt:
          var S = h._init;
          return c(m, S(h._payload), p);
      }
      if (Br(h) || _r(h))
        return (h = Tn(h, m.mode, p, null)), (h.return = m), h;
      Kl(m, h);
    }
    return null;
  }
  function f(m, h, p, S) {
    var P = h !== null ? h.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return P !== null ? null : a(m, h, "" + p, S);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case zl:
          return p.key === P ? u(m, h, p, S) : null;
        case Kn:
          return p.key === P ? s(m, h, p, S) : null;
        case qt:
          return (P = p._init), f(m, h, P(p._payload), S);
      }
      if (Br(p) || _r(p)) return P !== null ? null : d(m, h, p, S, null);
      Kl(m, p);
    }
    return null;
  }
  function x(m, h, p, S, P) {
    if ((typeof S == "string" && S !== "") || typeof S == "number")
      return (m = m.get(p) || null), a(h, m, "" + S, P);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case zl:
          return (m = m.get(S.key === null ? p : S.key) || null), u(h, m, S, P);
        case Kn:
          return (m = m.get(S.key === null ? p : S.key) || null), s(h, m, S, P);
        case qt:
          var R = S._init;
          return x(m, h, p, R(S._payload), P);
      }
      if (Br(S) || _r(S)) return (m = m.get(p) || null), d(h, m, S, P, null);
      Kl(h, S);
    }
    return null;
  }
  function g(m, h, p, S) {
    for (
      var P = null, R = null, T = h, y = (h = 0), M = null;
      T !== null && y < p.length;
      y++
    ) {
      T.index > y ? ((M = T), (T = null)) : (M = T.sibling);
      var O = f(m, T, p[y], S);
      if (O === null) {
        T === null && (T = M);
        break;
      }
      e && T && O.alternate === null && t(m, T),
        (h = i(O, h, y)),
        R === null ? (P = O) : (R.sibling = O),
        (R = O),
        (T = M);
    }
    if (y === p.length) return n(m, T), se && En(m, y), P;
    if (T === null) {
      for (; y < p.length; y++)
        (T = c(m, p[y], S)),
          T !== null &&
            ((h = i(T, h, y)), R === null ? (P = T) : (R.sibling = T), (R = T));
      return se && En(m, y), P;
    }
    for (T = r(m, T); y < p.length; y++)
      (M = x(T, m, y, p[y], S)),
        M !== null &&
          (e && M.alternate !== null && T.delete(M.key === null ? y : M.key),
          (h = i(M, h, y)),
          R === null ? (P = M) : (R.sibling = M),
          (R = M));
    return (
      e &&
        T.forEach(function (A) {
          return t(m, A);
        }),
      se && En(m, y),
      P
    );
  }
  function k(m, h, p, S) {
    var P = _r(p);
    if (typeof P != "function") throw Error(N(150));
    if (((p = P.call(p)), p == null)) throw Error(N(151));
    for (
      var R = (P = null), T = h, y = (h = 0), M = null, O = p.next();
      T !== null && !O.done;
      y++, O = p.next()
    ) {
      T.index > y ? ((M = T), (T = null)) : (M = T.sibling);
      var A = f(m, T, O.value, S);
      if (A === null) {
        T === null && (T = M);
        break;
      }
      e && T && A.alternate === null && t(m, T),
        (h = i(A, h, y)),
        R === null ? (P = A) : (R.sibling = A),
        (R = A),
        (T = M);
    }
    if (O.done) return n(m, T), se && En(m, y), P;
    if (T === null) {
      for (; !O.done; y++, O = p.next())
        (O = c(m, O.value, S)),
          O !== null &&
            ((h = i(O, h, y)), R === null ? (P = O) : (R.sibling = O), (R = O));
      return se && En(m, y), P;
    }
    for (T = r(m, T); !O.done; y++, O = p.next())
      (O = x(T, m, y, O.value, S)),
        O !== null &&
          (e && O.alternate !== null && T.delete(O.key === null ? y : O.key),
          (h = i(O, h, y)),
          R === null ? (P = O) : (R.sibling = O),
          (R = O));
    return (
      e &&
        T.forEach(function (Y) {
          return t(m, Y);
        }),
      se && En(m, y),
      P
    );
  }
  function _(m, h, p, S) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === Qn &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case zl:
          e: {
            for (var P = p.key, R = h; R !== null; ) {
              if (R.key === P) {
                if (((P = p.type), P === Qn)) {
                  if (R.tag === 7) {
                    n(m, R.sibling),
                      (h = l(R, p.props.children)),
                      (h.return = m),
                      (m = h);
                    break e;
                  }
                } else if (
                  R.elementType === P ||
                  (typeof P == "object" &&
                    P !== null &&
                    P.$$typeof === qt &&
                    Ys(P) === R.type)
                ) {
                  n(m, R.sibling),
                    (h = l(R, p.props)),
                    (h.ref = Or(m, R, p)),
                    (h.return = m),
                    (m = h);
                  break e;
                }
                n(m, R);
                break;
              } else t(m, R);
              R = R.sibling;
            }
            p.type === Qn
              ? ((h = Tn(p.props.children, m.mode, S, p.key)),
                (h.return = m),
                (m = h))
              : ((S = ci(p.type, p.key, p.props, null, m.mode, S)),
                (S.ref = Or(m, h, p)),
                (S.return = m),
                (m = S));
          }
          return o(m);
        case Kn:
          e: {
            for (R = p.key; h !== null; ) {
              if (h.key === R)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === p.containerInfo &&
                  h.stateNode.implementation === p.implementation
                ) {
                  n(m, h.sibling),
                    (h = l(h, p.children || [])),
                    (h.return = m),
                    (m = h);
                  break e;
                } else {
                  n(m, h);
                  break;
                }
              else t(m, h);
              h = h.sibling;
            }
            (h = Bo(p, m.mode, S)), (h.return = m), (m = h);
          }
          return o(m);
        case qt:
          return (R = p._init), _(m, h, R(p._payload), S);
      }
      if (Br(p)) return g(m, h, p, S);
      if (_r(p)) return k(m, h, p, S);
      Kl(m, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        h !== null && h.tag === 6
          ? (n(m, h.sibling), (h = l(h, p)), (h.return = m), (m = h))
          : (n(m, h), (h = Ao(p, m.mode, S)), (h.return = m), (m = h)),
        o(m))
      : n(m, h);
  }
  return _;
}
var hr = Jd(!0),
  Gd = Jd(!1),
  Li = yn(null),
  Ti = null,
  er = null,
  du = null;
function fu() {
  du = er = Ti = null;
}
function hu(e) {
  var t = Li.current;
  ie(Li), (e._currentValue = t);
}
function ka(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function ur(e, t) {
  (Ti = e),
    (du = er = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ve = !0), (e.firstContext = null));
}
function ut(e) {
  var t = e._currentValue;
  if (du !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), er === null)) {
      if (Ti === null) throw Error(N(308));
      (er = e), (Ti.dependencies = { lanes: 0, firstContext: e });
    } else er = er.next = e;
  return t;
}
var Cn = null;
function pu(e) {
  Cn === null ? (Cn = [e]) : Cn.push(e);
}
function Zd(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), pu(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Bt(e, r)
  );
}
function Bt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var bt = !1;
function mu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function qd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function jt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function sn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), X & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Bt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), pu(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Bt(e, n)
  );
}
function li(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), eu(e, n);
  }
}
function Xs(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (l = i = o) : (i = i.next = o), (n = n.next);
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Ni(e, t, n, r) {
  var l = e.updateQueue;
  bt = !1;
  var i = l.firstBaseUpdate,
    o = l.lastBaseUpdate,
    a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a,
      s = u.next;
    (u.next = null), o === null ? (i = s) : (o.next = s), (o = u);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (a = d.lastBaseUpdate),
      a !== o &&
        (a === null ? (d.firstBaseUpdate = s) : (a.next = s),
        (d.lastBaseUpdate = u)));
  }
  if (i !== null) {
    var c = l.baseState;
    (o = 0), (d = s = u = null), (a = i);
    do {
      var f = a.lane,
        x = a.eventTime;
      if ((r & f) === f) {
        d !== null &&
          (d = d.next =
            {
              eventTime: x,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var g = e,
            k = a;
          switch (((f = t), (x = n), k.tag)) {
            case 1:
              if (((g = k.payload), typeof g == "function")) {
                c = g.call(x, c, f);
                break e;
              }
              c = g;
              break e;
            case 3:
              g.flags = (g.flags & -65537) | 128;
            case 0:
              if (
                ((g = k.payload),
                (f = typeof g == "function" ? g.call(x, c, f) : g),
                f == null)
              )
                break e;
              c = fe({}, c, f);
              break e;
            case 2:
              bt = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (f = l.effects),
          f === null ? (l.effects = [a]) : f.push(a));
      } else
        (x = {
          eventTime: x,
          lane: f,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          d === null ? ((s = d = x), (u = c)) : (d = d.next = x),
          (o |= f);
      if (((a = a.next), a === null)) {
        if (((a = l.shared.pending), a === null)) break;
        (f = a),
          (a = f.next),
          (f.next = null),
          (l.lastBaseUpdate = f),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (d === null && (u = c),
      (l.baseState = u),
      (l.firstBaseUpdate = s),
      (l.lastBaseUpdate = d),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (o |= l.lane), (l = l.next);
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    (Mn |= o), (e.lanes = o), (e.memoizedState = c);
  }
}
function Js(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(N(191, l));
        l.call(r);
      }
    }
}
var El = {},
  Rt = yn(El),
  cl = yn(El),
  dl = yn(El);
function Rn(e) {
  if (e === El) throw Error(N(174));
  return e;
}
function vu(e, t) {
  switch ((ne(dl, t), ne(cl, e), ne(Rt, El), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ra(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = ra(t, e));
  }
  ie(Rt), ne(Rt, t);
}
function pr() {
  ie(Rt), ie(cl), ie(dl);
}
function bd(e) {
  Rn(dl.current);
  var t = Rn(Rt.current),
    n = ra(t, e.type);
  t !== n && (ne(cl, e), ne(Rt, n));
}
function yu(e) {
  cl.current === e && (ie(Rt), ie(cl));
}
var ce = yn(0);
function Di(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Mo = [];
function gu() {
  for (var e = 0; e < Mo.length; e++)
    Mo[e]._workInProgressVersionPrimary = null;
  Mo.length = 0;
}
var ii = Wt.ReactCurrentDispatcher,
  zo = Wt.ReactCurrentBatchConfig,
  On = 0,
  de = null,
  xe = null,
  Ce = null,
  Oi = !1,
  Jr = !1,
  fl = 0,
  Om = 0;
function De() {
  throw Error(N(321));
}
function wu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!gt(e[n], t[n])) return !1;
  return !0;
}
function Su(e, t, n, r, l, i) {
  if (
    ((On = i),
    (de = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ii.current = e === null || e.memoizedState === null ? Im : jm),
    (e = n(r, l)),
    Jr)
  ) {
    i = 0;
    do {
      if (((Jr = !1), (fl = 0), 25 <= i)) throw Error(N(301));
      (i += 1),
        (Ce = xe = null),
        (t.updateQueue = null),
        (ii.current = Um),
        (e = n(r, l));
    } while (Jr);
  }
  if (
    ((ii.current = Mi),
    (t = xe !== null && xe.next !== null),
    (On = 0),
    (Ce = xe = de = null),
    (Oi = !1),
    t)
  )
    throw Error(N(300));
  return e;
}
function Eu() {
  var e = fl !== 0;
  return (fl = 0), e;
}
function xt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Ce === null ? (de.memoizedState = Ce = e) : (Ce = Ce.next = e), Ce;
}
function st() {
  if (xe === null) {
    var e = de.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = xe.next;
  var t = Ce === null ? de.memoizedState : Ce.next;
  if (t !== null) (Ce = t), (xe = e);
  else {
    if (e === null) throw Error(N(310));
    (xe = e),
      (e = {
        memoizedState: xe.memoizedState,
        baseState: xe.baseState,
        baseQueue: xe.baseQueue,
        queue: xe.queue,
        next: null,
      }),
      Ce === null ? (de.memoizedState = Ce = e) : (Ce = Ce.next = e);
  }
  return Ce;
}
function hl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Fo(e) {
  var t = st(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = xe,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      (l.next = i.next), (i.next = o);
    }
    (r.baseQueue = l = i), (n.pending = null);
  }
  if (l !== null) {
    (i = l.next), (r = r.baseState);
    var a = (o = null),
      u = null,
      s = i;
    do {
      var d = s.lane;
      if ((On & d) === d)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null,
            }),
          (r = s.hasEagerState ? s.eagerState : e(r, s.action));
      else {
        var c = {
          lane: d,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        };
        u === null ? ((a = u = c), (o = r)) : (u = u.next = c),
          (de.lanes |= d),
          (Mn |= d);
      }
      s = s.next;
    } while (s !== null && s !== i);
    u === null ? (o = r) : (u.next = a),
      gt(r, t.memoizedState) || (Ve = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (i = l.lane), (de.lanes |= i), (Mn |= i), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Io(e) {
  var t = st(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = (l = l.next);
    do (i = e(i, o.action)), (o = o.next);
    while (o !== l);
    gt(i, t.memoizedState) || (Ve = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function ef() {}
function tf(e, t) {
  var n = de,
    r = st(),
    l = t(),
    i = !gt(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (Ve = !0)),
    (r = r.queue),
    xu(lf.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (Ce !== null && Ce.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      pl(9, rf.bind(null, n, r, l, t), void 0, null),
      Re === null)
    )
      throw Error(N(349));
    On & 30 || nf(n, t, l);
  }
  return l;
}
function nf(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = de.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (de.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function rf(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), of(t) && af(e);
}
function lf(e, t, n) {
  return n(function () {
    of(t) && af(e);
  });
}
function of(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !gt(e, n);
  } catch {
    return !0;
  }
}
function af(e) {
  var t = Bt(e, 1);
  t !== null && yt(t, e, 1, -1);
}
function Gs(e) {
  var t = xt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: hl,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Fm.bind(null, de, e)),
    [t.memoizedState, e]
  );
}
function pl(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = de.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (de.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function uf() {
  return st().memoizedState;
}
function oi(e, t, n, r) {
  var l = xt();
  (de.flags |= e),
    (l.memoizedState = pl(1 | t, n, void 0, r === void 0 ? null : r));
}
function Zi(e, t, n, r) {
  var l = st();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (xe !== null) {
    var o = xe.memoizedState;
    if (((i = o.destroy), r !== null && wu(r, o.deps))) {
      l.memoizedState = pl(t, n, i, r);
      return;
    }
  }
  (de.flags |= e), (l.memoizedState = pl(1 | t, n, i, r));
}
function Zs(e, t) {
  return oi(8390656, 8, e, t);
}
function xu(e, t) {
  return Zi(2048, 8, e, t);
}
function sf(e, t) {
  return Zi(4, 2, e, t);
}
function cf(e, t) {
  return Zi(4, 4, e, t);
}
function df(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function ff(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Zi(4, 4, df.bind(null, t, e), n)
  );
}
function ku() {}
function hf(e, t) {
  var n = st();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && wu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function pf(e, t) {
  var n = st();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && wu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function mf(e, t, n) {
  return On & 21
    ? (gt(n, t) || ((n = wd()), (de.lanes |= n), (Mn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ve = !0)), (e.memoizedState = n));
}
function Mm(e, t) {
  var n = Z;
  (Z = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = zo.transition;
  zo.transition = {};
  try {
    e(!1), t();
  } finally {
    (Z = n), (zo.transition = r);
  }
}
function vf() {
  return st().memoizedState;
}
function zm(e, t, n) {
  var r = dn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    yf(e))
  )
    gf(t, n);
  else if (((n = Zd(e, t, n, r)), n !== null)) {
    var l = Ae();
    yt(n, e, r, l), wf(n, t, r);
  }
}
function Fm(e, t, n) {
  var r = dn(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (yf(e)) gf(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var o = t.lastRenderedState,
          a = i(o, n);
        if (((l.hasEagerState = !0), (l.eagerState = a), gt(a, o))) {
          var u = t.interleaved;
          u === null
            ? ((l.next = l), pu(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = Zd(e, t, l, r)),
      n !== null && ((l = Ae()), yt(n, e, r, l), wf(n, t, r));
  }
}
function yf(e) {
  var t = e.alternate;
  return e === de || (t !== null && t === de);
}
function gf(e, t) {
  Jr = Oi = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function wf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), eu(e, n);
  }
}
var Mi = {
    readContext: ut,
    useCallback: De,
    useContext: De,
    useEffect: De,
    useImperativeHandle: De,
    useInsertionEffect: De,
    useLayoutEffect: De,
    useMemo: De,
    useReducer: De,
    useRef: De,
    useState: De,
    useDebugValue: De,
    useDeferredValue: De,
    useTransition: De,
    useMutableSource: De,
    useSyncExternalStore: De,
    useId: De,
    unstable_isNewReconciler: !1,
  },
  Im = {
    readContext: ut,
    useCallback: function (e, t) {
      return (xt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: ut,
    useEffect: Zs,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        oi(4194308, 4, df.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return oi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return oi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = xt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = xt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = zm.bind(null, de, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = xt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Gs,
    useDebugValue: ku,
    useDeferredValue: function (e) {
      return (xt().memoizedState = e);
    },
    useTransition: function () {
      var e = Gs(!1),
        t = e[0];
      return (e = Mm.bind(null, e[1])), (xt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = de,
        l = xt();
      if (se) {
        if (n === void 0) throw Error(N(407));
        n = n();
      } else {
        if (((n = t()), Re === null)) throw Error(N(349));
        On & 30 || nf(r, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (l.queue = i),
        Zs(lf.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        pl(9, rf.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = xt(),
        t = Re.identifierPrefix;
      if (se) {
        var n = It,
          r = Ft;
        (n = (r & ~(1 << (32 - vt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = fl++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Om++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  jm = {
    readContext: ut,
    useCallback: hf,
    useContext: ut,
    useEffect: xu,
    useImperativeHandle: ff,
    useInsertionEffect: sf,
    useLayoutEffect: cf,
    useMemo: pf,
    useReducer: Fo,
    useRef: uf,
    useState: function () {
      return Fo(hl);
    },
    useDebugValue: ku,
    useDeferredValue: function (e) {
      var t = st();
      return mf(t, xe.memoizedState, e);
    },
    useTransition: function () {
      var e = Fo(hl)[0],
        t = st().memoizedState;
      return [e, t];
    },
    useMutableSource: ef,
    useSyncExternalStore: tf,
    useId: vf,
    unstable_isNewReconciler: !1,
  },
  Um = {
    readContext: ut,
    useCallback: hf,
    useContext: ut,
    useEffect: xu,
    useImperativeHandle: ff,
    useInsertionEffect: sf,
    useLayoutEffect: cf,
    useMemo: pf,
    useReducer: Io,
    useRef: uf,
    useState: function () {
      return Io(hl);
    },
    useDebugValue: ku,
    useDeferredValue: function (e) {
      var t = st();
      return xe === null ? (t.memoizedState = e) : mf(t, xe.memoizedState, e);
    },
    useTransition: function () {
      var e = Io(hl)[0],
        t = st().memoizedState;
      return [e, t];
    },
    useMutableSource: ef,
    useSyncExternalStore: tf,
    useId: vf,
    unstable_isNewReconciler: !1,
  };
function ft(e, t) {
  if (e && e.defaultProps) {
    (t = fe({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ca(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : fe({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var qi = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Un(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ae(),
      l = dn(e),
      i = jt(r, l);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = sn(e, i, l)),
      t !== null && (yt(t, e, l, r), li(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ae(),
      l = dn(e),
      i = jt(r, l);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = sn(e, i, l)),
      t !== null && (yt(t, e, l, r), li(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ae(),
      r = dn(e),
      l = jt(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = sn(e, l, r)),
      t !== null && (yt(t, e, r, n), li(t, e, r));
  },
};
function qs(e, t, n, r, l, i, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !ol(n, r) || !ol(l, i)
        : !0
  );
}
function Sf(e, t, n) {
  var r = !1,
    l = pn,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = ut(i))
      : ((l = Qe(t) ? Nn : ze.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? dr(e, l) : pn)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = qi),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function bs(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && qi.enqueueReplaceState(t, t.state, null);
}
function Ra(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), mu(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (l.context = ut(i))
    : ((i = Qe(t) ? Nn : ze.current), (l.context = dr(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (Ca(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && qi.enqueueReplaceState(l, l.state, null),
      Ni(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function mr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += fp(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function jo(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Pa(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Am = typeof WeakMap == "function" ? WeakMap : Map;
function Ef(e, t, n) {
  (n = jt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Fi || ((Fi = !0), (Ia = r)), Pa(e, t);
    }),
    n
  );
}
function xf(e, t, n) {
  (n = jt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Pa(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        Pa(e, t),
          typeof r != "function" &&
            (cn === null ? (cn = new Set([this])) : cn.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function ec(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Am();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = bm.bind(null, e, t, n)), t.then(e, e));
}
function tc(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function nc(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = jt(-1, 1)), (t.tag = 2), sn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Bm = Wt.ReactCurrentOwner,
  Ve = !1;
function Ue(e, t, n, r) {
  t.child = e === null ? Gd(t, null, n, r) : hr(t, e.child, n, r);
}
function rc(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    ur(t, l),
    (r = Su(e, t, n, r, i, l)),
    (n = Eu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        $t(e, t, l))
      : (se && n && uu(t), (t.flags |= 1), Ue(e, t, r, l), t.child)
  );
}
function lc(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !Du(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), kf(e, t, i, r, l))
      : ((e = ci(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var o = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : ol), n(o, r) && e.ref === t.ref)
    )
      return $t(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = fn(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function kf(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (ol(i, r) && e.ref === t.ref)
      if (((Ve = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        e.flags & 131072 && (Ve = !0);
      else return (t.lanes = e.lanes), $t(e, t, l);
  }
  return _a(e, t, n, r, l);
}
function Cf(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        ne(nr, Je),
        (Je |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          ne(nr, Je),
          (Je |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        ne(nr, Je),
        (Je |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      ne(nr, Je),
      (Je |= r);
  return Ue(e, t, l, n), t.child;
}
function Rf(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function _a(e, t, n, r, l) {
  var i = Qe(n) ? Nn : ze.current;
  return (
    (i = dr(t, i)),
    ur(t, l),
    (n = Su(e, t, n, r, i, l)),
    (r = Eu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        $t(e, t, l))
      : (se && r && uu(t), (t.flags |= 1), Ue(e, t, n, l), t.child)
  );
}
function ic(e, t, n, r, l) {
  if (Qe(n)) {
    var i = !0;
    Ri(t);
  } else i = !1;
  if ((ur(t, l), t.stateNode === null))
    ai(e, t), Sf(t, n, r), Ra(t, n, r, l), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      a = t.memoizedProps;
    o.props = a;
    var u = o.context,
      s = n.contextType;
    typeof s == "object" && s !== null
      ? (s = ut(s))
      : ((s = Qe(n) ? Nn : ze.current), (s = dr(t, s)));
    var d = n.getDerivedStateFromProps,
      c =
        typeof d == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    c ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== r || u !== s) && bs(t, o, r, s)),
      (bt = !1);
    var f = t.memoizedState;
    (o.state = f),
      Ni(t, r, o, l),
      (u = t.memoizedState),
      a !== r || f !== u || Ke.current || bt
        ? (typeof d == "function" && (Ca(t, n, d, r), (u = t.memoizedState)),
          (a = bt || qs(t, n, a, r, f, u, s))
            ? (c ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (o.props = r),
          (o.state = u),
          (o.context = s),
          (r = a))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      qd(e, t),
      (a = t.memoizedProps),
      (s = t.type === t.elementType ? a : ft(t.type, a)),
      (o.props = s),
      (c = t.pendingProps),
      (f = o.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = ut(u))
        : ((u = Qe(n) ? Nn : ze.current), (u = dr(t, u)));
    var x = n.getDerivedStateFromProps;
    (d =
      typeof x == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== c || f !== u) && bs(t, o, r, u)),
      (bt = !1),
      (f = t.memoizedState),
      (o.state = f),
      Ni(t, r, o, l);
    var g = t.memoizedState;
    a !== c || f !== g || Ke.current || bt
      ? (typeof x == "function" && (Ca(t, n, x, r), (g = t.memoizedState)),
        (s = bt || qs(t, n, s, r, f, g, u) || !1)
          ? (d ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, g, u),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, g, u)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (a === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = g)),
        (o.props = r),
        (o.state = g),
        (o.context = u),
        (r = s))
      : (typeof o.componentDidUpdate != "function" ||
          (a === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return La(e, t, n, r, i, l);
}
function La(e, t, n, r, l, i) {
  Rf(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Vs(t, n, !1), $t(e, t, i);
  (r = t.stateNode), (Bm.current = t);
  var a =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = hr(t, e.child, null, i)), (t.child = hr(t, null, a, i)))
      : Ue(e, t, a, i),
    (t.memoizedState = r.state),
    l && Vs(t, n, !0),
    t.child
  );
}
function Pf(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Ws(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Ws(e, t.context, !1),
    vu(e, t.containerInfo);
}
function oc(e, t, n, r, l) {
  return fr(), cu(l), (t.flags |= 256), Ue(e, t, n, r), t.child;
}
var Ta = { dehydrated: null, treeContext: null, retryLane: 0 };
function Na(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function _f(e, t, n) {
  var r = t.pendingProps,
    l = ce.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    a;
  if (
    ((a = o) ||
      (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    a
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    ne(ce, l & 1),
    e === null)
  )
    return (
      xa(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = o))
                : (i = to(o, r, 0, null)),
              (e = Tn(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Na(n)),
              (t.memoizedState = Ta),
              e)
            : Cu(t, o))
    );
  if (((l = e.memoizedState), l !== null && ((a = l.dehydrated), a !== null)))
    return $m(e, t, o, r, a, l, n);
  if (i) {
    (i = r.fallback), (o = t.mode), (l = e.child), (a = l.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = fn(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      a !== null ? (i = fn(a, i)) : ((i = Tn(i, o, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? Na(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ta),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = fn(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Cu(e, t) {
  return (
    (t = to({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Ql(e, t, n, r) {
  return (
    r !== null && cu(r),
    hr(t, e.child, null, n),
    (e = Cu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function $m(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = jo(Error(N(422)))), Ql(e, t, o, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (l = t.mode),
          (r = to({ mode: "visible", children: r.children }, l, 0, null)),
          (i = Tn(i, l, o, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && hr(t, e.child, null, o),
          (t.child.memoizedState = Na(o)),
          (t.memoizedState = Ta),
          i);
  if (!(t.mode & 1)) return Ql(e, t, o, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (i = Error(N(419))), (r = jo(i, r, void 0)), Ql(e, t, o, r);
  }
  if (((a = (o & e.childLanes) !== 0), Ve || a)) {
    if (((r = Re), r !== null)) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | o) ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), Bt(e, l), yt(r, e, l, -1));
    }
    return Nu(), (r = jo(Error(N(421)))), Ql(e, t, o, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = ev.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Ze = un(l.nextSibling)),
      (qe = t),
      (se = !0),
      (mt = null),
      e !== null &&
        ((lt[it++] = Ft),
        (lt[it++] = It),
        (lt[it++] = Dn),
        (Ft = e.id),
        (It = e.overflow),
        (Dn = t)),
      (t = Cu(t, r.children)),
      (t.flags |= 4096),
      t);
}
function ac(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ka(e.return, t, n);
}
function Uo(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function Lf(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((Ue(e, t, r.children, n), (r = ce.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ac(e, n, t);
        else if (e.tag === 19) ac(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((ne(ce, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && Di(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Uo(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Di(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        Uo(t, !0, n, null, i);
        break;
      case "together":
        Uo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ai(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function $t(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Mn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, n = fn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = fn(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Hm(e, t, n) {
  switch (t.tag) {
    case 3:
      Pf(t), fr();
      break;
    case 5:
      bd(t);
      break;
    case 1:
      Qe(t.type) && Ri(t);
      break;
    case 4:
      vu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      ne(Li, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (ne(ce, ce.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? _f(e, t, n)
            : (ne(ce, ce.current & 1),
              (e = $t(e, t, n)),
              e !== null ? e.sibling : null);
      ne(ce, ce.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Lf(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        ne(ce, ce.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Cf(e, t, n);
  }
  return $t(e, t, n);
}
var Tf, Da, Nf, Df;
Tf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Da = function () {};
Nf = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Rn(Rt.current);
    var i = null;
    switch (n) {
      case "input":
        (l = bo(e, l)), (r = bo(e, r)), (i = []);
        break;
      case "select":
        (l = fe({}, l, { value: void 0 })),
          (r = fe({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (l = na(e, l)), (r = na(e, r)), (i = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ki);
    }
    la(n, r);
    var o;
    n = null;
    for (s in l)
      if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
        if (s === "style") {
          var a = l[s];
          for (o in a) a.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          s !== "dangerouslySetInnerHTML" &&
            s !== "children" &&
            s !== "suppressContentEditableWarning" &&
            s !== "suppressHydrationWarning" &&
            s !== "autoFocus" &&
            (br.hasOwnProperty(s)
              ? i || (i = [])
              : (i = i || []).push(s, null));
    for (s in r) {
      var u = r[s];
      if (
        ((a = l != null ? l[s] : void 0),
        r.hasOwnProperty(s) && u !== a && (u != null || a != null))
      )
        if (s === "style")
          if (a) {
            for (o in a)
              !a.hasOwnProperty(o) ||
                (u && u.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in u)
              u.hasOwnProperty(o) &&
                a[o] !== u[o] &&
                (n || (n = {}), (n[o] = u[o]));
          } else n || (i || (i = []), i.push(s, n)), (n = u);
        else
          s === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (i = i || []).push(s, u))
            : s === "children"
              ? (typeof u != "string" && typeof u != "number") ||
                (i = i || []).push(s, "" + u)
              : s !== "suppressContentEditableWarning" &&
                s !== "suppressHydrationWarning" &&
                (br.hasOwnProperty(s)
                  ? (u != null && s === "onScroll" && le("scroll", e),
                    i || a === u || (i = []))
                  : (i = i || []).push(s, u));
    }
    n && (i = i || []).push("style", n);
    var s = i;
    (t.updateQueue = s) && (t.flags |= 4);
  }
};
Df = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Mr(e, t) {
  if (!se)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Wm(e, t, n) {
  var r = t.pendingProps;
  switch ((su(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Oe(t), null;
    case 1:
      return Qe(t.type) && Ci(), Oe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        pr(),
        ie(Ke),
        ie(ze),
        gu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Vl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), mt !== null && (Aa(mt), (mt = null)))),
        Da(e, t),
        Oe(t),
        null
      );
    case 5:
      yu(t);
      var l = Rn(dl.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Nf(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return Oe(t), null;
        }
        if (((e = Rn(Rt.current)), Vl(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[kt] = t), (r[sl] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              le("cancel", r), le("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              le("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Hr.length; l++) le(Hr[l], r);
              break;
            case "source":
              le("error", r);
              break;
            case "img":
            case "image":
            case "link":
              le("error", r), le("load", r);
              break;
            case "details":
              le("toggle", r);
              break;
            case "input":
              vs(r, i), le("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                le("invalid", r);
              break;
            case "textarea":
              gs(r, i), le("invalid", r);
          }
          la(n, i), (l = null);
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var a = i[o];
              o === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (i.suppressHydrationWarning !== !0 &&
                      Wl(r.textContent, a, e),
                    (l = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (i.suppressHydrationWarning !== !0 &&
                      Wl(r.textContent, a, e),
                    (l = ["children", "" + a]))
                : br.hasOwnProperty(o) &&
                  a != null &&
                  o === "onScroll" &&
                  le("scroll", r);
            }
          switch (n) {
            case "input":
              Fl(r), ys(r, i, !0);
              break;
            case "textarea":
              Fl(r), ws(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = ki);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = ld(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === "select" &&
                      ((o = e),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[kt] = t),
            (e[sl] = r),
            Tf(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = ia(n, r)), n)) {
              case "dialog":
                le("cancel", e), le("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                le("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Hr.length; l++) le(Hr[l], e);
                l = r;
                break;
              case "source":
                le("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                le("error", e), le("load", e), (l = r);
                break;
              case "details":
                le("toggle", e), (l = r);
                break;
              case "input":
                vs(e, r), (l = bo(e, r)), le("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = fe({}, r, { value: void 0 })),
                  le("invalid", e);
                break;
              case "textarea":
                gs(e, r), (l = na(e, r)), le("invalid", e);
                break;
              default:
                l = r;
            }
            la(n, l), (a = l);
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var u = a[i];
                i === "style"
                  ? ad(e, u)
                  : i === "dangerouslySetInnerHTML"
                    ? ((u = u ? u.__html : void 0), u != null && id(e, u))
                    : i === "children"
                      ? typeof u == "string"
                        ? (n !== "textarea" || u !== "") && el(e, u)
                        : typeof u == "number" && el(e, "" + u)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (br.hasOwnProperty(i)
                          ? u != null && i === "onScroll" && le("scroll", e)
                          : u != null && Xa(e, i, u, o));
              }
            switch (n) {
              case "input":
                Fl(e), ys(e, r, !1);
                break;
              case "textarea":
                Fl(e), ws(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + hn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? lr(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      lr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ki);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Oe(t), null;
    case 6:
      if (e && t.stateNode != null) Df(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (((n = Rn(dl.current)), Rn(Rt.current), Vl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[kt] = t),
            (i = r.nodeValue !== n) && ((e = qe), e !== null))
          )
            switch (e.tag) {
              case 3:
                Wl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Wl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[kt] = t),
            (t.stateNode = r);
      }
      return Oe(t), null;
    case 13:
      if (
        (ie(ce),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (se && Ze !== null && t.mode & 1 && !(t.flags & 128))
          Xd(), fr(), (t.flags |= 98560), (i = !1);
        else if (((i = Vl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(N(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(N(317));
            i[kt] = t;
          } else
            fr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Oe(t), (i = !1);
        } else mt !== null && (Aa(mt), (mt = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ce.current & 1 ? ke === 0 && (ke = 3) : Nu())),
          t.updateQueue !== null && (t.flags |= 4),
          Oe(t),
          null);
    case 4:
      return (
        pr(), Da(e, t), e === null && al(t.stateNode.containerInfo), Oe(t), null
      );
    case 10:
      return hu(t.type._context), Oe(t), null;
    case 17:
      return Qe(t.type) && Ci(), Oe(t), null;
    case 19:
      if ((ie(ce), (i = t.memoizedState), i === null)) return Oe(t), null;
      if (((r = (t.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) Mr(i, !1);
        else {
          if (ke !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = Di(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    Mr(i, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (e = o.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return ne(ce, (ce.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            ve() > vr &&
            ((t.flags |= 128), (r = !0), Mr(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Di(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Mr(i, !0),
              i.tail === null && i.tailMode === "hidden" && !o.alternate && !se)
            )
              return Oe(t), null;
          } else
            2 * ve() - i.renderingStartTime > vr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Mr(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = i.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (i.last = o));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = ve()),
          (t.sibling = null),
          (n = ce.current),
          ne(ce, r ? (n & 1) | 2 : n & 1),
          t)
        : (Oe(t), null);
    case 22:
    case 23:
      return (
        Tu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Je & 1073741824 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Oe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function Vm(e, t) {
  switch ((su(t), t.tag)) {
    case 1:
      return (
        Qe(t.type) && Ci(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        pr(),
        ie(Ke),
        ie(ze),
        gu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return yu(t), null;
    case 13:
      if (
        (ie(ce), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(N(340));
        fr();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return ie(ce), null;
    case 4:
      return pr(), null;
    case 10:
      return hu(t.type._context), null;
    case 22:
    case 23:
      return Tu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Yl = !1,
  Me = !1,
  Km = typeof WeakSet == "function" ? WeakSet : Set,
  I = null;
function tr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        me(e, t, r);
      }
    else n.current = null;
}
function Oa(e, t, n) {
  try {
    n();
  } catch (r) {
    me(e, t, r);
  }
}
var uc = !1;
function Qm(e, t) {
  if (((ma = Si), (e = Fd()), au(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            a = -1,
            u = -1,
            s = 0,
            d = 0,
            c = e,
            f = null;
          t: for (;;) {
            for (
              var x;
              c !== n || (l !== 0 && c.nodeType !== 3) || (a = o + l),
                c !== i || (r !== 0 && c.nodeType !== 3) || (u = o + r),
                c.nodeType === 3 && (o += c.nodeValue.length),
                (x = c.firstChild) !== null;

            )
              (f = c), (c = x);
            for (;;) {
              if (c === e) break t;
              if (
                (f === n && ++s === l && (a = o),
                f === i && ++d === r && (u = o),
                (x = c.nextSibling) !== null)
              )
                break;
              (c = f), (f = c.parentNode);
            }
            c = x;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (va = { focusedElem: e, selectionRange: n }, Si = !1, I = t; I !== null; )
    if (((t = I), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (I = e);
    else
      for (; I !== null; ) {
        t = I;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var k = g.memoizedProps,
                    _ = g.memoizedState,
                    m = t.stateNode,
                    h = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? k : ft(t.type, k),
                      _,
                    );
                  m.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(N(163));
            }
        } catch (S) {
          me(t, t.return, S);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (I = e);
          break;
        }
        I = t.return;
      }
  return (g = uc), (uc = !1), g;
}
function Gr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        (l.destroy = void 0), i !== void 0 && Oa(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function bi(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Ma(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Of(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Of(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[kt], delete t[sl], delete t[wa], delete t[Lm], delete t[Tm])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Mf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function sc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Mf(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function za(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ki));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (za(e, t, n), e = e.sibling; e !== null; ) za(e, t, n), (e = e.sibling);
}
function Fa(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Fa(e, t, n), e = e.sibling; e !== null; ) Fa(e, t, n), (e = e.sibling);
}
var Le = null,
  ht = !1;
function Gt(e, t, n) {
  for (n = n.child; n !== null; ) zf(e, t, n), (n = n.sibling);
}
function zf(e, t, n) {
  if (Ct && typeof Ct.onCommitFiberUnmount == "function")
    try {
      Ct.onCommitFiberUnmount(Ki, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Me || tr(n, t);
    case 6:
      var r = Le,
        l = ht;
      (Le = null),
        Gt(e, t, n),
        (Le = r),
        (ht = l),
        Le !== null &&
          (ht
            ? ((e = Le),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Le.removeChild(n.stateNode));
      break;
    case 18:
      Le !== null &&
        (ht
          ? ((e = Le),
            (n = n.stateNode),
            e.nodeType === 8
              ? Do(e.parentNode, n)
              : e.nodeType === 1 && Do(e, n),
            ll(e))
          : Do(Le, n.stateNode));
      break;
    case 4:
      (r = Le),
        (l = ht),
        (Le = n.stateNode.containerInfo),
        (ht = !0),
        Gt(e, t, n),
        (Le = r),
        (ht = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Me &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          (i = i.tag),
            o !== void 0 && (i & 2 || i & 4) && Oa(n, t, o),
            (l = l.next);
        } while (l !== r);
      }
      Gt(e, t, n);
      break;
    case 1:
      if (
        !Me &&
        (tr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          me(n, t, a);
        }
      Gt(e, t, n);
      break;
    case 21:
      Gt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Me = (r = Me) || n.memoizedState !== null), Gt(e, t, n), (Me = r))
        : Gt(e, t, n);
      break;
    default:
      Gt(e, t, n);
  }
}
function cc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Km()),
      t.forEach(function (r) {
        var l = tv.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function dt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          a = o;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (Le = a.stateNode), (ht = !1);
              break e;
            case 3:
              (Le = a.stateNode.containerInfo), (ht = !0);
              break e;
            case 4:
              (Le = a.stateNode.containerInfo), (ht = !0);
              break e;
          }
          a = a.return;
        }
        if (Le === null) throw Error(N(160));
        zf(i, o, l), (Le = null), (ht = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (s) {
        me(l, t, s);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Ff(t, e), (t = t.sibling);
}
function Ff(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((dt(t, e), Et(e), r & 4)) {
        try {
          Gr(3, e, e.return), bi(3, e);
        } catch (k) {
          me(e, e.return, k);
        }
        try {
          Gr(5, e, e.return);
        } catch (k) {
          me(e, e.return, k);
        }
      }
      break;
    case 1:
      dt(t, e), Et(e), r & 512 && n !== null && tr(n, n.return);
      break;
    case 5:
      if (
        (dt(t, e),
        Et(e),
        r & 512 && n !== null && tr(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          el(l, "");
        } catch (k) {
          me(e, e.return, k);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            a === "input" && i.type === "radio" && i.name != null && nd(l, i),
              ia(a, o);
            var s = ia(a, i);
            for (o = 0; o < u.length; o += 2) {
              var d = u[o],
                c = u[o + 1];
              d === "style"
                ? ad(l, c)
                : d === "dangerouslySetInnerHTML"
                  ? id(l, c)
                  : d === "children"
                    ? el(l, c)
                    : Xa(l, d, c, s);
            }
            switch (a) {
              case "input":
                ea(l, i);
                break;
              case "textarea":
                rd(l, i);
                break;
              case "select":
                var f = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var x = i.value;
                x != null
                  ? lr(l, !!i.multiple, x, !1)
                  : f !== !!i.multiple &&
                    (i.defaultValue != null
                      ? lr(l, !!i.multiple, i.defaultValue, !0)
                      : lr(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[sl] = i;
          } catch (k) {
            me(e, e.return, k);
          }
      }
      break;
    case 6:
      if ((dt(t, e), Et(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        (l = e.stateNode), (i = e.memoizedProps);
        try {
          l.nodeValue = i;
        } catch (k) {
          me(e, e.return, k);
        }
      }
      break;
    case 3:
      if (
        (dt(t, e), Et(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          ll(t.containerInfo);
        } catch (k) {
          me(e, e.return, k);
        }
      break;
    case 4:
      dt(t, e), Et(e);
      break;
    case 13:
      dt(t, e),
        Et(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (_u = ve())),
        r & 4 && cc(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Me = (s = Me) || d), dt(t, e), (Me = s)) : dt(t, e),
        Et(e),
        r & 8192)
      ) {
        if (
          ((s = e.memoizedState !== null),
          (e.stateNode.isHidden = s) && !d && e.mode & 1)
        )
          for (I = e, d = e.child; d !== null; ) {
            for (c = I = d; I !== null; ) {
              switch (((f = I), (x = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Gr(4, f, f.return);
                  break;
                case 1:
                  tr(f, f.return);
                  var g = f.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    (r = f), (n = f.return);
                    try {
                      (t = r),
                        (g.props = t.memoizedProps),
                        (g.state = t.memoizedState),
                        g.componentWillUnmount();
                    } catch (k) {
                      me(r, n, k);
                    }
                  }
                  break;
                case 5:
                  tr(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    fc(c);
                    continue;
                  }
              }
              x !== null ? ((x.return = f), (I = x)) : fc(c);
            }
            d = d.sibling;
          }
        e: for (d = null, c = e; ; ) {
          if (c.tag === 5) {
            if (d === null) {
              d = c;
              try {
                (l = c.stateNode),
                  s
                    ? ((i = l.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((a = c.stateNode),
                      (u = c.memoizedProps.style),
                      (o =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (a.style.display = od("display", o)));
              } catch (k) {
                me(e, e.return, k);
              }
            }
          } else if (c.tag === 6) {
            if (d === null)
              try {
                c.stateNode.nodeValue = s ? "" : c.memoizedProps;
              } catch (k) {
                me(e, e.return, k);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === e) &&
            c.child !== null
          ) {
            (c.child.return = c), (c = c.child);
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            d === c && (d = null), (c = c.return);
          }
          d === c && (d = null), (c.sibling.return = c.return), (c = c.sibling);
        }
      }
      break;
    case 19:
      dt(t, e), Et(e), r & 4 && cc(e);
      break;
    case 21:
      break;
    default:
      dt(t, e), Et(e);
  }
}
function Et(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Mf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (el(l, ""), (r.flags &= -33));
          var i = sc(e);
          Fa(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            a = sc(e);
          za(e, a, o);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      me(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Ym(e, t, n) {
  (I = e), If(e);
}
function If(e, t, n) {
  for (var r = (e.mode & 1) !== 0; I !== null; ) {
    var l = I,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Yl;
      if (!o) {
        var a = l.alternate,
          u = (a !== null && a.memoizedState !== null) || Me;
        a = Yl;
        var s = Me;
        if (((Yl = o), (Me = u) && !s))
          for (I = l; I !== null; )
            (o = I),
              (u = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? hc(l)
                : u !== null
                  ? ((u.return = o), (I = u))
                  : hc(l);
        for (; i !== null; ) (I = i), If(i), (i = i.sibling);
        (I = l), (Yl = a), (Me = s);
      }
      dc(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (I = i)) : dc(e);
  }
}
function dc(e) {
  for (; I !== null; ) {
    var t = I;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Me || bi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Me)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : ft(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = t.updateQueue;
              i !== null && Js(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Js(t, o, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var s = t.alternate;
                if (s !== null) {
                  var d = s.memoizedState;
                  if (d !== null) {
                    var c = d.dehydrated;
                    c !== null && ll(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(N(163));
          }
        Me || (t.flags & 512 && Ma(t));
      } catch (f) {
        me(t, t.return, f);
      }
    }
    if (t === e) {
      I = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (I = n);
      break;
    }
    I = t.return;
  }
}
function fc(e) {
  for (; I !== null; ) {
    var t = I;
    if (t === e) {
      I = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (I = n);
      break;
    }
    I = t.return;
  }
}
function hc(e) {
  for (; I !== null; ) {
    var t = I;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            bi(4, t);
          } catch (u) {
            me(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              me(t, l, u);
            }
          }
          var i = t.return;
          try {
            Ma(t);
          } catch (u) {
            me(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Ma(t);
          } catch (u) {
            me(t, o, u);
          }
      }
    } catch (u) {
      me(t, t.return, u);
    }
    if (t === e) {
      I = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (I = a);
      break;
    }
    I = t.return;
  }
}
var Xm = Math.ceil,
  zi = Wt.ReactCurrentDispatcher,
  Ru = Wt.ReactCurrentOwner,
  at = Wt.ReactCurrentBatchConfig,
  X = 0,
  Re = null,
  we = null,
  Te = 0,
  Je = 0,
  nr = yn(0),
  ke = 0,
  ml = null,
  Mn = 0,
  eo = 0,
  Pu = 0,
  Zr = null,
  We = null,
  _u = 0,
  vr = 1 / 0,
  Ot = null,
  Fi = !1,
  Ia = null,
  cn = null,
  Xl = !1,
  rn = null,
  Ii = 0,
  qr = 0,
  ja = null,
  ui = -1,
  si = 0;
function Ae() {
  return X & 6 ? ve() : ui !== -1 ? ui : (ui = ve());
}
function dn(e) {
  return e.mode & 1
    ? X & 2 && Te !== 0
      ? Te & -Te
      : Dm.transition !== null
        ? (si === 0 && (si = wd()), si)
        : ((e = Z),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Pd(e.type))),
          e)
    : 1;
}
function yt(e, t, n, r) {
  if (50 < qr) throw ((qr = 0), (ja = null), Error(N(185)));
  gl(e, n, r),
    (!(X & 2) || e !== Re) &&
      (e === Re && (!(X & 2) && (eo |= n), ke === 4 && tn(e, Te)),
      Ye(e, r),
      n === 1 && X === 0 && !(t.mode & 1) && ((vr = ve() + 500), Gi && gn()));
}
function Ye(e, t) {
  var n = e.callbackNode;
  Dp(e, t);
  var r = wi(e, e === Re ? Te : 0);
  if (r === 0)
    n !== null && xs(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && xs(n), t === 1))
      e.tag === 0 ? Nm(pc.bind(null, e)) : Kd(pc.bind(null, e)),
        Pm(function () {
          !(X & 6) && gn();
        }),
        (n = null);
    else {
      switch (Sd(r)) {
        case 1:
          n = ba;
          break;
        case 4:
          n = yd;
          break;
        case 16:
          n = gi;
          break;
        case 536870912:
          n = gd;
          break;
        default:
          n = gi;
      }
      n = Vf(n, jf.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function jf(e, t) {
  if (((ui = -1), (si = 0), X & 6)) throw Error(N(327));
  var n = e.callbackNode;
  if (sr() && e.callbackNode !== n) return null;
  var r = wi(e, e === Re ? Te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ji(e, r);
  else {
    t = r;
    var l = X;
    X |= 2;
    var i = Af();
    (Re !== e || Te !== t) && ((Ot = null), (vr = ve() + 500), Ln(e, t));
    do
      try {
        Zm();
        break;
      } catch (a) {
        Uf(e, a);
      }
    while (!0);
    fu(),
      (zi.current = i),
      (X = l),
      we !== null ? (t = 0) : ((Re = null), (Te = 0), (t = ke));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = ca(e)), l !== 0 && ((r = l), (t = Ua(e, l)))), t === 1)
    )
      throw ((n = ml), Ln(e, 0), tn(e, r), Ye(e, ve()), n);
    if (t === 6) tn(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Jm(l) &&
          ((t = ji(e, r)),
          t === 2 && ((i = ca(e)), i !== 0 && ((r = i), (t = Ua(e, i)))),
          t === 1))
      )
        throw ((n = ml), Ln(e, 0), tn(e, r), Ye(e, ve()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          xn(e, We, Ot);
          break;
        case 3:
          if (
            (tn(e, r), (r & 130023424) === r && ((t = _u + 500 - ve()), 10 < t))
          ) {
            if (wi(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              Ae(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = ga(xn.bind(null, e, We, Ot), t);
            break;
          }
          xn(e, We, Ot);
          break;
        case 4:
          if ((tn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - vt(r);
            (i = 1 << o), (o = t[o]), o > l && (l = o), (r &= ~i);
          }
          if (
            ((r = l),
            (r = ve() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Xm(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ga(xn.bind(null, e, We, Ot), r);
            break;
          }
          xn(e, We, Ot);
          break;
        case 5:
          xn(e, We, Ot);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return Ye(e, ve()), e.callbackNode === n ? jf.bind(null, e) : null;
}
function Ua(e, t) {
  var n = Zr;
  return (
    e.current.memoizedState.isDehydrated && (Ln(e, t).flags |= 256),
    (e = ji(e, t)),
    e !== 2 && ((t = We), (We = n), t !== null && Aa(t)),
    e
  );
}
function Aa(e) {
  We === null ? (We = e) : We.push.apply(We, e);
}
function Jm(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!gt(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function tn(e, t) {
  for (
    t &= ~Pu,
      t &= ~eo,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - vt(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function pc(e) {
  if (X & 6) throw Error(N(327));
  sr();
  var t = wi(e, 0);
  if (!(t & 1)) return Ye(e, ve()), null;
  var n = ji(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ca(e);
    r !== 0 && ((t = r), (n = Ua(e, r)));
  }
  if (n === 1) throw ((n = ml), Ln(e, 0), tn(e, t), Ye(e, ve()), n);
  if (n === 6) throw Error(N(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    xn(e, We, Ot),
    Ye(e, ve()),
    null
  );
}
function Lu(e, t) {
  var n = X;
  X |= 1;
  try {
    return e(t);
  } finally {
    (X = n), X === 0 && ((vr = ve() + 500), Gi && gn());
  }
}
function zn(e) {
  rn !== null && rn.tag === 0 && !(X & 6) && sr();
  var t = X;
  X |= 1;
  var n = at.transition,
    r = Z;
  try {
    if (((at.transition = null), (Z = 1), e)) return e();
  } finally {
    (Z = r), (at.transition = n), (X = t), !(X & 6) && gn();
  }
}
function Tu() {
  (Je = nr.current), ie(nr);
}
function Ln(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Rm(n)), we !== null))
    for (n = we.return; n !== null; ) {
      var r = n;
      switch ((su(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Ci();
          break;
        case 3:
          pr(), ie(Ke), ie(ze), gu();
          break;
        case 5:
          yu(r);
          break;
        case 4:
          pr();
          break;
        case 13:
          ie(ce);
          break;
        case 19:
          ie(ce);
          break;
        case 10:
          hu(r.type._context);
          break;
        case 22:
        case 23:
          Tu();
      }
      n = n.return;
    }
  if (
    ((Re = e),
    (we = e = fn(e.current, null)),
    (Te = Je = t),
    (ke = 0),
    (ml = null),
    (Pu = eo = Mn = 0),
    (We = Zr = null),
    Cn !== null)
  ) {
    for (t = 0; t < Cn.length; t++)
      if (((n = Cn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          (i.next = l), (r.next = o);
        }
        n.pending = r;
      }
    Cn = null;
  }
  return e;
}
function Uf(e, t) {
  do {
    var n = we;
    try {
      if ((fu(), (ii.current = Mi), Oi)) {
        for (var r = de.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        Oi = !1;
      }
      if (
        ((On = 0),
        (Ce = xe = de = null),
        (Jr = !1),
        (fl = 0),
        (Ru.current = null),
        n === null || n.return === null)
      ) {
        (ke = 1), (ml = t), (we = null);
        break;
      }
      e: {
        var i = e,
          o = n.return,
          a = n,
          u = t;
        if (
          ((t = Te),
          (a.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var s = u,
            d = a,
            c = d.tag;
          if (!(d.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var f = d.alternate;
            f
              ? ((d.updateQueue = f.updateQueue),
                (d.memoizedState = f.memoizedState),
                (d.lanes = f.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var x = tc(o);
          if (x !== null) {
            (x.flags &= -257),
              nc(x, o, a, i, t),
              x.mode & 1 && ec(i, s, t),
              (t = x),
              (u = s);
            var g = t.updateQueue;
            if (g === null) {
              var k = new Set();
              k.add(u), (t.updateQueue = k);
            } else g.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              ec(i, s, t), Nu();
              break e;
            }
            u = Error(N(426));
          }
        } else if (se && a.mode & 1) {
          var _ = tc(o);
          if (_ !== null) {
            !(_.flags & 65536) && (_.flags |= 256),
              nc(_, o, a, i, t),
              cu(mr(u, a));
            break e;
          }
        }
        (i = u = mr(u, a)),
          ke !== 4 && (ke = 2),
          Zr === null ? (Zr = [i]) : Zr.push(i),
          (i = o);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var m = Ef(i, u, t);
              Xs(i, m);
              break e;
            case 1:
              a = u;
              var h = i.type,
                p = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (cn === null || !cn.has(p))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var S = xf(i, a, t);
                Xs(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      $f(n);
    } catch (P) {
      (t = P), we === n && n !== null && (we = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Af() {
  var e = zi.current;
  return (zi.current = Mi), e === null ? Mi : e;
}
function Nu() {
  (ke === 0 || ke === 3 || ke === 2) && (ke = 4),
    Re === null || (!(Mn & 268435455) && !(eo & 268435455)) || tn(Re, Te);
}
function ji(e, t) {
  var n = X;
  X |= 2;
  var r = Af();
  (Re !== e || Te !== t) && ((Ot = null), Ln(e, t));
  do
    try {
      Gm();
      break;
    } catch (l) {
      Uf(e, l);
    }
  while (!0);
  if ((fu(), (X = n), (zi.current = r), we !== null)) throw Error(N(261));
  return (Re = null), (Te = 0), ke;
}
function Gm() {
  for (; we !== null; ) Bf(we);
}
function Zm() {
  for (; we !== null && !xp(); ) Bf(we);
}
function Bf(e) {
  var t = Wf(e.alternate, e, Je);
  (e.memoizedProps = e.pendingProps),
    t === null ? $f(e) : (we = t),
    (Ru.current = null);
}
function $f(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Vm(n, t)), n !== null)) {
        (n.flags &= 32767), (we = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ke = 6), (we = null);
        return;
      }
    } else if (((n = Wm(n, t, Je)), n !== null)) {
      we = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      we = t;
      return;
    }
    we = t = e;
  } while (t !== null);
  ke === 0 && (ke = 5);
}
function xn(e, t, n) {
  var r = Z,
    l = at.transition;
  try {
    (at.transition = null), (Z = 1), qm(e, t, n, r);
  } finally {
    (at.transition = l), (Z = r);
  }
  return null;
}
function qm(e, t, n, r) {
  do sr();
  while (rn !== null);
  if (X & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (Op(e, i),
    e === Re && ((we = Re = null), (Te = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Xl ||
      ((Xl = !0),
      Vf(gi, function () {
        return sr(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = at.transition), (at.transition = null);
    var o = Z;
    Z = 1;
    var a = X;
    (X |= 4),
      (Ru.current = null),
      Qm(e, n),
      Ff(n, e),
      gm(va),
      (Si = !!ma),
      (va = ma = null),
      (e.current = n),
      Ym(n),
      kp(),
      (X = a),
      (Z = o),
      (at.transition = i);
  } else e.current = n;
  if (
    (Xl && ((Xl = !1), (rn = e), (Ii = l)),
    (i = e.pendingLanes),
    i === 0 && (cn = null),
    Pp(n.stateNode),
    Ye(e, ve()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Fi) throw ((Fi = !1), (e = Ia), (Ia = null), e);
  return (
    Ii & 1 && e.tag !== 0 && sr(),
    (i = e.pendingLanes),
    i & 1 ? (e === ja ? qr++ : ((qr = 0), (ja = e))) : (qr = 0),
    gn(),
    null
  );
}
function sr() {
  if (rn !== null) {
    var e = Sd(Ii),
      t = at.transition,
      n = Z;
    try {
      if (((at.transition = null), (Z = 16 > e ? 16 : e), rn === null))
        var r = !1;
      else {
        if (((e = rn), (rn = null), (Ii = 0), X & 6)) throw Error(N(331));
        var l = X;
        for (X |= 4, I = e.current; I !== null; ) {
          var i = I,
            o = i.child;
          if (I.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var s = a[u];
                for (I = s; I !== null; ) {
                  var d = I;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Gr(8, d, i);
                  }
                  var c = d.child;
                  if (c !== null) (c.return = d), (I = c);
                  else
                    for (; I !== null; ) {
                      d = I;
                      var f = d.sibling,
                        x = d.return;
                      if ((Of(d), d === s)) {
                        I = null;
                        break;
                      }
                      if (f !== null) {
                        (f.return = x), (I = f);
                        break;
                      }
                      I = x;
                    }
                }
              }
              var g = i.alternate;
              if (g !== null) {
                var k = g.child;
                if (k !== null) {
                  g.child = null;
                  do {
                    var _ = k.sibling;
                    (k.sibling = null), (k = _);
                  } while (k !== null);
                }
              }
              I = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) (o.return = i), (I = o);
          else
            e: for (; I !== null; ) {
              if (((i = I), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Gr(9, i, i.return);
                }
              var m = i.sibling;
              if (m !== null) {
                (m.return = i.return), (I = m);
                break e;
              }
              I = i.return;
            }
        }
        var h = e.current;
        for (I = h; I !== null; ) {
          o = I;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) (p.return = o), (I = p);
          else
            e: for (o = h; I !== null; ) {
              if (((a = I), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      bi(9, a);
                  }
                } catch (P) {
                  me(a, a.return, P);
                }
              if (a === o) {
                I = null;
                break e;
              }
              var S = a.sibling;
              if (S !== null) {
                (S.return = a.return), (I = S);
                break e;
              }
              I = a.return;
            }
        }
        if (
          ((X = l), gn(), Ct && typeof Ct.onPostCommitFiberRoot == "function")
        )
          try {
            Ct.onPostCommitFiberRoot(Ki, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (Z = n), (at.transition = t);
    }
  }
  return !1;
}
function mc(e, t, n) {
  (t = mr(n, t)),
    (t = Ef(e, t, 1)),
    (e = sn(e, t, 1)),
    (t = Ae()),
    e !== null && (gl(e, 1, t), Ye(e, t));
}
function me(e, t, n) {
  if (e.tag === 3) mc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        mc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (cn === null || !cn.has(r)))
        ) {
          (e = mr(n, e)),
            (e = xf(t, e, 1)),
            (t = sn(t, e, 1)),
            (e = Ae()),
            t !== null && (gl(t, 1, e), Ye(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function bm(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Ae()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Re === e &&
      (Te & n) === n &&
      (ke === 4 || (ke === 3 && (Te & 130023424) === Te && 500 > ve() - _u)
        ? Ln(e, 0)
        : (Pu |= n)),
    Ye(e, t);
}
function Hf(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Ul), (Ul <<= 1), !(Ul & 130023424) && (Ul = 4194304))
      : (t = 1));
  var n = Ae();
  (e = Bt(e, t)), e !== null && (gl(e, t, n), Ye(e, n));
}
function ev(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Hf(e, n);
}
function tv(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(N(314));
  }
  r !== null && r.delete(t), Hf(e, n);
}
var Wf;
Wf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ke.current) Ve = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ve = !1), Hm(e, t, n);
      Ve = !!(e.flags & 131072);
    }
  else (Ve = !1), se && t.flags & 1048576 && Qd(t, _i, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      ai(e, t), (e = t.pendingProps);
      var l = dr(t, ze.current);
      ur(t, n), (l = Su(null, t, r, e, l, n));
      var i = Eu();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Qe(r) ? ((i = !0), Ri(t)) : (i = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            mu(t),
            (l.updater = qi),
            (t.stateNode = l),
            (l._reactInternals = t),
            Ra(t, r, e, n),
            (t = La(null, t, r, !0, i, n)))
          : ((t.tag = 0), se && i && uu(t), Ue(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (ai(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = rv(r)),
          (e = ft(r, e)),
          l)
        ) {
          case 0:
            t = _a(null, t, r, e, n);
            break e;
          case 1:
            t = ic(null, t, r, e, n);
            break e;
          case 11:
            t = rc(null, t, r, e, n);
            break e;
          case 14:
            t = lc(null, t, r, ft(r.type, e), n);
            break e;
        }
        throw Error(N(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ft(r, l)),
        _a(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ft(r, l)),
        ic(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Pf(t), e === null)) throw Error(N(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (l = i.element),
          qd(e, t),
          Ni(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (l = mr(Error(N(423)), t)), (t = oc(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = mr(Error(N(424)), t)), (t = oc(e, t, r, n, l));
            break e;
          } else
            for (
              Ze = un(t.stateNode.containerInfo.firstChild),
                qe = t,
                se = !0,
                mt = null,
                n = Gd(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((fr(), r === l)) {
            t = $t(e, t, n);
            break e;
          }
          Ue(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        bd(t),
        e === null && xa(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (o = l.children),
        ya(r, l) ? (o = null) : i !== null && ya(r, i) && (t.flags |= 32),
        Rf(e, t),
        Ue(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && xa(t), null;
    case 13:
      return _f(e, t, n);
    case 4:
      return (
        vu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = hr(t, null, r, n)) : Ue(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ft(r, l)),
        rc(e, t, r, l, n)
      );
    case 7:
      return Ue(e, t, t.pendingProps, n), t.child;
    case 8:
      return Ue(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Ue(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (o = l.value),
          ne(Li, r._currentValue),
          (r._currentValue = o),
          i !== null)
        )
          if (gt(i.value, o)) {
            if (i.children === l.children && !Ke.current) {
              t = $t(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var a = i.dependencies;
              if (a !== null) {
                o = i.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (i.tag === 1) {
                      (u = jt(-1, n & -n)), (u.tag = 2);
                      var s = i.updateQueue;
                      if (s !== null) {
                        s = s.shared;
                        var d = s.pending;
                        d === null
                          ? (u.next = u)
                          : ((u.next = d.next), (d.next = u)),
                          (s.pending = u);
                      }
                    }
                    (i.lanes |= n),
                      (u = i.alternate),
                      u !== null && (u.lanes |= n),
                      ka(i.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((o = i.return), o === null)) throw Error(N(341));
                (o.lanes |= n),
                  (a = o.alternate),
                  a !== null && (a.lanes |= n),
                  ka(o, n, t),
                  (o = i.sibling);
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((i = o.sibling), i !== null)) {
                    (i.return = o.return), (o = i);
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        Ue(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        ur(t, n),
        (l = ut(l)),
        (r = r(l)),
        (t.flags |= 1),
        Ue(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = ft(r, t.pendingProps)),
        (l = ft(r.type, l)),
        lc(e, t, r, l, n)
      );
    case 15:
      return kf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ft(r, l)),
        ai(e, t),
        (t.tag = 1),
        Qe(r) ? ((e = !0), Ri(t)) : (e = !1),
        ur(t, n),
        Sf(t, r, l),
        Ra(t, r, l, n),
        La(null, t, r, !0, e, n)
      );
    case 19:
      return Lf(e, t, n);
    case 22:
      return Cf(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function Vf(e, t) {
  return vd(e, t);
}
function nv(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function ot(e, t, n, r) {
  return new nv(e, t, n, r);
}
function Du(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function rv(e) {
  if (typeof e == "function") return Du(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Ga)) return 11;
    if (e === Za) return 14;
  }
  return 2;
}
function fn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ot(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function ci(e, t, n, r, l, i) {
  var o = 2;
  if (((r = e), typeof e == "function")) Du(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Qn:
        return Tn(n.children, l, i, t);
      case Ja:
        (o = 8), (l |= 8);
        break;
      case Jo:
        return (
          (e = ot(12, n, t, l | 2)), (e.elementType = Jo), (e.lanes = i), e
        );
      case Go:
        return (e = ot(13, n, t, l)), (e.elementType = Go), (e.lanes = i), e;
      case Zo:
        return (e = ot(19, n, t, l)), (e.elementType = Zo), (e.lanes = i), e;
      case bc:
        return to(n, l, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Zc:
              o = 10;
              break e;
            case qc:
              o = 9;
              break e;
            case Ga:
              o = 11;
              break e;
            case Za:
              o = 14;
              break e;
            case qt:
              (o = 16), (r = null);
              break e;
          }
        throw Error(N(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = ot(o, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function Tn(e, t, n, r) {
  return (e = ot(7, e, r, t)), (e.lanes = n), e;
}
function to(e, t, n, r) {
  return (
    (e = ot(22, e, r, t)),
    (e.elementType = bc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ao(e, t, n) {
  return (e = ot(6, e, null, t)), (e.lanes = n), e;
}
function Bo(e, t, n) {
  return (
    (t = ot(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function lv(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = So(0)),
    (this.expirationTimes = So(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = So(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Ou(e, t, n, r, l, i, o, a, u) {
  return (
    (e = new lv(e, t, n, a, u)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = ot(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    mu(i),
    e
  );
}
function iv(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Kn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Kf(e) {
  if (!e) return pn;
  e = e._reactInternals;
  e: {
    if (Un(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Qe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Qe(n)) return Vd(e, n, t);
  }
  return t;
}
function Qf(e, t, n, r, l, i, o, a, u) {
  return (
    (e = Ou(n, r, !0, e, l, i, o, a, u)),
    (e.context = Kf(null)),
    (n = e.current),
    (r = Ae()),
    (l = dn(n)),
    (i = jt(r, l)),
    (i.callback = t ?? null),
    sn(n, i, l),
    (e.current.lanes = l),
    gl(e, l, r),
    Ye(e, r),
    e
  );
}
function no(e, t, n, r) {
  var l = t.current,
    i = Ae(),
    o = dn(l);
  return (
    (n = Kf(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = jt(i, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = sn(l, t, o)),
    e !== null && (yt(e, l, o, i), li(e, l, o)),
    o
  );
}
function Ui(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function vc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Mu(e, t) {
  vc(e, t), (e = e.alternate) && vc(e, t);
}
function ov() {
  return null;
}
var Yf =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function zu(e) {
  this._internalRoot = e;
}
ro.prototype.render = zu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  no(e, t, null, null);
};
ro.prototype.unmount = zu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    zn(function () {
      no(null, e, null, null);
    }),
      (t[At] = null);
  }
};
function ro(e) {
  this._internalRoot = e;
}
ro.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = kd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < en.length && t !== 0 && t < en[n].priority; n++);
    en.splice(n, 0, e), n === 0 && Rd(e);
  }
};
function Fu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function lo(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function yc() {}
function av(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var s = Ui(o);
        i.call(s);
      };
    }
    var o = Qf(t, r, e, 0, null, !1, !1, "", yc);
    return (
      (e._reactRootContainer = o),
      (e[At] = o.current),
      al(e.nodeType === 8 ? e.parentNode : e),
      zn(),
      o
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var s = Ui(u);
      a.call(s);
    };
  }
  var u = Ou(e, 0, !1, null, null, !1, !1, "", yc);
  return (
    (e._reactRootContainer = u),
    (e[At] = u.current),
    al(e.nodeType === 8 ? e.parentNode : e),
    zn(function () {
      no(t, u, n, r);
    }),
    u
  );
}
function io(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function () {
        var u = Ui(o);
        a.call(u);
      };
    }
    no(t, o, e, l);
  } else o = av(n, t, e, l, r);
  return Ui(o);
}
Ed = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $r(t.pendingLanes);
        n !== 0 &&
          (eu(t, n | 1), Ye(t, ve()), !(X & 6) && ((vr = ve() + 500), gn()));
      }
      break;
    case 13:
      zn(function () {
        var r = Bt(e, 1);
        if (r !== null) {
          var l = Ae();
          yt(r, e, 1, l);
        }
      }),
        Mu(e, 1);
  }
};
tu = function (e) {
  if (e.tag === 13) {
    var t = Bt(e, 134217728);
    if (t !== null) {
      var n = Ae();
      yt(t, e, 134217728, n);
    }
    Mu(e, 134217728);
  }
};
xd = function (e) {
  if (e.tag === 13) {
    var t = dn(e),
      n = Bt(e, t);
    if (n !== null) {
      var r = Ae();
      yt(n, e, t, r);
    }
    Mu(e, t);
  }
};
kd = function () {
  return Z;
};
Cd = function (e, t) {
  var n = Z;
  try {
    return (Z = e), t();
  } finally {
    Z = n;
  }
};
aa = function (e, t, n) {
  switch (t) {
    case "input":
      if ((ea(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ji(r);
            if (!l) throw Error(N(90));
            td(r), ea(r, l);
          }
        }
      }
      break;
    case "textarea":
      rd(e, n);
      break;
    case "select":
      (t = n.value), t != null && lr(e, !!n.multiple, t, !1);
  }
};
cd = Lu;
dd = zn;
var uv = { usingClientEntryPoint: !1, Events: [Sl, Gn, Ji, ud, sd, Lu] },
  zr = {
    findFiberByHostInstance: kn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  sv = {
    bundleType: zr.bundleType,
    version: zr.version,
    rendererPackageName: zr.rendererPackageName,
    rendererConfig: zr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Wt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = pd(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: zr.findFiberByHostInstance || ov,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Jl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Jl.isDisabled && Jl.supportsFiber)
    try {
      (Ki = Jl.inject(sv)), (Ct = Jl);
    } catch {}
}
et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = uv;
et.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Fu(t)) throw Error(N(200));
  return iv(e, t, null, n);
};
et.createRoot = function (e, t) {
  if (!Fu(e)) throw Error(N(299));
  var n = !1,
    r = "",
    l = Yf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Ou(e, 1, !1, null, null, n, !1, r, l)),
    (e[At] = t.current),
    al(e.nodeType === 8 ? e.parentNode : e),
    new zu(t)
  );
};
et.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(N(188))
      : ((e = Object.keys(e).join(",")), Error(N(268, e)));
  return (e = pd(t)), (e = e === null ? null : e.stateNode), e;
};
et.flushSync = function (e) {
  return zn(e);
};
et.hydrate = function (e, t, n) {
  if (!lo(t)) throw Error(N(200));
  return io(null, e, t, !0, n);
};
et.hydrateRoot = function (e, t, n) {
  if (!Fu(e)) throw Error(N(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = "",
    o = Yf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Qf(t, null, e, 1, n ?? null, l, !1, i, o)),
    (e[At] = t.current),
    al(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new ro(t);
};
et.render = function (e, t, n) {
  if (!lo(t)) throw Error(N(200));
  return io(null, e, t, !1, n);
};
et.unmountComponentAtNode = function (e) {
  if (!lo(e)) throw Error(N(40));
  return e._reactRootContainer
    ? (zn(function () {
        io(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[At] = null);
        });
      }),
      !0)
    : !1;
};
et.unstable_batchedUpdates = Lu;
et.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!lo(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return io(e, t, n, !1, r);
};
et.version = "18.3.1-next-f1338f8080-20240426";
function Xf() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Xf);
    } catch (e) {
      console.error(e);
    }
}
Xf(), (Yc.exports = et);
var Jf = Yc.exports;
const cv = lp(Jf),
  dv = ip({ __proto__: null, default: cv }, [Jf]);
/**
 * @remix-run/router v1.19.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ue() {
  return (
    (ue = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ue.apply(this, arguments)
  );
}
var ge;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(ge || (ge = {}));
const gc = "popstate";
function x0(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: i, search: o, hash: a } = r.location;
    return vl(
      "",
      { pathname: i, search: o, hash: a },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default",
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : mn(l);
  }
  return hv(t, n, null, e);
}
function $(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function yr(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function fv() {
  return Math.random().toString(36).substr(2, 8);
}
function wc(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function vl(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    ue(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Vt(t) : t,
      { state: n, key: (t && t.key) || r || fv() },
    )
  );
}
function mn(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Vt(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function hv(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: i = !1 } = r,
    o = l.history,
    a = ge.Pop,
    u = null,
    s = d();
  s == null && ((s = 0), o.replaceState(ue({}, o.state, { idx: s }), ""));
  function d() {
    return (o.state || { idx: null }).idx;
  }
  function c() {
    a = ge.Pop;
    let _ = d(),
      m = _ == null ? null : _ - s;
    (s = _), u && u({ action: a, location: k.location, delta: m });
  }
  function f(_, m) {
    a = ge.Push;
    let h = vl(k.location, _, m);
    s = d() + 1;
    let p = wc(h, s),
      S = k.createHref(h);
    try {
      o.pushState(p, "", S);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError") throw P;
      l.location.assign(S);
    }
    i && u && u({ action: a, location: k.location, delta: 1 });
  }
  function x(_, m) {
    a = ge.Replace;
    let h = vl(k.location, _, m);
    s = d();
    let p = wc(h, s),
      S = k.createHref(h);
    o.replaceState(p, "", S),
      i && u && u({ action: a, location: k.location, delta: 0 });
  }
  function g(_) {
    let m = l.location.origin !== "null" ? l.location.origin : l.location.href,
      h = typeof _ == "string" ? _ : mn(_);
    return (
      (h = h.replace(/ $/, "%20")),
      $(
        m,
        "No window.location.(origin|href) available to create URL for href: " +
          h,
      ),
      new URL(h, m)
    );
  }
  let k = {
    get action() {
      return a;
    },
    get location() {
      return e(l, o);
    },
    listen(_) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(gc, c),
        (u = _),
        () => {
          l.removeEventListener(gc, c), (u = null);
        }
      );
    },
    createHref(_) {
      return t(l, _);
    },
    createURL: g,
    encodeLocation(_) {
      let m = g(_);
      return { pathname: m.pathname, search: m.search, hash: m.hash };
    },
    push: f,
    replace: x,
    go(_) {
      return o.go(_);
    },
  };
  return k;
}
var b;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(b || (b = {}));
const pv = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children",
]);
function mv(e) {
  return e.index === !0;
}
function yl(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((l, i) => {
      let o = [...n, String(i)],
        a = typeof l.id == "string" ? l.id : o.join("-");
      if (
        ($(
          l.index !== !0 || !l.children,
          "Cannot specify children on an index route",
        ),
        $(
          !r[a],
          'Found a route id collision on id "' +
            a +
            `".  Route id's must be globally unique within Data Router usages`,
        ),
        mv(l))
      ) {
        let u = ue({}, l, t(l), { id: a });
        return (r[a] = u), u;
      } else {
        let u = ue({}, l, t(l), { id: a, children: void 0 });
        return (
          (r[a] = u), l.children && (u.children = yl(l.children, t, o, r)), u
        );
      }
    })
  );
}
function zt(e, t, n) {
  return n === void 0 && (n = "/"), di(e, t, n, !1);
}
function di(e, t, n, r) {
  let l = typeof t == "string" ? Vt(t) : t,
    i = ct(l.pathname || "/", n);
  if (i == null) return null;
  let o = Zf(e);
  vv(o);
  let a = null;
  for (let u = 0; a == null && u < o.length; ++u) {
    let s = _v(i);
    a = Rv(o[u], s, r);
  }
  return a;
}
function Gf(e, t) {
  let { route: n, pathname: r, params: l } = e;
  return { id: n.id, pathname: r, params: l, data: t[n.id], handle: n.handle };
}
function Zf(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (i, o, a) => {
    let u = {
      relativePath: a === void 0 ? i.path || "" : a,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i,
    };
    u.relativePath.startsWith("/") &&
      ($(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let s = Pt([r, u.relativePath]),
      d = n.concat(u);
    i.children &&
      i.children.length > 0 &&
      ($(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + s + '".'),
      ),
      Zf(i.children, t, d, s)),
      !(i.path == null && !i.index) &&
        t.push({ path: s, score: kv(s, i.index), routesMeta: d });
  };
  return (
    e.forEach((i, o) => {
      var a;
      if (i.path === "" || !((a = i.path) != null && a.includes("?"))) l(i, o);
      else for (let u of qf(i.path)) l(i, o, u);
    }),
    t
  );
}
function qf(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [i, ""] : [i];
  let o = qf(r.join("/")),
    a = [];
  return (
    a.push(...o.map((u) => (u === "" ? i : [i, u].join("/")))),
    l && a.push(...o),
    a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function vv(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Cv(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const yv = /^:[\w-]+$/,
  gv = 3,
  wv = 2,
  Sv = 1,
  Ev = 10,
  xv = -2,
  Sc = (e) => e === "*";
function kv(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Sc) && (r += xv),
    t && (r += wv),
    n
      .filter((l) => !Sc(l))
      .reduce((l, i) => l + (yv.test(i) ? gv : i === "" ? Sv : Ev), r)
  );
}
function Cv(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Rv(e, t, n) {
  n === void 0 && (n = !1);
  let { routesMeta: r } = e,
    l = {},
    i = "/",
    o = [];
  for (let a = 0; a < r.length; ++a) {
    let u = r[a],
      s = a === r.length - 1,
      d = i === "/" ? t : t.slice(i.length) || "/",
      c = Ai(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: s },
        d,
      ),
      f = u.route;
    if (
      (!c &&
        s &&
        n &&
        !r[r.length - 1].route.index &&
        (c = Ai(
          { path: u.relativePath, caseSensitive: u.caseSensitive, end: !1 },
          d,
        )),
      !c)
    )
      return null;
    Object.assign(l, c.params),
      o.push({
        params: l,
        pathname: Pt([i, c.pathname]),
        pathnameBase: Nv(Pt([i, c.pathnameBase])),
        route: f,
      }),
      c.pathnameBase !== "/" && (i = Pt([i, c.pathnameBase]));
  }
  return o;
}
function Ai(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Pv(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let i = l[0],
    o = i.replace(/(.)\/+$/, "$1"),
    a = l.slice(1);
  return {
    params: r.reduce((s, d, c) => {
      let { paramName: f, isOptional: x } = d;
      if (f === "*") {
        let k = a[c] || "";
        o = i.slice(0, i.length - k.length).replace(/(.)\/+$/, "$1");
      }
      const g = a[c];
      return (
        x && !g ? (s[f] = void 0) : (s[f] = (g || "").replace(/%2F/g, "/")), s
      );
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e,
  };
}
function Pv(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    yr(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, a, u) => (
            r.push({ paramName: a, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function _v(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      yr(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function ct(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Lv(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? Vt(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Tv(n, t)) : t,
    search: Dv(r),
    hash: Ov(l),
  };
}
function Tv(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function $o(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function bf(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function Iu(e, t) {
  let n = bf(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function ju(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = Vt(e))
    : ((l = ue({}, e)),
      $(
        !l.pathname || !l.pathname.includes("?"),
        $o("?", "pathname", "search", l),
      ),
      $(
        !l.pathname || !l.pathname.includes("#"),
        $o("#", "pathname", "hash", l),
      ),
      $(!l.search || !l.search.includes("#"), $o("#", "search", "hash", l)));
  let i = e === "" || l.pathname === "",
    o = i ? "/" : l.pathname,
    a;
  if (o == null) a = n;
  else {
    let c = t.length - 1;
    if (!r && o.startsWith("..")) {
      let f = o.split("/");
      for (; f[0] === ".."; ) f.shift(), (c -= 1);
      l.pathname = f.join("/");
    }
    a = c >= 0 ? t[c] : "/";
  }
  let u = Lv(l, a),
    s = o && o !== "/" && o.endsWith("/"),
    d = (i || o === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (s || d) && (u.pathname += "/"), u;
}
const Pt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Nv = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Dv = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Ov = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class Mv {
  constructor(t, n) {
    (this.type = "DataWithResponseInit"),
      (this.data = t),
      (this.init = n || null);
  }
}
function zv(e, t) {
  return new Mv(e, typeof t == "number" ? { status: t } : t);
}
class Bi extends Error {}
class Fv {
  constructor(t, n) {
    (this.pendingKeysSet = new Set()),
      (this.subscribers = new Set()),
      (this.deferredKeys = []),
      $(
        t && typeof t == "object" && !Array.isArray(t),
        "defer() only accepts plain objects",
      );
    let r;
    (this.abortPromise = new Promise((i, o) => (r = o))),
      (this.controller = new AbortController());
    let l = () => r(new Bi("Deferred data aborted"));
    (this.unlistenAbortSignal = () =>
      this.controller.signal.removeEventListener("abort", l)),
      this.controller.signal.addEventListener("abort", l),
      (this.data = Object.entries(t).reduce((i, o) => {
        let [a, u] = o;
        return Object.assign(i, { [a]: this.trackPromise(a, u) });
      }, {})),
      this.done && this.unlistenAbortSignal(),
      (this.init = n);
  }
  trackPromise(t, n) {
    if (!(n instanceof Promise)) return n;
    this.deferredKeys.push(t), this.pendingKeysSet.add(t);
    let r = Promise.race([n, this.abortPromise]).then(
      (l) => this.onSettle(r, t, void 0, l),
      (l) => this.onSettle(r, t, l),
    );
    return (
      r.catch(() => {}),
      Object.defineProperty(r, "_tracked", { get: () => !0 }),
      r
    );
  }
  onSettle(t, n, r, l) {
    if (this.controller.signal.aborted && r instanceof Bi)
      return (
        this.unlistenAbortSignal(),
        Object.defineProperty(t, "_error", { get: () => r }),
        Promise.reject(r)
      );
    if (
      (this.pendingKeysSet.delete(n),
      this.done && this.unlistenAbortSignal(),
      r === void 0 && l === void 0)
    ) {
      let i = new Error(
        'Deferred data for key "' +
          n +
          '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.',
      );
      return (
        Object.defineProperty(t, "_error", { get: () => i }),
        this.emit(!1, n),
        Promise.reject(i)
      );
    }
    return l === void 0
      ? (Object.defineProperty(t, "_error", { get: () => r }),
        this.emit(!1, n),
        Promise.reject(r))
      : (Object.defineProperty(t, "_data", { get: () => l }),
        this.emit(!1, n),
        l);
  }
  emit(t, n) {
    this.subscribers.forEach((r) => r(t, n));
  }
  subscribe(t) {
    return this.subscribers.add(t), () => this.subscribers.delete(t);
  }
  cancel() {
    this.controller.abort(),
      this.pendingKeysSet.forEach((t, n) => this.pendingKeysSet.delete(n)),
      this.emit(!0);
  }
  async resolveData(t) {
    let n = !1;
    if (!this.done) {
      let r = () => this.cancel();
      t.addEventListener("abort", r),
        (n = await new Promise((l) => {
          this.subscribe((i) => {
            t.removeEventListener("abort", r), (i || this.done) && l(i);
          });
        }));
    }
    return n;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    return (
      $(
        this.data !== null && this.done,
        "Can only unwrap data on initialized and settled deferreds",
      ),
      Object.entries(this.data).reduce((t, n) => {
        let [r, l] = n;
        return Object.assign(t, { [r]: jv(l) });
      }, {})
    );
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function Iv(e) {
  return e instanceof Promise && e._tracked === !0;
}
function jv(e) {
  if (!Iv(e)) return e;
  if (e._error) throw e._error;
  return e._data;
}
const eh = function (t, n) {
  n === void 0 && (n = 302);
  let r = n;
  typeof r == "number"
    ? (r = { status: r })
    : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", t), new Response(null, ue({}, r, { headers: l }));
};
class Fn {
  constructor(t, n, r, l) {
    l === void 0 && (l = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = l),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r);
  }
}
function Er(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const th = ["post", "put", "patch", "delete"],
  Uv = new Set(th),
  Av = ["get", ...th],
  Bv = new Set(Av),
  $v = new Set([301, 302, 303, 307, 308]),
  Hv = new Set([307, 308]),
  Ho = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  nh = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Fr = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  Uu = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Wv = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  rh = "remix-router-transitions";
function k0(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0,
    n =
      typeof t < "u" &&
      typeof t.document < "u" &&
      typeof t.document.createElement < "u",
    r = !n;
  $(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter",
  );
  let l;
  if (e.mapRouteProperties) l = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let w = e.detectErrorBoundary;
    l = (E) => ({ hasErrorBoundary: w(E) });
  } else l = Wv;
  let i = {},
    o = yl(e.routes, l, void 0, i),
    a,
    u = e.basename || "/",
    s = e.unstable_dataStrategy || Xv,
    d = e.unstable_patchRoutesOnNavigation,
    c = ue(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_partialHydration: !1,
        v7_prependBasename: !1,
        v7_relativeSplatPath: !1,
        v7_skipActionErrorRevalidation: !1,
      },
      e.future,
    ),
    f = null,
    x = new Set(),
    g = 1e3,
    k = new Set(),
    _ = null,
    m = null,
    h = null,
    p = e.hydrationData != null,
    S = zt(o, e.history.location, u),
    P = null;
  if (S == null && !d) {
    let w = je(404, { pathname: e.history.location.pathname }),
      { matches: E, route: C } = Nc(o);
    (S = E), (P = { [C.id]: w });
  }
  S &&
    !e.hydrationData &&
    Ll(S, o, e.history.location.pathname).active &&
    (S = null);
  let R;
  if (S)
    if (S.some((w) => w.route.lazy)) R = !1;
    else if (!S.some((w) => w.route.loader)) R = !0;
    else if (c.v7_partialHydration) {
      let w = e.hydrationData ? e.hydrationData.loaderData : null,
        E = e.hydrationData ? e.hydrationData.errors : null,
        C = (L) =>
          L.route.loader
            ? typeof L.route.loader == "function" &&
              L.route.loader.hydrate === !0
              ? !1
              : (w && w[L.route.id] !== void 0) ||
                (E && E[L.route.id] !== void 0)
            : !0;
      if (E) {
        let L = S.findIndex((F) => E[F.route.id] !== void 0);
        R = S.slice(0, L + 1).every(C);
      } else R = S.every(C);
    } else R = e.hydrationData != null;
  else if (((R = !1), (S = []), c.v7_partialHydration)) {
    let w = Ll(null, o, e.history.location.pathname);
    w.active && w.matches && (S = w.matches);
  }
  let T,
    y = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: S,
      initialized: R,
      navigation: Ho,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || P,
      fetchers: new Map(),
      blockers: new Map(),
    },
    M = ge.Pop,
    O = !1,
    A,
    Y = !1,
    he = new Map(),
    oe = null,
    Ee = !1,
    Fe = !1,
    Qt = [],
    z = new Set(),
    j = new Map(),
    W = 0,
    ee = -1,
    re = new Map(),
    $e = new Set(),
    He = new Map(),
    Tt = new Map(),
    Pe = new Set(),
    nt = new Map(),
    wn = new Map(),
    Uh = new Map(),
    fo = !1;
  function Ah() {
    if (
      ((f = e.history.listen((w) => {
        let { action: E, location: C, delta: L } = w;
        if (fo) {
          fo = !1;
          return;
        }
        yr(
          wn.size === 0 || L != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let F = us({
          currentLocation: y.location,
          nextLocation: C,
          historyAction: E,
        });
        if (F && L != null) {
          (fo = !0),
            e.history.go(L * -1),
            Pl(F, {
              state: "blocked",
              location: C,
              proceed() {
                Pl(F, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: C,
                }),
                  e.history.go(L);
              },
              reset() {
                let U = new Map(y.blockers);
                U.set(F, Fr), Ie({ blockers: U });
              },
            });
          return;
        }
        return Sn(E, C);
      })),
      n)
    ) {
      ay(t, he);
      let w = () => uy(t, he);
      t.addEventListener("pagehide", w),
        (oe = () => t.removeEventListener("pagehide", w));
    }
    return y.initialized || Sn(ge.Pop, y.location, { initialHydration: !0 }), T;
  }
  function Bh() {
    f && f(),
      oe && oe(),
      x.clear(),
      A && A.abort(),
      y.fetchers.forEach((w, E) => Rl(E)),
      y.blockers.forEach((w, E) => as(E));
  }
  function $h(w) {
    return x.add(w), () => x.delete(w);
  }
  function Ie(w, E) {
    E === void 0 && (E = {}), (y = ue({}, y, w));
    let C = [],
      L = [];
    c.v7_fetcherPersist &&
      y.fetchers.forEach((F, U) => {
        F.state === "idle" && (Pe.has(U) ? L.push(U) : C.push(U));
      }),
      [...x].forEach((F) =>
        F(y, {
          deletedFetchers: L,
          unstable_viewTransitionOpts: E.viewTransitionOpts,
          unstable_flushSync: E.flushSync === !0,
        }),
      ),
      c.v7_fetcherPersist &&
        (C.forEach((F) => y.fetchers.delete(F)), L.forEach((F) => Rl(F)));
  }
  function An(w, E, C) {
    var L, F;
    let { flushSync: U } = C === void 0 ? {} : C,
      H =
        y.actionData != null &&
        y.navigation.formMethod != null &&
        pt(y.navigation.formMethod) &&
        y.navigation.state === "loading" &&
        ((L = w.state) == null ? void 0 : L._isRedirect) !== !0,
      D;
    E.actionData
      ? Object.keys(E.actionData).length > 0
        ? (D = E.actionData)
        : (D = null)
      : H
        ? (D = y.actionData)
        : (D = null);
    let V = E.loaderData
        ? Lc(y.loaderData, E.loaderData, E.matches || [], E.errors)
        : y.loaderData,
      B = y.blockers;
    B.size > 0 && ((B = new Map(B)), B.forEach((G, te) => B.set(te, Fr)));
    let K =
      O === !0 ||
      (y.navigation.formMethod != null &&
        pt(y.navigation.formMethod) &&
        ((F = w.state) == null ? void 0 : F._isRedirect) !== !0);
    a && ((o = a), (a = void 0)),
      Ee ||
        M === ge.Pop ||
        (M === ge.Push
          ? e.history.push(w, w.state)
          : M === ge.Replace && e.history.replace(w, w.state));
    let q;
    if (M === ge.Pop) {
      let G = he.get(y.location.pathname);
      G && G.has(w.pathname)
        ? (q = { currentLocation: y.location, nextLocation: w })
        : he.has(w.pathname) &&
          (q = { currentLocation: w, nextLocation: y.location });
    } else if (Y) {
      let G = he.get(y.location.pathname);
      G
        ? G.add(w.pathname)
        : ((G = new Set([w.pathname])), he.set(y.location.pathname, G)),
        (q = { currentLocation: y.location, nextLocation: w });
    }
    Ie(
      ue({}, E, {
        actionData: D,
        loaderData: V,
        historyAction: M,
        location: w,
        initialized: !0,
        navigation: Ho,
        revalidation: "idle",
        restoreScrollPosition: cs(w, E.matches || y.matches),
        preventScrollReset: K,
        blockers: B,
      }),
      { viewTransitionOpts: q, flushSync: U === !0 },
    ),
      (M = ge.Pop),
      (O = !1),
      (Y = !1),
      (Ee = !1),
      (Fe = !1),
      (Qt = []);
  }
  async function es(w, E) {
    if (typeof w == "number") {
      e.history.go(w);
      return;
    }
    let C = Ba(
        y.location,
        y.matches,
        u,
        c.v7_prependBasename,
        w,
        c.v7_relativeSplatPath,
        E == null ? void 0 : E.fromRouteId,
        E == null ? void 0 : E.relative,
      ),
      {
        path: L,
        submission: F,
        error: U,
      } = Ec(c.v7_normalizeFormMethod, !1, C, E),
      H = y.location,
      D = vl(y.location, L, E && E.state);
    D = ue({}, D, e.history.encodeLocation(D));
    let V = E && E.replace != null ? E.replace : void 0,
      B = ge.Push;
    V === !0
      ? (B = ge.Replace)
      : V === !1 ||
        (F != null &&
          pt(F.formMethod) &&
          F.formAction === y.location.pathname + y.location.search &&
          (B = ge.Replace));
    let K =
        E && "preventScrollReset" in E ? E.preventScrollReset === !0 : void 0,
      q = (E && E.unstable_flushSync) === !0,
      G = us({ currentLocation: H, nextLocation: D, historyAction: B });
    if (G) {
      Pl(G, {
        state: "blocked",
        location: D,
        proceed() {
          Pl(G, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: D,
          }),
            es(w, E);
        },
        reset() {
          let te = new Map(y.blockers);
          te.set(G, Fr), Ie({ blockers: te });
        },
      });
      return;
    }
    return await Sn(B, D, {
      submission: F,
      pendingError: U,
      preventScrollReset: K,
      replace: E && E.replace,
      enableViewTransition: E && E.unstable_viewTransition,
      flushSync: q,
    });
  }
  function Hh() {
    if (
      (ho(),
      Ie({ revalidation: "loading" }),
      y.navigation.state !== "submitting")
    ) {
      if (y.navigation.state === "idle") {
        Sn(y.historyAction, y.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      Sn(M || y.historyAction, y.navigation.location, {
        overrideNavigation: y.navigation,
      });
    }
  }
  async function Sn(w, E, C) {
    A && A.abort(),
      (A = null),
      (M = w),
      (Ee = (C && C.startUninterruptedRevalidation) === !0),
      qh(y.location, y.matches),
      (O = (C && C.preventScrollReset) === !0),
      (Y = (C && C.enableViewTransition) === !0);
    let L = a || o,
      F = C && C.overrideNavigation,
      U = zt(L, E, u),
      H = (C && C.flushSync) === !0,
      D = Ll(U, L, E.pathname);
    if ((D.active && D.matches && (U = D.matches), !U)) {
      let { error: J, notFoundMatches: _e, route: ye } = po(E.pathname);
      An(
        E,
        { matches: _e, loaderData: {}, errors: { [ye.id]: J } },
        { flushSync: H },
      );
      return;
    }
    if (
      y.initialized &&
      !Fe &&
      ey(y.location, E) &&
      !(C && C.submission && pt(C.submission.formMethod))
    ) {
      An(E, { matches: U }, { flushSync: H });
      return;
    }
    A = new AbortController();
    let V = Vn(e.history, E, A.signal, C && C.submission),
      B;
    if (C && C.pendingError)
      B = [rr(U).route.id, { type: b.error, error: C.pendingError }];
    else if (C && C.submission && pt(C.submission.formMethod)) {
      let J = await Wh(V, E, C.submission, U, D.active, {
        replace: C.replace,
        flushSync: H,
      });
      if (J.shortCircuited) return;
      if (J.pendingActionResult) {
        let [_e, ye] = J.pendingActionResult;
        if (Ge(ye) && Er(ye.error) && ye.error.status === 404) {
          (A = null),
            An(E, {
              matches: J.matches,
              loaderData: {},
              errors: { [_e]: ye.error },
            });
          return;
        }
      }
      (U = J.matches || U),
        (B = J.pendingActionResult),
        (F = Wo(E, C.submission)),
        (H = !1),
        (D.active = !1),
        (V = Vn(e.history, V.url, V.signal));
    }
    let {
      shortCircuited: K,
      matches: q,
      loaderData: G,
      errors: te,
    } = await Vh(
      V,
      E,
      U,
      D.active,
      F,
      C && C.submission,
      C && C.fetcherSubmission,
      C && C.replace,
      C && C.initialHydration === !0,
      H,
      B,
    );
    K ||
      ((A = null),
      An(E, ue({ matches: q || U }, Tc(B), { loaderData: G, errors: te })));
  }
  async function Wh(w, E, C, L, F, U) {
    U === void 0 && (U = {}), ho();
    let H = iy(E, C);
    if ((Ie({ navigation: H }, { flushSync: U.flushSync === !0 }), F)) {
      let B = await Tl(L, E.pathname, w.signal);
      if (B.type === "aborted") return { shortCircuited: !0 };
      if (B.type === "error") {
        let { boundaryId: K, error: q } = _l(E.pathname, B);
        return {
          matches: B.partialMatches,
          pendingActionResult: [K, { type: b.error, error: q }],
        };
      } else if (B.matches) L = B.matches;
      else {
        let { notFoundMatches: K, error: q, route: G } = po(E.pathname);
        return {
          matches: K,
          pendingActionResult: [G.id, { type: b.error, error: q }],
        };
      }
    }
    let D,
      V = Wr(L, E);
    if (!V.route.action && !V.route.lazy)
      D = {
        type: b.error,
        error: je(405, {
          method: w.method,
          pathname: E.pathname,
          routeId: V.route.id,
        }),
      };
    else if (((D = (await Rr("action", w, [V], L))[0]), w.signal.aborted))
      return { shortCircuited: !0 };
    if (_n(D)) {
      let B;
      return (
        U && U.replace != null
          ? (B = U.replace)
          : (B =
              Rc(D.response.headers.get("Location"), new URL(w.url), u) ===
              y.location.pathname + y.location.search),
        await Cr(w, D, { submission: C, replace: B }),
        { shortCircuited: !0 }
      );
    }
    if (Pn(D)) throw je(400, { type: "defer-action" });
    if (Ge(D)) {
      let B = rr(L, V.route.id);
      return (
        (U && U.replace) !== !0 && (M = ge.Push),
        { matches: L, pendingActionResult: [B.route.id, D] }
      );
    }
    return { matches: L, pendingActionResult: [V.route.id, D] };
  }
  async function Vh(w, E, C, L, F, U, H, D, V, B, K) {
    let q = F || Wo(E, U),
      G = U || H || zc(q),
      te = !Ee && (!c.v7_partialHydration || !V);
    if (L) {
      if (te) {
        let pe = ts(K);
        Ie(ue({ navigation: q }, pe !== void 0 ? { actionData: pe } : {}), {
          flushSync: B,
        });
      }
      let Q = await Tl(C, E.pathname, w.signal);
      if (Q.type === "aborted") return { shortCircuited: !0 };
      if (Q.type === "error") {
        let { boundaryId: pe, error: Xe } = _l(E.pathname, Q);
        return {
          matches: Q.partialMatches,
          loaderData: {},
          errors: { [pe]: Xe },
        };
      } else if (Q.matches) C = Q.matches;
      else {
        let { error: pe, notFoundMatches: Xe, route: ae } = po(E.pathname);
        return { matches: Xe, loaderData: {}, errors: { [ae.id]: pe } };
      }
    }
    let J = a || o,
      [_e, ye] = xc(
        e.history,
        y,
        C,
        G,
        E,
        c.v7_partialHydration && V === !0,
        c.v7_skipActionErrorRevalidation,
        Fe,
        Qt,
        z,
        Pe,
        He,
        $e,
        J,
        u,
        K,
      );
    if (
      (mo(
        (Q) =>
          !(C && C.some((pe) => pe.route.id === Q)) ||
          (_e && _e.some((pe) => pe.route.id === Q)),
      ),
      (ee = ++W),
      _e.length === 0 && ye.length === 0)
    ) {
      let Q = is();
      return (
        An(
          E,
          ue(
            {
              matches: C,
              loaderData: {},
              errors: K && Ge(K[1]) ? { [K[0]]: K[1].error } : null,
            },
            Tc(K),
            Q ? { fetchers: new Map(y.fetchers) } : {},
          ),
          { flushSync: B },
        ),
        { shortCircuited: !0 }
      );
    }
    if (te) {
      let Q = {};
      if (!L) {
        Q.navigation = q;
        let pe = ts(K);
        pe !== void 0 && (Q.actionData = pe);
      }
      ye.length > 0 && (Q.fetchers = Kh(ye)), Ie(Q, { flushSync: B });
    }
    ye.forEach((Q) => {
      j.has(Q.key) && Xt(Q.key), Q.controller && j.set(Q.key, Q.controller);
    });
    let Pr = () => ye.forEach((Q) => Xt(Q.key));
    A && A.signal.addEventListener("abort", Pr);
    let { loaderResults: Jt, fetcherResults: Bn } = await ns(
      y.matches,
      C,
      _e,
      ye,
      w,
    );
    if (w.signal.aborted) return { shortCircuited: !0 };
    A && A.signal.removeEventListener("abort", Pr),
      ye.forEach((Q) => j.delete(Q.key));
    let $n = Dc([...Jt, ...Bn]);
    if ($n) {
      if ($n.idx >= _e.length) {
        let Q = ye[$n.idx - _e.length].key;
        $e.add(Q);
      }
      return await Cr(w, $n.result, { replace: D }), { shortCircuited: !0 };
    }
    let { loaderData: Hn, errors: St } = _c(y, C, _e, Jt, K, ye, Bn, nt);
    nt.forEach((Q, pe) => {
      Q.subscribe((Xe) => {
        (Xe || Q.done) && nt.delete(pe);
      });
    }),
      c.v7_partialHydration &&
        V &&
        y.errors &&
        Object.entries(y.errors)
          .filter((Q) => {
            let [pe] = Q;
            return !_e.some((Xe) => Xe.route.id === pe);
          })
          .forEach((Q) => {
            let [pe, Xe] = Q;
            St = Object.assign(St || {}, { [pe]: Xe });
          });
    let Nl = is(),
      Dl = os(ee),
      Ol = Nl || Dl || ye.length > 0;
    return ue(
      { matches: C, loaderData: Hn, errors: St },
      Ol ? { fetchers: new Map(y.fetchers) } : {},
    );
  }
  function ts(w) {
    if (w && !Ge(w[1])) return { [w[0]]: w[1].data };
    if (y.actionData)
      return Object.keys(y.actionData).length === 0 ? null : y.actionData;
  }
  function Kh(w) {
    return (
      w.forEach((E) => {
        let C = y.fetchers.get(E.key),
          L = Ir(void 0, C ? C.data : void 0);
        y.fetchers.set(E.key, L);
      }),
      new Map(y.fetchers)
    );
  }
  function Qh(w, E, C, L) {
    if (r)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.",
      );
    j.has(w) && Xt(w);
    let F = (L && L.unstable_flushSync) === !0,
      U = a || o,
      H = Ba(
        y.location,
        y.matches,
        u,
        c.v7_prependBasename,
        C,
        c.v7_relativeSplatPath,
        E,
        L == null ? void 0 : L.relative,
      ),
      D = zt(U, H, u),
      V = Ll(D, U, H);
    if ((V.active && V.matches && (D = V.matches), !D)) {
      Nt(w, E, je(404, { pathname: H }), { flushSync: F });
      return;
    }
    let {
      path: B,
      submission: K,
      error: q,
    } = Ec(c.v7_normalizeFormMethod, !0, H, L);
    if (q) {
      Nt(w, E, q, { flushSync: F });
      return;
    }
    let G = Wr(D, B);
    if (((O = (L && L.preventScrollReset) === !0), K && pt(K.formMethod))) {
      Yh(w, E, B, G, D, V.active, F, K);
      return;
    }
    He.set(w, { routeId: E, path: B }), Xh(w, E, B, G, D, V.active, F, K);
  }
  async function Yh(w, E, C, L, F, U, H, D) {
    ho(), He.delete(w);
    function V(ae) {
      if (!ae.route.action && !ae.route.lazy) {
        let Dt = je(405, { method: D.formMethod, pathname: C, routeId: E });
        return Nt(w, E, Dt, { flushSync: H }), !0;
      }
      return !1;
    }
    if (!U && V(L)) return;
    let B = y.fetchers.get(w);
    Yt(w, oy(D, B), { flushSync: H });
    let K = new AbortController(),
      q = Vn(e.history, C, K.signal, D);
    if (U) {
      let ae = await Tl(F, C, q.signal);
      if (ae.type === "aborted") return;
      if (ae.type === "error") {
        let { error: Dt } = _l(C, ae);
        Nt(w, E, Dt, { flushSync: H });
        return;
      } else if (ae.matches) {
        if (((F = ae.matches), (L = Wr(F, C)), V(L))) return;
      } else {
        Nt(w, E, je(404, { pathname: C }), { flushSync: H });
        return;
      }
    }
    j.set(w, K);
    let G = W,
      J = (await Rr("action", q, [L], F))[0];
    if (q.signal.aborted) {
      j.get(w) === K && j.delete(w);
      return;
    }
    if (c.v7_fetcherPersist && Pe.has(w)) {
      if (_n(J) || Ge(J)) {
        Yt(w, Zt(void 0));
        return;
      }
    } else {
      if (_n(J))
        if ((j.delete(w), ee > G)) {
          Yt(w, Zt(void 0));
          return;
        } else
          return $e.add(w), Yt(w, Ir(D)), Cr(q, J, { fetcherSubmission: D });
      if (Ge(J)) {
        Nt(w, E, J.error);
        return;
      }
    }
    if (Pn(J)) throw je(400, { type: "defer-action" });
    let _e = y.navigation.location || y.location,
      ye = Vn(e.history, _e, K.signal),
      Pr = a || o,
      Jt =
        y.navigation.state !== "idle"
          ? zt(Pr, y.navigation.location, u)
          : y.matches;
    $(Jt, "Didn't find any matches after fetcher action");
    let Bn = ++W;
    re.set(w, Bn);
    let $n = Ir(D, J.data);
    y.fetchers.set(w, $n);
    let [Hn, St] = xc(
      e.history,
      y,
      Jt,
      D,
      _e,
      !1,
      c.v7_skipActionErrorRevalidation,
      Fe,
      Qt,
      z,
      Pe,
      He,
      $e,
      Pr,
      u,
      [L.route.id, J],
    );
    St.filter((ae) => ae.key !== w).forEach((ae) => {
      let Dt = ae.key,
        fs = y.fetchers.get(Dt),
        tp = Ir(void 0, fs ? fs.data : void 0);
      y.fetchers.set(Dt, tp),
        j.has(Dt) && Xt(Dt),
        ae.controller && j.set(Dt, ae.controller);
    }),
      Ie({ fetchers: new Map(y.fetchers) });
    let Nl = () => St.forEach((ae) => Xt(ae.key));
    K.signal.addEventListener("abort", Nl);
    let { loaderResults: Dl, fetcherResults: Ol } = await ns(
      y.matches,
      Jt,
      Hn,
      St,
      ye,
    );
    if (K.signal.aborted) return;
    K.signal.removeEventListener("abort", Nl),
      re.delete(w),
      j.delete(w),
      St.forEach((ae) => j.delete(ae.key));
    let Q = Dc([...Dl, ...Ol]);
    if (Q) {
      if (Q.idx >= Hn.length) {
        let ae = St[Q.idx - Hn.length].key;
        $e.add(ae);
      }
      return Cr(ye, Q.result);
    }
    let { loaderData: pe, errors: Xe } = _c(
      y,
      y.matches,
      Hn,
      Dl,
      void 0,
      St,
      Ol,
      nt,
    );
    if (y.fetchers.has(w)) {
      let ae = Zt(J.data);
      y.fetchers.set(w, ae);
    }
    os(Bn),
      y.navigation.state === "loading" && Bn > ee
        ? ($(M, "Expected pending action"),
          A && A.abort(),
          An(y.navigation.location, {
            matches: Jt,
            loaderData: pe,
            errors: Xe,
            fetchers: new Map(y.fetchers),
          }))
        : (Ie({
            errors: Xe,
            loaderData: Lc(y.loaderData, pe, Jt, Xe),
            fetchers: new Map(y.fetchers),
          }),
          (Fe = !1));
  }
  async function Xh(w, E, C, L, F, U, H, D) {
    let V = y.fetchers.get(w);
    Yt(w, Ir(D, V ? V.data : void 0), { flushSync: H });
    let B = new AbortController(),
      K = Vn(e.history, C, B.signal);
    if (U) {
      let J = await Tl(F, C, K.signal);
      if (J.type === "aborted") return;
      if (J.type === "error") {
        let { error: _e } = _l(C, J);
        Nt(w, E, _e, { flushSync: H });
        return;
      } else if (J.matches) (F = J.matches), (L = Wr(F, C));
      else {
        Nt(w, E, je(404, { pathname: C }), { flushSync: H });
        return;
      }
    }
    j.set(w, B);
    let q = W,
      te = (await Rr("loader", K, [L], F))[0];
    if (
      (Pn(te) && (te = (await uh(te, K.signal, !0)) || te),
      j.get(w) === B && j.delete(w),
      !K.signal.aborted)
    ) {
      if (Pe.has(w)) {
        Yt(w, Zt(void 0));
        return;
      }
      if (_n(te))
        if (ee > q) {
          Yt(w, Zt(void 0));
          return;
        } else {
          $e.add(w), await Cr(K, te);
          return;
        }
      if (Ge(te)) {
        Nt(w, E, te.error);
        return;
      }
      $(!Pn(te), "Unhandled fetcher deferred data"), Yt(w, Zt(te.data));
    }
  }
  async function Cr(w, E, C) {
    let {
      submission: L,
      fetcherSubmission: F,
      replace: U,
    } = C === void 0 ? {} : C;
    E.response.headers.has("X-Remix-Revalidate") && (Fe = !0);
    let H = E.response.headers.get("Location");
    $(H, "Expected a Location header on the redirect Response"),
      (H = Rc(H, new URL(w.url), u));
    let D = vl(y.location, H, { _isRedirect: !0 });
    if (n) {
      let te = !1;
      if (E.response.headers.has("X-Remix-Reload-Document")) te = !0;
      else if (Uu.test(H)) {
        const J = e.history.createURL(H);
        te = J.origin !== t.location.origin || ct(J.pathname, u) == null;
      }
      if (te) {
        U ? t.location.replace(H) : t.location.assign(H);
        return;
      }
    }
    A = null;
    let V =
        U === !0 || E.response.headers.has("X-Remix-Replace")
          ? ge.Replace
          : ge.Push,
      { formMethod: B, formAction: K, formEncType: q } = y.navigation;
    !L && !F && B && K && q && (L = zc(y.navigation));
    let G = L || F;
    if (Hv.has(E.response.status) && G && pt(G.formMethod))
      await Sn(V, D, {
        submission: ue({}, G, { formAction: H }),
        preventScrollReset: O,
      });
    else {
      let te = Wo(D, L);
      await Sn(V, D, {
        overrideNavigation: te,
        fetcherSubmission: F,
        preventScrollReset: O,
      });
    }
  }
  async function Rr(w, E, C, L) {
    try {
      let F = await Jv(s, w, E, C, L, i, l);
      return await Promise.all(
        F.map((U, H) => {
          if (ny(U)) {
            let D = U.result;
            return {
              type: b.redirect,
              response: qv(D, E, C[H].route.id, L, u, c.v7_relativeSplatPath),
            };
          }
          return Zv(U);
        }),
      );
    } catch (F) {
      return C.map(() => ({ type: b.error, error: F }));
    }
  }
  async function ns(w, E, C, L, F) {
    let [U, ...H] = await Promise.all([
      C.length ? Rr("loader", F, C, E) : [],
      ...L.map((D) => {
        if (D.matches && D.match && D.controller) {
          let V = Vn(e.history, D.path, D.controller.signal);
          return Rr("loader", V, [D.match], D.matches).then((B) => B[0]);
        } else
          return Promise.resolve({
            type: b.error,
            error: je(404, { pathname: D.path }),
          });
      }),
    ]);
    return (
      await Promise.all([
        Mc(
          w,
          C,
          U,
          U.map(() => F.signal),
          !1,
          y.loaderData,
        ),
        Mc(
          w,
          L.map((D) => D.match),
          H,
          L.map((D) => (D.controller ? D.controller.signal : null)),
          !0,
        ),
      ]),
      { loaderResults: U, fetcherResults: H }
    );
  }
  function ho() {
    (Fe = !0),
      Qt.push(...mo()),
      He.forEach((w, E) => {
        j.has(E) && (z.add(E), Xt(E));
      });
  }
  function Yt(w, E, C) {
    C === void 0 && (C = {}),
      y.fetchers.set(w, E),
      Ie(
        { fetchers: new Map(y.fetchers) },
        { flushSync: (C && C.flushSync) === !0 },
      );
  }
  function Nt(w, E, C, L) {
    L === void 0 && (L = {});
    let F = rr(y.matches, E);
    Rl(w),
      Ie(
        { errors: { [F.route.id]: C }, fetchers: new Map(y.fetchers) },
        { flushSync: (L && L.flushSync) === !0 },
      );
  }
  function rs(w) {
    return (
      c.v7_fetcherPersist &&
        (Tt.set(w, (Tt.get(w) || 0) + 1), Pe.has(w) && Pe.delete(w)),
      y.fetchers.get(w) || nh
    );
  }
  function Rl(w) {
    let E = y.fetchers.get(w);
    j.has(w) && !(E && E.state === "loading" && re.has(w)) && Xt(w),
      He.delete(w),
      re.delete(w),
      $e.delete(w),
      Pe.delete(w),
      z.delete(w),
      y.fetchers.delete(w);
  }
  function Jh(w) {
    if (c.v7_fetcherPersist) {
      let E = (Tt.get(w) || 0) - 1;
      E <= 0 ? (Tt.delete(w), Pe.add(w)) : Tt.set(w, E);
    } else Rl(w);
    Ie({ fetchers: new Map(y.fetchers) });
  }
  function Xt(w) {
    let E = j.get(w);
    $(E, "Expected fetch controller: " + w), E.abort(), j.delete(w);
  }
  function ls(w) {
    for (let E of w) {
      let C = rs(E),
        L = Zt(C.data);
      y.fetchers.set(E, L);
    }
  }
  function is() {
    let w = [],
      E = !1;
    for (let C of $e) {
      let L = y.fetchers.get(C);
      $(L, "Expected fetcher: " + C),
        L.state === "loading" && ($e.delete(C), w.push(C), (E = !0));
    }
    return ls(w), E;
  }
  function os(w) {
    let E = [];
    for (let [C, L] of re)
      if (L < w) {
        let F = y.fetchers.get(C);
        $(F, "Expected fetcher: " + C),
          F.state === "loading" && (Xt(C), re.delete(C), E.push(C));
      }
    return ls(E), E.length > 0;
  }
  function Gh(w, E) {
    let C = y.blockers.get(w) || Fr;
    return wn.get(w) !== E && wn.set(w, E), C;
  }
  function as(w) {
    y.blockers.delete(w), wn.delete(w);
  }
  function Pl(w, E) {
    let C = y.blockers.get(w) || Fr;
    $(
      (C.state === "unblocked" && E.state === "blocked") ||
        (C.state === "blocked" && E.state === "blocked") ||
        (C.state === "blocked" && E.state === "proceeding") ||
        (C.state === "blocked" && E.state === "unblocked") ||
        (C.state === "proceeding" && E.state === "unblocked"),
      "Invalid blocker state transition: " + C.state + " -> " + E.state,
    );
    let L = new Map(y.blockers);
    L.set(w, E), Ie({ blockers: L });
  }
  function us(w) {
    let { currentLocation: E, nextLocation: C, historyAction: L } = w;
    if (wn.size === 0) return;
    wn.size > 1 && yr(!1, "A router only supports one blocker at a time");
    let F = Array.from(wn.entries()),
      [U, H] = F[F.length - 1],
      D = y.blockers.get(U);
    if (
      !(D && D.state === "proceeding") &&
      H({ currentLocation: E, nextLocation: C, historyAction: L })
    )
      return U;
  }
  function po(w) {
    let E = je(404, { pathname: w }),
      C = a || o,
      { matches: L, route: F } = Nc(C);
    return mo(), { notFoundMatches: L, route: F, error: E };
  }
  function _l(w, E) {
    return {
      boundaryId: rr(E.partialMatches).route.id,
      error: je(400, {
        type: "route-discovery",
        pathname: w,
        message:
          E.error != null && "message" in E.error ? E.error : String(E.error),
      }),
    };
  }
  function mo(w) {
    let E = [];
    return (
      nt.forEach((C, L) => {
        (!w || w(L)) && (C.cancel(), E.push(L), nt.delete(L));
      }),
      E
    );
  }
  function Zh(w, E, C) {
    if (((_ = w), (h = E), (m = C || null), !p && y.navigation === Ho)) {
      p = !0;
      let L = cs(y.location, y.matches);
      L != null && Ie({ restoreScrollPosition: L });
    }
    return () => {
      (_ = null), (h = null), (m = null);
    };
  }
  function ss(w, E) {
    return (
      (m &&
        m(
          w,
          E.map((L) => Gf(L, y.loaderData)),
        )) ||
      w.key
    );
  }
  function qh(w, E) {
    if (_ && h) {
      let C = ss(w, E);
      _[C] = h();
    }
  }
  function cs(w, E) {
    if (_) {
      let C = ss(w, E),
        L = _[C];
      if (typeof L == "number") return L;
    }
    return null;
  }
  function Ll(w, E, C) {
    if (d) {
      if (k.has(C)) return { active: !1, matches: w };
      if (w) {
        if (Object.keys(w[0].params).length > 0)
          return { active: !0, matches: di(E, C, u, !0) };
      } else return { active: !0, matches: di(E, C, u, !0) || [] };
    }
    return { active: !1, matches: null };
  }
  async function Tl(w, E, C) {
    let L = w;
    for (;;) {
      let F = a == null,
        U = a || o;
      try {
        await Yv(d, E, L, U, i, l, Uh, C);
      } catch (V) {
        return { type: "error", error: V, partialMatches: L };
      } finally {
        F && (o = [...o]);
      }
      if (C.aborted) return { type: "aborted" };
      let H = zt(U, E, u);
      if (H) return ds(E, k), { type: "success", matches: H };
      let D = di(U, E, u, !0);
      if (
        !D ||
        (L.length === D.length &&
          L.every((V, B) => V.route.id === D[B].route.id))
      )
        return ds(E, k), { type: "success", matches: null };
      L = D;
    }
  }
  function ds(w, E) {
    if (E.size >= g) {
      let C = E.values().next().value;
      E.delete(C);
    }
    E.add(w);
  }
  function bh(w) {
    (i = {}), (a = yl(w, l, void 0, i));
  }
  function ep(w, E) {
    let C = a == null;
    ih(w, E, a || o, i, l), C && ((o = [...o]), Ie({}));
  }
  return (
    (T = {
      get basename() {
        return u;
      },
      get future() {
        return c;
      },
      get state() {
        return y;
      },
      get routes() {
        return o;
      },
      get window() {
        return t;
      },
      initialize: Ah,
      subscribe: $h,
      enableScrollRestoration: Zh,
      navigate: es,
      fetch: Qh,
      revalidate: Hh,
      createHref: (w) => e.history.createHref(w),
      encodeLocation: (w) => e.history.encodeLocation(w),
      getFetcher: rs,
      deleteFetcher: Jh,
      dispose: Bh,
      getBlocker: Gh,
      deleteBlocker: as,
      patchRoutes: ep,
      _internalFetchControllers: j,
      _internalActiveDeferreds: nt,
      _internalSetRoutes: bh,
    }),
    T
  );
}
function Vv(e) {
  return (
    e != null &&
    (("formData" in e && e.formData != null) ||
      ("body" in e && e.body !== void 0))
  );
}
function Ba(e, t, n, r, l, i, o, a) {
  let u, s;
  if (o) {
    u = [];
    for (let c of t)
      if ((u.push(c), c.route.id === o)) {
        s = c;
        break;
      }
  } else (u = t), (s = t[t.length - 1]);
  let d = ju(l || ".", Iu(u, i), ct(e.pathname, n) || e.pathname, a === "path");
  return (
    l == null && ((d.search = e.search), (d.hash = e.hash)),
    (l == null || l === "" || l === ".") &&
      s &&
      s.route.index &&
      !Au(d.search) &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    r &&
      n !== "/" &&
      (d.pathname = d.pathname === "/" ? n : Pt([n, d.pathname])),
    mn(d)
  );
}
function Ec(e, t, n, r) {
  if (!r || !Vv(r)) return { path: n };
  if (r.formMethod && !ly(r.formMethod))
    return { path: n, error: je(405, { method: r.formMethod }) };
  let l = () => ({ path: n, error: je(400, { type: "invalid-body" }) }),
    i = r.formMethod || "get",
    o = e ? i.toUpperCase() : i.toLowerCase(),
    a = oh(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!pt(o)) return l();
      let f =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce((x, g) => {
                let [k, _] = g;
                return (
                  "" +
                  x +
                  k +
                  "=" +
                  _ +
                  `
`
                );
              }, "")
            : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: o,
          formAction: a,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: f,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!pt(o)) return l();
      try {
        let f = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: o,
            formAction: a,
            formEncType: r.formEncType,
            formData: void 0,
            json: f,
            text: void 0,
          },
        };
      } catch {
        return l();
      }
    }
  }
  $(
    typeof FormData == "function",
    "FormData is not available in this environment",
  );
  let u, s;
  if (r.formData) (u = $a(r.formData)), (s = r.formData);
  else if (r.body instanceof FormData) (u = $a(r.body)), (s = r.body);
  else if (r.body instanceof URLSearchParams) (u = r.body), (s = Pc(u));
  else if (r.body == null) (u = new URLSearchParams()), (s = new FormData());
  else
    try {
      (u = new URLSearchParams(r.body)), (s = Pc(u));
    } catch {
      return l();
    }
  let d = {
    formMethod: o,
    formAction: a,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: s,
    json: void 0,
    text: void 0,
  };
  if (pt(d.formMethod)) return { path: n, submission: d };
  let c = Vt(n);
  return (
    t && c.search && Au(c.search) && u.append("index", ""),
    (c.search = "?" + u),
    { path: mn(c), submission: d }
  );
}
function Kv(e, t) {
  let n = e;
  if (t) {
    let r = e.findIndex((l) => l.route.id === t);
    r >= 0 && (n = e.slice(0, r));
  }
  return n;
}
function xc(e, t, n, r, l, i, o, a, u, s, d, c, f, x, g, k) {
  let _ = k ? (Ge(k[1]) ? k[1].error : k[1].data) : void 0,
    m = e.createURL(t.location),
    h = e.createURL(l),
    p = k && Ge(k[1]) ? k[0] : void 0,
    S = p ? Kv(n, p) : n,
    P = k ? k[1].statusCode : void 0,
    R = o && P && P >= 400,
    T = S.filter((M, O) => {
      let { route: A } = M;
      if (A.lazy) return !0;
      if (A.loader == null) return !1;
      if (i)
        return typeof A.loader != "function" || A.loader.hydrate
          ? !0
          : t.loaderData[A.id] === void 0 &&
              (!t.errors || t.errors[A.id] === void 0);
      if (
        Qv(t.loaderData, t.matches[O], M) ||
        u.some((oe) => oe === M.route.id)
      )
        return !0;
      let Y = t.matches[O],
        he = M;
      return kc(
        M,
        ue(
          {
            currentUrl: m,
            currentParams: Y.params,
            nextUrl: h,
            nextParams: he.params,
          },
          r,
          {
            actionResult: _,
            actionStatus: P,
            defaultShouldRevalidate: R
              ? !1
              : a ||
                m.pathname + m.search === h.pathname + h.search ||
                m.search !== h.search ||
                lh(Y, he),
          },
        ),
      );
    }),
    y = [];
  return (
    c.forEach((M, O) => {
      if (i || !n.some((Ee) => Ee.route.id === M.routeId) || d.has(O)) return;
      let A = zt(x, M.path, g);
      if (!A) {
        y.push({
          key: O,
          routeId: M.routeId,
          path: M.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let Y = t.fetchers.get(O),
        he = Wr(A, M.path),
        oe = !1;
      f.has(O)
        ? (oe = !1)
        : s.has(O)
          ? (s.delete(O), (oe = !0))
          : Y && Y.state !== "idle" && Y.data === void 0
            ? (oe = a)
            : (oe = kc(
                he,
                ue(
                  {
                    currentUrl: m,
                    currentParams: t.matches[t.matches.length - 1].params,
                    nextUrl: h,
                    nextParams: n[n.length - 1].params,
                  },
                  r,
                  {
                    actionResult: _,
                    actionStatus: P,
                    defaultShouldRevalidate: R ? !1 : a,
                  },
                ),
              )),
        oe &&
          y.push({
            key: O,
            routeId: M.routeId,
            path: M.path,
            matches: A,
            match: he,
            controller: new AbortController(),
          });
    }),
    [T, y]
  );
}
function Qv(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    l = e[n.route.id] === void 0;
  return r || l;
}
function lh(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function kc(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
async function Yv(e, t, n, r, l, i, o, a) {
  let u = [t, ...n.map((s) => s.route.id)].join("-");
  try {
    let s = o.get(u);
    s ||
      ((s = e({
        path: t,
        matches: n,
        patch: (d, c) => {
          a.aborted || ih(d, c, r, l, i);
        },
      })),
      o.set(u, s)),
      s && ty(s) && (await s);
  } finally {
    o.delete(u);
  }
}
function ih(e, t, n, r, l) {
  if (e) {
    var i;
    let o = r[e];
    $(o, "No route found to patch children into: routeId = " + e);
    let a = yl(
      t,
      l,
      [
        e,
        "patch",
        String(((i = o.children) == null ? void 0 : i.length) || "0"),
      ],
      r,
    );
    o.children ? o.children.push(...a) : (o.children = a);
  } else {
    let o = yl(t, l, ["patch", String(n.length || "0")], r);
    n.push(...o);
  }
}
async function Cc(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let l = n[e.id];
  $(l, "No route found in manifest");
  let i = {};
  for (let o in r) {
    let u = l[o] !== void 0 && o !== "hasErrorBoundary";
    yr(
      !u,
      'Route "' +
        l.id +
        '" has a static property "' +
        o +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + o + '" will be ignored.'),
    ),
      !u && !pv.has(o) && (i[o] = r[o]);
  }
  Object.assign(l, i), Object.assign(l, ue({}, t(l), { lazy: void 0 }));
}
function Xv(e) {
  return Promise.all(e.matches.map((t) => t.resolve()));
}
async function Jv(e, t, n, r, l, i, o, a) {
  let u = r.reduce((c, f) => c.add(f.route.id), new Set()),
    s = new Set(),
    d = await e({
      matches: l.map((c) => {
        let f = u.has(c.route.id);
        return ue({}, c, {
          shouldLoad: f,
          resolve: (g) => (
            s.add(c.route.id),
            f
              ? Gv(t, n, c, i, o, g, a)
              : Promise.resolve({ type: b.data, result: void 0 })
          ),
        });
      }),
      request: n,
      params: l[0].params,
      context: a,
    });
  return (
    l.forEach((c) =>
      $(
        s.has(c.route.id),
        '`match.resolve()` was not called for route id "' +
          c.route.id +
          '". You must call `match.resolve()` on every match passed to `dataStrategy` to ensure all routes are properly loaded.',
      ),
    ),
    d.filter((c, f) => u.has(l[f].route.id))
  );
}
async function Gv(e, t, n, r, l, i, o) {
  let a,
    u,
    s = (d) => {
      let c,
        f = new Promise((k, _) => (c = _));
      (u = () => c()), t.signal.addEventListener("abort", u);
      let x = (k) =>
          typeof d != "function"
            ? Promise.reject(
                new Error(
                  "You cannot call the handler for a route which defines a boolean " +
                    ('"' + e + '" [routeId: ' + n.route.id + "]"),
                ),
              )
            : d(
                { request: t, params: n.params, context: o },
                ...(k !== void 0 ? [k] : []),
              ),
        g;
      return (
        i
          ? (g = i((k) => x(k)))
          : (g = (async () => {
              try {
                return { type: "data", result: await x() };
              } catch (k) {
                return { type: "error", result: k };
              }
            })()),
        Promise.race([g, f])
      );
    };
  try {
    let d = n.route[e];
    if (n.route.lazy)
      if (d) {
        let c,
          [f] = await Promise.all([
            s(d).catch((x) => {
              c = x;
            }),
            Cc(n.route, l, r),
          ]);
        if (c !== void 0) throw c;
        a = f;
      } else if ((await Cc(n.route, l, r), (d = n.route[e]), d)) a = await s(d);
      else if (e === "action") {
        let c = new URL(t.url),
          f = c.pathname + c.search;
        throw je(405, { method: t.method, pathname: f, routeId: n.route.id });
      } else return { type: b.data, result: void 0 };
    else if (d) a = await s(d);
    else {
      let c = new URL(t.url),
        f = c.pathname + c.search;
      throw je(404, { pathname: f });
    }
    $(
      a.result !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          n.route.id +
          "\" but didn't return anything from your `" +
          e +
          "` ") +
        "function. Please return a value or `null`.",
    );
  } catch (d) {
    return { type: b.error, result: d };
  } finally {
    u && t.signal.removeEventListener("abort", u);
  }
  return a;
}
async function Zv(e) {
  let { result: t, type: n } = e;
  if (ah(t)) {
    let s;
    try {
      let d = t.headers.get("Content-Type");
      d && /\bapplication\/json\b/.test(d)
        ? t.body == null
          ? (s = null)
          : (s = await t.json())
        : (s = await t.text());
    } catch (d) {
      return { type: b.error, error: d };
    }
    return n === b.error
      ? {
          type: b.error,
          error: new Fn(t.status, t.statusText, s),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: b.data, data: s, statusCode: t.status, headers: t.headers };
  }
  if (n === b.error) {
    if (Oc(t)) {
      var r;
      if (t.data instanceof Error) {
        var l;
        return {
          type: b.error,
          error: t.data,
          statusCode: (l = t.init) == null ? void 0 : l.status,
        };
      }
      t = new Fn(
        ((r = t.init) == null ? void 0 : r.status) || 500,
        void 0,
        t.data,
      );
    }
    return { type: b.error, error: t, statusCode: Er(t) ? t.status : void 0 };
  }
  if (ry(t)) {
    var i, o;
    return {
      type: b.deferred,
      deferredData: t,
      statusCode: (i = t.init) == null ? void 0 : i.status,
      headers:
        ((o = t.init) == null ? void 0 : o.headers) &&
        new Headers(t.init.headers),
    };
  }
  if (Oc(t)) {
    var a, u;
    return {
      type: b.data,
      data: t.data,
      statusCode: (a = t.init) == null ? void 0 : a.status,
      headers:
        (u = t.init) != null && u.headers
          ? new Headers(t.init.headers)
          : void 0,
    };
  }
  return { type: b.data, data: t };
}
function qv(e, t, n, r, l, i) {
  let o = e.headers.get("Location");
  if (
    ($(
      o,
      "Redirects returned/thrown from loaders/actions must have a Location header",
    ),
    !Uu.test(o))
  ) {
    let a = r.slice(0, r.findIndex((u) => u.route.id === n) + 1);
    (o = Ba(new URL(t.url), a, l, !0, o, i)), e.headers.set("Location", o);
  }
  return e;
}
function Rc(e, t, n) {
  if (Uu.test(e)) {
    let r = e,
      l = r.startsWith("//") ? new URL(t.protocol + r) : new URL(r),
      i = ct(l.pathname, n) != null;
    if (l.origin === t.origin && i) return l.pathname + l.search + l.hash;
  }
  return e;
}
function Vn(e, t, n, r) {
  let l = e.createURL(oh(t)).toString(),
    i = { signal: n };
  if (r && pt(r.formMethod)) {
    let { formMethod: o, formEncType: a } = r;
    (i.method = o.toUpperCase()),
      a === "application/json"
        ? ((i.headers = new Headers({ "Content-Type": a })),
          (i.body = JSON.stringify(r.json)))
        : a === "text/plain"
          ? (i.body = r.text)
          : a === "application/x-www-form-urlencoded" && r.formData
            ? (i.body = $a(r.formData))
            : (i.body = r.formData);
  }
  return new Request(l, i);
}
function $a(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function Pc(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function bv(e, t, n, r, l, i) {
  let o = {},
    a = null,
    u,
    s = !1,
    d = {},
    c = r && Ge(r[1]) ? r[1].error : void 0;
  return (
    n.forEach((f, x) => {
      let g = t[x].route.id;
      if (
        ($(!_n(f), "Cannot handle redirect results in processLoaderData"),
        Ge(f))
      ) {
        let k = f.error;
        c !== void 0 && ((k = c), (c = void 0)), (a = a || {});
        {
          let _ = rr(e, g);
          a[_.route.id] == null && (a[_.route.id] = k);
        }
        (o[g] = void 0),
          s || ((s = !0), (u = Er(f.error) ? f.error.status : 500)),
          f.headers && (d[g] = f.headers);
      } else
        Pn(f)
          ? (l.set(g, f.deferredData),
            (o[g] = f.deferredData.data),
            f.statusCode != null &&
              f.statusCode !== 200 &&
              !s &&
              (u = f.statusCode),
            f.headers && (d[g] = f.headers))
          : ((o[g] = f.data),
            f.statusCode && f.statusCode !== 200 && !s && (u = f.statusCode),
            f.headers && (d[g] = f.headers));
    }),
    c !== void 0 && r && ((a = { [r[0]]: c }), (o[r[0]] = void 0)),
    { loaderData: o, errors: a, statusCode: u || 200, loaderHeaders: d }
  );
}
function _c(e, t, n, r, l, i, o, a) {
  let { loaderData: u, errors: s } = bv(t, n, r, l, a);
  for (let d = 0; d < i.length; d++) {
    let { key: c, match: f, controller: x } = i[d];
    $(
      o !== void 0 && o[d] !== void 0,
      "Did not find corresponding fetcher result",
    );
    let g = o[d];
    if (!(x && x.signal.aborted))
      if (Ge(g)) {
        let k = rr(e.matches, f == null ? void 0 : f.route.id);
        (s && s[k.route.id]) || (s = ue({}, s, { [k.route.id]: g.error })),
          e.fetchers.delete(c);
      } else if (_n(g)) $(!1, "Unhandled fetcher revalidation redirect");
      else if (Pn(g)) $(!1, "Unhandled fetcher deferred data");
      else {
        let k = Zt(g.data);
        e.fetchers.set(c, k);
      }
  }
  return { loaderData: u, errors: s };
}
function Lc(e, t, n, r) {
  let l = ue({}, t);
  for (let i of n) {
    let o = i.route.id;
    if (
      (t.hasOwnProperty(o)
        ? t[o] !== void 0 && (l[o] = t[o])
        : e[o] !== void 0 && i.route.loader && (l[o] = e[o]),
      r && r.hasOwnProperty(o))
    )
      break;
  }
  return l;
}
function Tc(e) {
  return e
    ? Ge(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {};
}
function rr(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function Nc(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
    route: t,
  };
}
function je(e, t) {
  let {
      pathname: n,
      routeId: r,
      method: l,
      type: i,
      message: o,
    } = t === void 0 ? {} : t,
    a = "Unknown Server Error",
    u = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((a = "Bad Request"),
        i === "route-discovery"
          ? (u =
              'Unable to match URL "' +
              n +
              '" - the `unstable_patchRoutesOnNavigation()` ' +
              (`function threw the following error:
` +
                o))
          : l && n && r
            ? (u =
                "You made a " +
                l +
                ' request to "' +
                n +
                '" but ' +
                ('did not provide a `loader` for route "' + r + '", ') +
                "so there is no way to handle the request.")
            : i === "defer-action"
              ? (u = "defer() is not supported in actions")
              : i === "invalid-body" &&
                (u = "Unable to encode submission body"))
      : e === 403
        ? ((a = "Forbidden"),
          (u = 'Route "' + r + '" does not match URL "' + n + '"'))
        : e === 404
          ? ((a = "Not Found"), (u = 'No route matches URL "' + n + '"'))
          : e === 405 &&
            ((a = "Method Not Allowed"),
            l && n && r
              ? (u =
                  "You made a " +
                  l.toUpperCase() +
                  ' request to "' +
                  n +
                  '" but ' +
                  ('did not provide an `action` for route "' + r + '", ') +
                  "so there is no way to handle the request.")
              : l && (u = 'Invalid request method "' + l.toUpperCase() + '"')),
    new Fn(e || 500, a, new Error(u), !0)
  );
}
function Dc(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (_n(n)) return { result: n, idx: t };
  }
}
function oh(e) {
  let t = typeof e == "string" ? Vt(e) : e;
  return mn(ue({}, t, { hash: "" }));
}
function ey(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ""
      ? t.hash !== ""
      : e.hash === t.hash
        ? !0
        : t.hash !== "";
}
function ty(e) {
  return typeof e == "object" && e != null && "then" in e;
}
function ny(e) {
  return ah(e.result) && $v.has(e.result.status);
}
function Pn(e) {
  return e.type === b.deferred;
}
function Ge(e) {
  return e.type === b.error;
}
function _n(e) {
  return (e && e.type) === b.redirect;
}
function Oc(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "type" in e &&
    "data" in e &&
    "init" in e &&
    e.type === "DataWithResponseInit"
  );
}
function ry(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function ah(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function ly(e) {
  return Bv.has(e.toLowerCase());
}
function pt(e) {
  return Uv.has(e.toLowerCase());
}
async function Mc(e, t, n, r, l, i) {
  for (let o = 0; o < n.length; o++) {
    let a = n[o],
      u = t[o];
    if (!u) continue;
    let s = e.find((c) => c.route.id === u.route.id),
      d = s != null && !lh(s, u) && (i && i[u.route.id]) !== void 0;
    if (Pn(a) && (l || d)) {
      let c = r[o];
      $(c, "Expected an AbortSignal for revalidating fetcher deferred result"),
        await uh(a, c, l).then((f) => {
          f && (n[o] = f || n[o]);
        });
    }
  }
}
async function uh(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: b.data, data: e.deferredData.unwrappedData };
      } catch (l) {
        return { type: b.error, error: l };
      }
    return { type: b.data, data: e.deferredData.data };
  }
}
function Au(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function Wr(e, t) {
  let n = typeof t == "string" ? Vt(t).search : t.search;
  if (e[e.length - 1].route.index && Au(n || "")) return e[e.length - 1];
  let r = bf(e);
  return r[r.length - 1];
}
function zc(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: l,
    formData: i,
    json: o,
  } = e;
  if (!(!t || !n || !r)) {
    if (l != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: l,
      };
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: i,
        json: void 0,
        text: void 0,
      };
    if (o !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: o,
        text: void 0,
      };
  }
}
function Wo(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function iy(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function Ir(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function oy(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function Zt(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function ay(e, t) {
  try {
    let n = e.sessionStorage.getItem(rh);
    if (n) {
      let r = JSON.parse(n);
      for (let [l, i] of Object.entries(r || {}))
        i && Array.isArray(i) && t.set(l, new Set(i || []));
    }
  } catch {}
}
function uy(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, l] of t) n[r] = [...l];
    try {
      e.sessionStorage.setItem(rh, JSON.stringify(n));
    } catch (r) {
      yr(
        !1,
        "Failed to save applied view transitions in sessionStorage (" +
          r +
          ").",
      );
    }
  }
}
/**
 * React Router v6.26.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function $i() {
  return (
    ($i = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    $i.apply(this, arguments)
  );
}
const xr = v.createContext(null),
  xl = v.createContext(null),
  Hi = v.createContext(null),
  wt = v.createContext(null),
  Bu = v.createContext(null),
  Lt = v.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  sh = v.createContext(null);
function $u(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  kl() || $(!1);
  let { basename: r, navigator: l } = v.useContext(wt),
    { hash: i, pathname: o, search: a } = Cl(e, { relative: n }),
    u = o;
  return (
    r !== "/" && (u = o === "/" ? r : Pt([r, o])),
    l.createHref({ pathname: u, search: a, hash: i })
  );
}
function kl() {
  return v.useContext(Bu) != null;
}
function Kt() {
  return kl() || $(!1), v.useContext(Bu).location;
}
function ch(e) {
  v.useContext(wt).static || v.useLayoutEffect(e);
}
function sy() {
  let { isDataRoute: e } = v.useContext(Lt);
  return e ? _y() : cy();
}
function cy() {
  kl() || $(!1);
  let e = v.useContext(xr),
    { basename: t, future: n, navigator: r } = v.useContext(wt),
    { matches: l } = v.useContext(Lt),
    { pathname: i } = Kt(),
    o = JSON.stringify(Iu(l, n.v7_relativeSplatPath)),
    a = v.useRef(!1);
  return (
    ch(() => {
      a.current = !0;
    }),
    v.useCallback(
      function (s, d) {
        if ((d === void 0 && (d = {}), !a.current)) return;
        if (typeof s == "number") {
          r.go(s);
          return;
        }
        let c = ju(s, JSON.parse(o), i, d.relative === "path");
        e == null &&
          t !== "/" &&
          (c.pathname = c.pathname === "/" ? t : Pt([t, c.pathname])),
          (d.replace ? r.replace : r.push)(c, d.state, d);
      },
      [t, r, o, i, e],
    )
  );
}
const dy = v.createContext(null);
function fy(e) {
  let t = v.useContext(Lt).outlet;
  return t && v.createElement(dy.Provider, { value: e }, t);
}
function Cl(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = v.useContext(wt),
    { matches: l } = v.useContext(Lt),
    { pathname: i } = Kt(),
    o = JSON.stringify(Iu(l, r.v7_relativeSplatPath));
  return v.useMemo(() => ju(e, JSON.parse(o), i, n === "path"), [e, o, i, n]);
}
function hy(e, t, n, r) {
  kl() || $(!1);
  let { navigator: l } = v.useContext(wt),
    { matches: i } = v.useContext(Lt),
    o = i[i.length - 1],
    a = o ? o.params : {};
  o && o.pathname;
  let u = o ? o.pathnameBase : "/";
  o && o.route;
  let s = Kt(),
    d;
  d = s;
  let c = d.pathname || "/",
    f = c;
  if (u !== "/") {
    let k = u.replace(/^\//, "").split("/");
    f = "/" + c.replace(/^\//, "").split("/").slice(k.length).join("/");
  }
  let x = zt(e, { pathname: f });
  return gy(
    x &&
      x.map((k) =>
        Object.assign({}, k, {
          params: Object.assign({}, a, k.params),
          pathname: Pt([
            u,
            l.encodeLocation
              ? l.encodeLocation(k.pathname).pathname
              : k.pathname,
          ]),
          pathnameBase:
            k.pathnameBase === "/"
              ? u
              : Pt([
                  u,
                  l.encodeLocation
                    ? l.encodeLocation(k.pathnameBase).pathname
                    : k.pathnameBase,
                ]),
        }),
      ),
    i,
    n,
    r,
  );
}
function py() {
  let e = fh(),
    t = Er(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return v.createElement(
    v.Fragment,
    null,
    v.createElement("h2", null, "Unexpected Application Error!"),
    v.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? v.createElement("pre", { style: l }, n) : null,
    null,
  );
}
const my = v.createElement(py, null);
class vy extends v.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error !== void 0
      ? v.createElement(
          Lt.Provider,
          { value: this.props.routeContext },
          v.createElement(sh.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function yy(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = v.useContext(xr);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    v.createElement(Lt.Provider, { value: t }, r)
  );
}
function gy(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let o = e,
    a = (l = n) == null ? void 0 : l.errors;
  if (a != null) {
    let d = o.findIndex(
      (c) => c.route.id && (a == null ? void 0 : a[c.route.id]) !== void 0,
    );
    d >= 0 || $(!1), (o = o.slice(0, Math.min(o.length, d + 1)));
  }
  let u = !1,
    s = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < o.length; d++) {
      let c = o[d];
      if (
        ((c.route.HydrateFallback || c.route.hydrateFallbackElement) && (s = d),
        c.route.id)
      ) {
        let { loaderData: f, errors: x } = n,
          g =
            c.route.loader &&
            f[c.route.id] === void 0 &&
            (!x || x[c.route.id] === void 0);
        if (c.route.lazy || g) {
          (u = !0), s >= 0 ? (o = o.slice(0, s + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((d, c, f) => {
    let x,
      g = !1,
      k = null,
      _ = null;
    n &&
      ((x = a && c.route.id ? a[c.route.id] : void 0),
      (k = c.route.errorElement || my),
      u &&
        (s < 0 && f === 0
          ? ((g = !0), (_ = null))
          : s === f &&
            ((g = !0), (_ = c.route.hydrateFallbackElement || null))));
    let m = t.concat(o.slice(0, f + 1)),
      h = () => {
        let p;
        return (
          x
            ? (p = k)
            : g
              ? (p = _)
              : c.route.Component
                ? (p = v.createElement(c.route.Component, null))
                : c.route.element
                  ? (p = c.route.element)
                  : (p = d),
          v.createElement(yy, {
            match: c,
            routeContext: { outlet: d, matches: m, isDataRoute: n != null },
            children: p,
          })
        );
      };
    return n && (c.route.ErrorBoundary || c.route.errorElement || f === 0)
      ? v.createElement(vy, {
          location: n.location,
          revalidation: n.revalidation,
          component: k,
          error: x,
          children: h(),
          routeContext: { outlet: null, matches: m, isDataRoute: !0 },
        })
      : h();
  }, null);
}
var dh = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(dh || {}),
  Ht = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Ht || {});
function wy(e) {
  let t = v.useContext(xr);
  return t || $(!1), t;
}
function oo(e) {
  let t = v.useContext(xl);
  return t || $(!1), t;
}
function Sy(e) {
  let t = v.useContext(Lt);
  return t || $(!1), t;
}
function ao(e) {
  let t = Sy(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || $(!1), n.route.id;
}
function Ey() {
  return ao(Ht.UseRouteId);
}
function xy() {
  return oo(Ht.UseNavigation).navigation;
}
function ky() {
  let { matches: e, loaderData: t } = oo(Ht.UseMatches);
  return v.useMemo(() => e.map((n) => Gf(n, t)), [e, t]);
}
function Cy() {
  let e = oo(Ht.UseLoaderData),
    t = ao(Ht.UseLoaderData);
  if (e.errors && e.errors[t] != null) {
    console.error(
      "You cannot `useLoaderData` in an errorElement (routeId: " + t + ")",
    );
    return;
  }
  return e.loaderData[t];
}
function fh() {
  var e;
  let t = v.useContext(sh),
    n = oo(Ht.UseRouteError),
    r = ao(Ht.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Ry() {
  let e = v.useContext(Hi);
  return e == null ? void 0 : e._data;
}
function Py() {
  let e = v.useContext(Hi);
  return e == null ? void 0 : e._error;
}
function _y() {
  let { router: e } = wy(dh.UseNavigateStable),
    t = ao(Ht.UseNavigateStable),
    n = v.useRef(!1);
  return (
    ch(() => {
      n.current = !0;
    }),
    v.useCallback(
      function (l, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, $i({ fromRouteId: t }, i)));
      },
      [e, t],
    )
  );
}
function C0(e) {
  return fy(e.context);
}
function Ly(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = ge.Pop,
    navigator: i,
    static: o = !1,
    future: a,
  } = e;
  kl() && $(!1);
  let u = t.replace(/^\/*/, "/"),
    s = v.useMemo(
      () => ({
        basename: u,
        navigator: i,
        static: o,
        future: $i({ v7_relativeSplatPath: !1 }, a),
      }),
      [u, a, i, o],
    );
  typeof r == "string" && (r = Vt(r));
  let {
      pathname: d = "/",
      search: c = "",
      hash: f = "",
      state: x = null,
      key: g = "default",
    } = r,
    k = v.useMemo(() => {
      let _ = ct(d, u);
      return _ == null
        ? null
        : {
            location: { pathname: _, search: c, hash: f, state: x, key: g },
            navigationType: l,
          };
    }, [u, d, c, f, x, g, l]);
  return k == null
    ? null
    : v.createElement(
        wt.Provider,
        { value: s },
        v.createElement(Bu.Provider, { children: n, value: k }),
      );
}
function Ty(e) {
  let { children: t, errorElement: n, resolve: r } = e;
  return v.createElement(
    Dy,
    { resolve: r, errorElement: n },
    v.createElement(Oy, null, t),
  );
}
var rt = (function (e) {
  return (
    (e[(e.pending = 0)] = "pending"),
    (e[(e.success = 1)] = "success"),
    (e[(e.error = 2)] = "error"),
    e
  );
})(rt || {});
const Ny = new Promise(() => {});
class Dy extends v.Component {
  constructor(t) {
    super(t), (this.state = { error: null });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidCatch(t, n) {
    console.error("<Await> caught the following error during render", t, n);
  }
  render() {
    let { children: t, errorElement: n, resolve: r } = this.props,
      l = null,
      i = rt.pending;
    if (!(r instanceof Promise))
      (i = rt.success),
        (l = Promise.resolve()),
        Object.defineProperty(l, "_tracked", { get: () => !0 }),
        Object.defineProperty(l, "_data", { get: () => r });
    else if (this.state.error) {
      i = rt.error;
      let o = this.state.error;
      (l = Promise.reject().catch(() => {})),
        Object.defineProperty(l, "_tracked", { get: () => !0 }),
        Object.defineProperty(l, "_error", { get: () => o });
    } else
      r._tracked
        ? ((l = r),
          (i =
            "_error" in l ? rt.error : "_data" in l ? rt.success : rt.pending))
        : ((i = rt.pending),
          Object.defineProperty(r, "_tracked", { get: () => !0 }),
          (l = r.then(
            (o) => Object.defineProperty(r, "_data", { get: () => o }),
            (o) => Object.defineProperty(r, "_error", { get: () => o }),
          )));
    if (i === rt.error && l._error instanceof Bi) throw Ny;
    if (i === rt.error && !n) throw l._error;
    if (i === rt.error)
      return v.createElement(Hi.Provider, { value: l, children: n });
    if (i === rt.success)
      return v.createElement(Hi.Provider, { value: l, children: t });
    throw l;
  }
}
function Oy(e) {
  let { children: t } = e,
    n = Ry(),
    r = typeof t == "function" ? t(n) : t;
  return v.createElement(v.Fragment, null, r);
}
function R0(e) {
  let t = {
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: v.createElement(e.Component),
        Component: void 0,
      }),
    e.HydrateFallback &&
      Object.assign(t, {
        hydrateFallbackElement: v.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: v.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
/**
 * React Router DOM v6.26.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function _t() {
  return (
    (_t = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    _t.apply(this, arguments)
  );
}
function Hu(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    i;
  for (i = 0; i < r.length; i++)
    (l = r[i]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
const fi = "get",
  Vo = "application/x-www-form-urlencoded";
function uo(e) {
  return e != null && typeof e.tagName == "string";
}
function My(e) {
  return uo(e) && e.tagName.toLowerCase() === "button";
}
function zy(e) {
  return uo(e) && e.tagName.toLowerCase() === "form";
}
function Fy(e) {
  return uo(e) && e.tagName.toLowerCase() === "input";
}
function Iy(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function jy(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Iy(e);
}
let Gl = null;
function Uy() {
  if (Gl === null)
    try {
      new FormData(document.createElement("form"), 0), (Gl = !1);
    } catch {
      Gl = !0;
    }
  return Gl;
}
const Ay = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Ko(e) {
  return e != null && !Ay.has(e) ? null : e;
}
function By(e, t) {
  let n, r, l, i, o;
  if (zy(e)) {
    let a = e.getAttribute("action");
    (r = a ? ct(a, t) : null),
      (n = e.getAttribute("method") || fi),
      (l = Ko(e.getAttribute("enctype")) || Vo),
      (i = new FormData(e));
  } else if (My(e) || (Fy(e) && (e.type === "submit" || e.type === "image"))) {
    let a = e.form;
    if (a == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let u = e.getAttribute("formaction") || a.getAttribute("action");
    if (
      ((r = u ? ct(u, t) : null),
      (n = e.getAttribute("formmethod") || a.getAttribute("method") || fi),
      (l =
        Ko(e.getAttribute("formenctype")) ||
        Ko(a.getAttribute("enctype")) ||
        Vo),
      (i = new FormData(a, e)),
      !Uy())
    ) {
      let { name: s, type: d, value: c } = e;
      if (d === "image") {
        let f = s ? s + "." : "";
        i.append(f + "x", "0"), i.append(f + "y", "0");
      } else s && i.append(s, c);
    }
  } else {
    if (uo(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (n = fi), (r = null), (l = Vo), (o = e);
  }
  return (
    i && l === "text/plain" && ((o = i), (i = void 0)),
    { action: r, method: n.toLowerCase(), encType: l, formData: i, body: o }
  );
}
const $y = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  Hy = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "unstable_viewTransition",
    "children",
  ],
  Wy = [
    "fetcherKey",
    "navigate",
    "reloadDocument",
    "replace",
    "state",
    "method",
    "action",
    "onSubmit",
    "relative",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  Vy = "6";
try {
  window.__reactRouterVersion = Vy;
} catch {}
const hh = v.createContext({ isTransitioning: !1 }),
  ph = v.createContext(new Map()),
  Ky = "startTransition",
  Fc = Qc[Ky],
  Qy = "flushSync",
  Ic = dv[Qy],
  Yy = "useId",
  jc = Qc[Yy];
function Xy(e) {
  Fc ? Fc(e) : e();
}
function jr(e) {
  Ic ? Ic(e) : e();
}
let Jy = class {
  constructor() {
    (this.status = "pending"),
      (this.promise = new Promise((t, n) => {
        (this.resolve = (r) => {
          this.status === "pending" && ((this.status = "resolved"), t(r));
        }),
          (this.reject = (r) => {
            this.status === "pending" && ((this.status = "rejected"), n(r));
          });
      }));
  }
};
function _0(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [l, i] = v.useState(n.state),
    [o, a] = v.useState(),
    [u, s] = v.useState({ isTransitioning: !1 }),
    [d, c] = v.useState(),
    [f, x] = v.useState(),
    [g, k] = v.useState(),
    _ = v.useRef(new Map()),
    { v7_startTransition: m } = r || {},
    h = v.useCallback(
      (y) => {
        m ? Xy(y) : y();
      },
      [m],
    ),
    p = v.useCallback(
      (y, M) => {
        let {
          deletedFetchers: O,
          unstable_flushSync: A,
          unstable_viewTransitionOpts: Y,
        } = M;
        O.forEach((oe) => _.current.delete(oe)),
          y.fetchers.forEach((oe, Ee) => {
            oe.data !== void 0 && _.current.set(Ee, oe.data);
          });
        let he =
          n.window == null ||
          n.window.document == null ||
          typeof n.window.document.startViewTransition != "function";
        if (!Y || he) {
          A ? jr(() => i(y)) : h(() => i(y));
          return;
        }
        if (A) {
          jr(() => {
            f && (d && d.resolve(), f.skipTransition()),
              s({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: Y.currentLocation,
                nextLocation: Y.nextLocation,
              });
          });
          let oe = n.window.document.startViewTransition(() => {
            jr(() => i(y));
          });
          oe.finished.finally(() => {
            jr(() => {
              c(void 0), x(void 0), a(void 0), s({ isTransitioning: !1 });
            });
          }),
            jr(() => x(oe));
          return;
        }
        f
          ? (d && d.resolve(),
            f.skipTransition(),
            k({
              state: y,
              currentLocation: Y.currentLocation,
              nextLocation: Y.nextLocation,
            }))
          : (a(y),
            s({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: Y.currentLocation,
              nextLocation: Y.nextLocation,
            }));
      },
      [n.window, f, d, _, h],
    );
  v.useLayoutEffect(() => n.subscribe(p), [n, p]),
    v.useEffect(() => {
      u.isTransitioning && !u.flushSync && c(new Jy());
    }, [u]),
    v.useEffect(() => {
      if (d && o && n.window) {
        let y = o,
          M = d.promise,
          O = n.window.document.startViewTransition(async () => {
            h(() => i(y)), await M;
          });
        O.finished.finally(() => {
          c(void 0), x(void 0), a(void 0), s({ isTransitioning: !1 });
        }),
          x(O);
      }
    }, [h, o, d, n.window]),
    v.useEffect(() => {
      d && o && l.location.key === o.location.key && d.resolve();
    }, [d, f, l.location, o]),
    v.useEffect(() => {
      !u.isTransitioning &&
        g &&
        (a(g.state),
        s({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: g.currentLocation,
          nextLocation: g.nextLocation,
        }),
        k(void 0));
    }, [u.isTransitioning, g]),
    v.useEffect(() => {}, []);
  let S = v.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (y) => n.navigate(y),
        push: (y, M, O) =>
          n.navigate(y, {
            state: M,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
        replace: (y, M, O) =>
          n.navigate(y, {
            replace: !0,
            state: M,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
      }),
      [n],
    ),
    P = n.basename || "/",
    R = v.useMemo(
      () => ({ router: n, navigator: S, static: !1, basename: P }),
      [n, S, P],
    ),
    T = v.useMemo(
      () => ({ v7_relativeSplatPath: n.future.v7_relativeSplatPath }),
      [n.future.v7_relativeSplatPath],
    );
  return v.createElement(
    v.Fragment,
    null,
    v.createElement(
      xr.Provider,
      { value: R },
      v.createElement(
        xl.Provider,
        { value: l },
        v.createElement(
          ph.Provider,
          { value: _.current },
          v.createElement(
            hh.Provider,
            { value: u },
            v.createElement(
              Ly,
              {
                basename: P,
                location: l.location,
                navigationType: l.historyAction,
                navigator: S,
                future: T,
              },
              l.initialized || n.future.v7_partialHydration
                ? v.createElement(Gy, {
                    routes: n.routes,
                    future: n.future,
                    state: l,
                  })
                : t,
            ),
          ),
        ),
      ),
    ),
    null,
  );
}
const Gy = v.memo(Zy);
function Zy(e) {
  let { routes: t, future: n, state: r } = e;
  return hy(t, void 0, r, n);
}
const qy =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  by = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  mh = v.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: i,
        replace: o,
        state: a,
        target: u,
        to: s,
        preventScrollReset: d,
        unstable_viewTransition: c,
      } = t,
      f = Hu(t, $y),
      { basename: x } = v.useContext(wt),
      g,
      k = !1;
    if (typeof s == "string" && by.test(s) && ((g = s), qy))
      try {
        let p = new URL(window.location.href),
          S = s.startsWith("//") ? new URL(p.protocol + s) : new URL(s),
          P = ct(S.pathname, x);
        S.origin === p.origin && P != null
          ? (s = P + S.search + S.hash)
          : (k = !0);
      } catch {}
    let _ = $u(s, { relative: l }),
      m = tg(s, {
        replace: o,
        state: a,
        target: u,
        preventScrollReset: d,
        relative: l,
        unstable_viewTransition: c,
      });
    function h(p) {
      r && r(p), p.defaultPrevented || m(p);
    }
    return v.createElement(
      "a",
      _t({}, f, { href: g || _, onClick: k || i ? r : h, ref: n, target: u }),
    );
  }),
  eg = v.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: l = !1,
        className: i = "",
        end: o = !1,
        style: a,
        to: u,
        unstable_viewTransition: s,
        children: d,
      } = t,
      c = Hu(t, Hy),
      f = Cl(u, { relative: c.relative }),
      x = Kt(),
      g = v.useContext(xl),
      { navigator: k, basename: _ } = v.useContext(wt),
      m = g != null && ag(f) && s === !0,
      h = k.encodeLocation ? k.encodeLocation(f).pathname : f.pathname,
      p = x.pathname,
      S =
        g && g.navigation && g.navigation.location
          ? g.navigation.location.pathname
          : null;
    l ||
      ((p = p.toLowerCase()),
      (S = S ? S.toLowerCase() : null),
      (h = h.toLowerCase())),
      S && _ && (S = ct(S, _) || S);
    const P = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
    let R = p === h || (!o && p.startsWith(h) && p.charAt(P) === "/"),
      T =
        S != null &&
        (S === h || (!o && S.startsWith(h) && S.charAt(h.length) === "/")),
      y = { isActive: R, isPending: T, isTransitioning: m },
      M = R ? r : void 0,
      O;
    typeof i == "function"
      ? (O = i(y))
      : (O = [
          i,
          R ? "active" : null,
          T ? "pending" : null,
          m ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let A = typeof a == "function" ? a(y) : a;
    return v.createElement(
      mh,
      _t({}, c, {
        "aria-current": M,
        className: O,
        ref: n,
        style: A,
        to: u,
        unstable_viewTransition: s,
      }),
      typeof d == "function" ? d(y) : d,
    );
  }),
  vh = v.forwardRef((e, t) => {
    let {
        fetcherKey: n,
        navigate: r,
        reloadDocument: l,
        replace: i,
        state: o,
        method: a = fi,
        action: u,
        onSubmit: s,
        relative: d,
        preventScrollReset: c,
        unstable_viewTransition: f,
      } = e,
      x = Hu(e, Wy),
      g = wh(),
      k = lg(u, { relative: d }),
      _ = a.toLowerCase() === "get" ? "get" : "post",
      m = (h) => {
        if ((s && s(h), h.defaultPrevented)) return;
        h.preventDefault();
        let p = h.nativeEvent.submitter,
          S = (p == null ? void 0 : p.getAttribute("formmethod")) || a;
        g(p || h.currentTarget, {
          fetcherKey: n,
          method: S,
          navigate: r,
          replace: i,
          state: o,
          relative: d,
          preventScrollReset: c,
          unstable_viewTransition: f,
        });
      };
    return v.createElement(
      "form",
      _t({ ref: t, method: _, action: k, onSubmit: l ? s : m }, x),
    );
  });
var gr;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(gr || (gr = {}));
var Wi;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Wi || (Wi = {}));
function so(e) {
  let t = v.useContext(xr);
  return t || $(!1), t;
}
function yh(e) {
  let t = v.useContext(xl);
  return t || $(!1), t;
}
function tg(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: i,
      relative: o,
      unstable_viewTransition: a,
    } = t === void 0 ? {} : t,
    u = sy(),
    s = Kt(),
    d = Cl(e, { relative: o });
  return v.useCallback(
    (c) => {
      if (jy(c, n)) {
        c.preventDefault();
        let f = r !== void 0 ? r : mn(s) === mn(d);
        u(e, {
          replace: f,
          state: l,
          preventScrollReset: i,
          relative: o,
          unstable_viewTransition: a,
        });
      }
    },
    [s, u, d, r, l, n, e, i, o, a],
  );
}
function ng() {
  if (typeof document > "u")
    throw new Error(
      "You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.",
    );
}
let rg = 0,
  gh = () => "__" + String(++rg) + "__";
function wh() {
  let { router: e } = so(gr.UseSubmit),
    { basename: t } = v.useContext(wt),
    n = Ey();
  return v.useCallback(
    function (r, l) {
      l === void 0 && (l = {}), ng();
      let { action: i, method: o, encType: a, formData: u, body: s } = By(r, t);
      if (l.navigate === !1) {
        let d = l.fetcherKey || gh();
        e.fetch(d, n, l.action || i, {
          preventScrollReset: l.preventScrollReset,
          formData: u,
          body: s,
          formMethod: l.method || o,
          formEncType: l.encType || a,
          unstable_flushSync: l.unstable_flushSync,
        });
      } else
        e.navigate(l.action || i, {
          preventScrollReset: l.preventScrollReset,
          formData: u,
          body: s,
          formMethod: l.method || o,
          formEncType: l.encType || a,
          replace: l.replace,
          state: l.state,
          fromRouteId: n,
          unstable_flushSync: l.unstable_flushSync,
          unstable_viewTransition: l.unstable_viewTransition,
        });
    },
    [e, t, n],
  );
}
function lg(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { basename: r } = v.useContext(wt),
    l = v.useContext(Lt);
  l || $(!1);
  let [i] = l.matches.slice(-1),
    o = _t({}, Cl(e || ".", { relative: n })),
    a = Kt();
  if (e == null) {
    o.search = a.search;
    let u = new URLSearchParams(o.search);
    u.has("index") &&
      u.get("index") === "" &&
      (u.delete("index"), (o.search = u.toString() ? "?" + u.toString() : ""));
  }
  return (
    (!e || e === ".") &&
      i.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (o.pathname = o.pathname === "/" ? r : Pt([r, o.pathname])),
    mn(o)
  );
}
function ig(e) {
  var t;
  let { key: n } = e === void 0 ? {} : e,
    { router: r } = so(gr.UseFetcher),
    l = yh(Wi.UseFetcher),
    i = v.useContext(ph),
    o = v.useContext(Lt),
    a = (t = o.matches[o.matches.length - 1]) == null ? void 0 : t.route.id;
  i || $(!1), o || $(!1), a == null && $(!1);
  let u = jc ? jc() : "",
    [s, d] = v.useState(n || u);
  n && n !== s ? d(n) : s || d(gh()),
    v.useEffect(
      () => (
        r.getFetcher(s),
        () => {
          r.deleteFetcher(s);
        }
      ),
      [r, s],
    );
  let c = v.useCallback(
      (h, p) => {
        a || $(!1), r.fetch(s, a, h, p);
      },
      [s, a, r],
    ),
    f = wh(),
    x = v.useCallback(
      (h, p) => {
        f(h, _t({}, p, { navigate: !1, fetcherKey: s }));
      },
      [s, f],
    ),
    g = v.useMemo(
      () =>
        v.forwardRef((p, S) =>
          v.createElement(
            vh,
            _t({}, p, { navigate: !1, fetcherKey: s, ref: S }),
          ),
        ),
      [s],
    ),
    k = l.fetchers.get(s) || nh,
    _ = i.get(s);
  return v.useMemo(
    () => _t({ Form: g, submit: x, load: c }, k, { data: _ }),
    [g, x, c, k, _],
  );
}
const Uc = "react-router-scroll-positions";
let Zl = {};
function L0(e) {
  let { getKey: t, storageKey: n } = e === void 0 ? {} : e,
    { router: r } = so(gr.UseScrollRestoration),
    { restoreScrollPosition: l, preventScrollReset: i } = yh(
      Wi.UseScrollRestoration,
    ),
    { basename: o } = v.useContext(wt),
    a = Kt(),
    u = ky(),
    s = xy();
  v.useEffect(
    () => (
      (window.history.scrollRestoration = "manual"),
      () => {
        window.history.scrollRestoration = "auto";
      }
    ),
    [],
  ),
    og(
      v.useCallback(() => {
        if (s.state === "idle") {
          let d = (t ? t(a, u) : null) || a.key;
          Zl[d] = window.scrollY;
        }
        try {
          sessionStorage.setItem(n || Uc, JSON.stringify(Zl));
        } catch {}
        window.history.scrollRestoration = "auto";
      }, [n, t, s.state, a, u]),
    ),
    typeof document < "u" &&
      (v.useLayoutEffect(() => {
        try {
          let d = sessionStorage.getItem(n || Uc);
          d && (Zl = JSON.parse(d));
        } catch {}
      }, [n]),
      v.useLayoutEffect(() => {
        let d =
            t && o !== "/"
              ? (f, x) =>
                  t(_t({}, f, { pathname: ct(f.pathname, o) || f.pathname }), x)
              : t,
          c =
            r == null
              ? void 0
              : r.enableScrollRestoration(Zl, () => window.scrollY, d);
        return () => c && c();
      }, [r, o, t]),
      v.useLayoutEffect(() => {
        if (l !== !1) {
          if (typeof l == "number") {
            window.scrollTo(0, l);
            return;
          }
          if (a.hash) {
            let d = document.getElementById(
              decodeURIComponent(a.hash.slice(1)),
            );
            if (d) {
              d.scrollIntoView();
              return;
            }
          }
          i !== !0 && window.scrollTo(0, 0);
        }
      }, [a, l, i]));
}
function og(e, t) {
  let { capture: n } = {};
  v.useEffect(() => {
    let r = n != null ? { capture: n } : void 0;
    return (
      window.addEventListener("pagehide", e, r),
      () => {
        window.removeEventListener("pagehide", e, r);
      }
    );
  }, [e, n]);
}
function ag(e, t) {
  t === void 0 && (t = {});
  let n = v.useContext(hh);
  n == null && $(!1);
  let { basename: r } = so(gr.useViewTransitionState),
    l = Cl(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let i = ct(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = ct(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Ai(l.pathname, o) != null || Ai(l.pathname, i) != null;
}
var ug = -1,
  sg = -2,
  cg = -3,
  dg = -4,
  fg = -5,
  hg = -6,
  pg = -7,
  mg = "B",
  vg = "D",
  Sh = "E",
  yg = "M",
  gg = "N",
  Eh = "P",
  wg = "R",
  Sg = "S",
  Eg = "Y",
  xg = "U",
  kg = "Z",
  xh = class {
    constructor() {
      Ml(this, "promise");
      Ml(this, "resolve");
      Ml(this, "reject");
      this.promise = new Promise((e, t) => {
        (this.resolve = e), (this.reject = t);
      });
    }
  };
function Cg() {
  const e = new TextDecoder();
  let t = "";
  return new TransformStream({
    transform(n, r) {
      const l = e.decode(n, { stream: !0 }),
        i = (t + l).split(`
`);
      t = i.pop() || "";
      for (const o of i) r.enqueue(o);
    },
    flush(n) {
      t && n.enqueue(t);
    },
  });
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Qo =
  typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : void 0;
function Ha(e) {
  const { hydrated: t, values: n } = this;
  if (typeof e == "number") return Ac.call(this, e);
  if (!Array.isArray(e) || !e.length) throw new SyntaxError();
  const r = n.length;
  for (const l of e) n.push(l);
  return (t.length = n.length), Ac.call(this, r);
}
function Ac(e) {
  const { hydrated: t, values: n, deferred: r, plugins: l } = this;
  let i;
  const o = [
    [
      e,
      (u) => {
        i = u;
      },
    ],
  ];
  let a = [];
  for (; o.length > 0; ) {
    const [u, s] = o.pop();
    switch (u) {
      case pg:
        s(void 0);
        continue;
      case fg:
        s(null);
        continue;
      case sg:
        s(NaN);
        continue;
      case hg:
        s(1 / 0);
        continue;
      case cg:
        s(-1 / 0);
        continue;
      case dg:
        s(-0);
        continue;
    }
    if (t[u]) {
      s(t[u]);
      continue;
    }
    const d = n[u];
    if (!d || typeof d != "object") {
      (t[u] = d), s(d);
      continue;
    }
    if (Array.isArray(d))
      if (typeof d[0] == "string") {
        const [c, f, x] = d;
        switch (c) {
          case vg:
            s((t[u] = new Date(f)));
            continue;
          case xg:
            s((t[u] = new URL(f)));
            continue;
          case mg:
            s((t[u] = BigInt(f)));
            continue;
          case wg:
            s((t[u] = new RegExp(f, x)));
            continue;
          case Eg:
            s((t[u] = Symbol.for(f)));
            continue;
          case Sg:
            const g = new Set();
            t[u] = g;
            for (let S = 1; S < d.length; S++)
              o.push([
                d[S],
                (P) => {
                  g.add(P);
                },
              ]);
            s(g);
            continue;
          case yg:
            const k = new Map();
            t[u] = k;
            for (let S = 1; S < d.length; S += 2) {
              const P = [];
              o.push([
                d[S + 1],
                (R) => {
                  P[1] = R;
                },
              ]),
                o.push([
                  d[S],
                  (R) => {
                    P[0] = R;
                  },
                ]),
                a.push(() => {
                  k.set(P[0], P[1]);
                });
            }
            s(k);
            continue;
          case gg:
            const _ = Object.create(null);
            t[u] = _;
            for (const S of Object.keys(f).reverse()) {
              const P = [];
              o.push([
                f[S],
                (R) => {
                  P[1] = R;
                },
              ]),
                o.push([
                  Number(S.slice(1)),
                  (R) => {
                    P[0] = R;
                  },
                ]),
                a.push(() => {
                  _[P[0]] = P[1];
                });
            }
            s(_);
            continue;
          case Eh:
            if (t[f]) s((t[u] = t[f]));
            else {
              const S = new xh();
              (r[f] = S), s((t[u] = S.promise));
            }
            continue;
          case Sh:
            const [, m, h] = d;
            let p = h && Qo && Qo[h] ? new Qo[h](m) : new Error(m);
            (t[u] = p), s(p);
            continue;
          case kg:
            s((t[u] = t[f]));
            continue;
          default:
            if (Array.isArray(l)) {
              const S = [],
                P = d.slice(1);
              for (let R = 0; R < P.length; R++) {
                const T = P[R];
                o.push([
                  T,
                  (y) => {
                    S[R] = y;
                  },
                ]);
              }
              a.push(() => {
                for (const R of l) {
                  const T = R(d[0], ...S);
                  if (T) {
                    s((t[u] = T.value));
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const c = [];
        t[u] = c;
        for (let f = 0; f < d.length; f++) {
          const x = d[f];
          x !== ug &&
            o.push([
              x,
              (g) => {
                c[f] = g;
              },
            ]);
        }
        s(c);
        continue;
      }
    else {
      const c = {};
      t[u] = c;
      for (const f of Object.keys(d).reverse()) {
        const x = [];
        o.push([
          d[f],
          (g) => {
            x[1] = g;
          },
        ]),
          o.push([
            Number(f.slice(1)),
            (g) => {
              x[0] = g;
            },
          ]),
          a.push(() => {
            c[x[0]] = x[1];
          });
      }
      s(c);
      continue;
    }
  }
  for (; a.length > 0; ) a.pop()();
  return i;
}
async function Rg(e, t) {
  const { plugins: n } = t ?? {},
    r = new xh(),
    l = e.pipeThrough(Cg()).getReader(),
    i = { values: [], hydrated: [], deferred: {}, plugins: n },
    o = await Pg.call(i, l);
  let a = r.promise;
  return (
    o.done
      ? r.resolve()
      : (a = _g
          .call(i, l)
          .then(r.resolve)
          .catch((u) => {
            for (const s of Object.values(i.deferred)) s.reject(u);
            r.reject(u);
          })),
    { done: a.then(() => l.closed), value: o.value }
  );
}
async function Pg(e) {
  const t = await e.read();
  if (!t.value) throw new SyntaxError();
  let n;
  try {
    n = JSON.parse(t.value);
  } catch {
    throw new SyntaxError();
  }
  return { done: t.done, value: Ha.call(this, n) };
}
async function _g(e) {
  let t = await e.read();
  for (; !t.done; ) {
    if (!t.value) continue;
    const n = t.value;
    switch (n[0]) {
      case Eh: {
        const r = n.indexOf(":"),
          l = Number(n.slice(1, r)),
          i = this.deferred[l];
        if (!i) throw new Error(`Deferred ID ${l} not found in stream`);
        const o = n.slice(r + 1);
        let a;
        try {
          a = JSON.parse(o);
        } catch {
          throw new SyntaxError();
        }
        const u = Ha.call(this, a);
        i.resolve(u);
        break;
      }
      case Sh: {
        const r = n.indexOf(":"),
          l = Number(n.slice(1, r)),
          i = this.deferred[l];
        if (!i) throw new Error(`Deferred ID ${l} not found in stream`);
        const o = n.slice(r + 1);
        let a;
        try {
          a = JSON.parse(o);
        } catch {
          throw new SyntaxError();
        }
        const u = Ha.call(this, a);
        i.reject(u);
        break;
      }
      default:
        throw new SyntaxError();
    }
    t = await e.read();
  }
}
/**
 * @remix-run/server-runtime v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const kh = Symbol("SingleFetchRedirect");
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Se() {
  return (
    (Se = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Se.apply(this, arguments)
  );
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function In(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ async function Ch(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await import(e.module);
    return (t[e.id] = n), n;
  } catch (n) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(n),
      window.__remixContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Lg(e, t, n) {
  let r = e
      .map((i) => {
        var o;
        let a = t[i.route.id],
          u = n.routes[i.route.id];
        return [
          u.css ? u.css.map((s) => ({ rel: "stylesheet", href: s })) : [],
          (a == null || (o = a.links) === null || o === void 0
            ? void 0
            : o.call(a)) || [],
        ];
      })
      .flat(2),
    l = zg(e, n);
  return Ph(r, l);
}
async function Rh(e, t) {
  var n, r;
  if ((!e.css && !t.links) || !Ig()) return;
  let l = [
    ((n = e.css) === null || n === void 0
      ? void 0
      : n.map((a) => ({ rel: "stylesheet", href: a }))) ?? [],
    ((r = t.links) === null || r === void 0 ? void 0 : r.call(t)) ?? [],
  ].flat(1);
  if (l.length === 0) return;
  let i = [];
  for (let a of l)
    !Wu(a) &&
      a.rel === "stylesheet" &&
      i.push({ ...a, rel: "preload", as: "style" });
  let o = i.filter(
    (a) =>
      (!a.media || window.matchMedia(a.media).matches) &&
      !document.querySelector(`link[rel="stylesheet"][href="${a.href}"]`),
  );
  await Promise.all(o.map(Tg));
}
async function Tg(e) {
  return new Promise((t) => {
    let n = document.createElement("link");
    Object.assign(n, e);
    function r() {
      document.head.contains(n) && document.head.removeChild(n);
    }
    (n.onload = () => {
      r(), t();
    }),
      (n.onerror = () => {
        r(), t();
      }),
      document.head.appendChild(n);
  });
}
function Wu(e) {
  return e != null && typeof e.page == "string";
}
function Ng(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function Dg(e, t, n) {
  let r = await Promise.all(
    e.map(async (l) => {
      let i = await Ch(t.routes[l.route.id], n);
      return i.links ? i.links() : [];
    }),
  );
  return Ph(
    r
      .flat(1)
      .filter(Ng)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" },
      ),
  );
}
function Bc(e, t, n, r, l, i) {
  let o = _h(e),
    a = (d, c) => (n[c] ? d.route.id !== n[c].route.id : !0),
    u = (d, c) => {
      var f;
      return (
        n[c].pathname !== d.pathname ||
        (((f = n[c].route.path) === null || f === void 0
          ? void 0
          : f.endsWith("*")) &&
          n[c].params["*"] !== d.params["*"])
      );
    };
  return i === "data" && l.search !== o.search
    ? t.filter((d, c) => {
        if (!r.routes[d.route.id].hasLoader) return !1;
        if (a(d, c) || u(d, c)) return !0;
        if (d.route.shouldRevalidate) {
          var x;
          let g = d.route.shouldRevalidate({
            currentUrl: new URL(l.pathname + l.search + l.hash, window.origin),
            currentParams:
              ((x = n[0]) === null || x === void 0 ? void 0 : x.params) || {},
            nextUrl: new URL(e, window.origin),
            nextParams: d.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof g == "boolean") return g;
        }
        return !0;
      })
    : t.filter((d, c) => {
        let f = r.routes[d.route.id];
        return (i === "assets" || f.hasLoader) && (a(d, c) || u(d, c));
      });
}
function Og(e, t, n) {
  let r = _h(e);
  return Vu(
    t
      .filter(
        (l) =>
          n.routes[l.route.id].hasLoader &&
          !n.routes[l.route.id].hasClientLoader,
      )
      .map((l) => {
        let { pathname: i, search: o } = r,
          a = new URLSearchParams(o);
        return a.set("_data", l.route.id), `${i}?${a}`;
      }),
  );
}
function Mg(e, t) {
  return Vu(
    e
      .map((n) => {
        let r = t.routes[n.route.id],
          l = [r.module];
        return r.imports && (l = l.concat(r.imports)), l;
      })
      .flat(1),
  );
}
function zg(e, t) {
  return Vu(
    e
      .map((n) => {
        let r = t.routes[n.route.id],
          l = [r.module];
        return r.imports && (l = l.concat(r.imports)), l;
      })
      .flat(1),
  );
}
function Vu(e) {
  return [...new Set(e)];
}
function Fg(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function Ph(e, t) {
  let n = new Set(),
    r = new Set(t);
  return e.reduce((l, i) => {
    if (t && !Wu(i) && i.as === "script" && i.href && r.has(i.href)) return l;
    let a = JSON.stringify(Fg(i));
    return n.has(a) || (n.add(a), l.push({ key: a, link: i })), l;
  }, []);
}
function _h(e) {
  let t = Vt(e);
  return t.search === void 0 && (t.search = ""), t;
}
let ql;
function Ig() {
  if (ql !== void 0) return ql;
  let e = document.createElement("link");
  return (ql = e.relList.supports("preload")), (e = null), ql;
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const jg = {
    "&": "\\u0026",
    ">": "\\u003e",
    "<": "\\u003c",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  },
  Ug = /[&><\u2028\u2029]/g;
function bl(e) {
  return e.replace(Ug, (t) => jg[t]);
}
function $c(e) {
  return { __html: e };
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ag(e) {
  return e.headers.get("X-Remix-Catch") != null;
}
function Bg(e) {
  return e.headers.get("X-Remix-Error") != null;
}
function $g(e) {
  return (
    Ku(e) &&
    e.status >= 400 &&
    e.headers.get("X-Remix-Error") == null &&
    e.headers.get("X-Remix-Catch") == null &&
    e.headers.get("X-Remix-Response") == null
  );
}
function Hg(e) {
  return e.headers.get("X-Remix-Redirect") != null;
}
function Wg(e) {
  var t;
  return !!(
    (t = e.headers.get("Content-Type")) !== null &&
    t !== void 0 &&
    t.match(/text\/remix-deferred/)
  );
}
function Ku(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function Vg(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
async function Lh(e, t, n = 0) {
  let r = new URL(e.url);
  r.searchParams.set("_data", t),
    n > 0 && (await new Promise((a) => setTimeout(a, 5 ** n * 10)));
  let l = await Qu(e),
    i = window.__remixRevalidation,
    o = await fetch(r.href, l).catch((a) => {
      if (
        typeof i == "number" &&
        i === window.__remixRevalidation &&
        (a == null ? void 0 : a.name) === "TypeError" &&
        n < 3
      )
        return Lh(e, t, n + 1);
      throw a;
    });
  if (Bg(o)) {
    let a = await o.json(),
      u = new Error(a.message);
    return (u.stack = a.stack), u;
  }
  if ($g(o)) {
    let a = await o.text(),
      u = new Error(a);
    return (u.stack = void 0), u;
  }
  return o;
}
async function Qu(e) {
  let t = { signal: e.signal };
  if (e.method !== "GET") {
    t.method = e.method;
    let n = e.headers.get("Content-Type");
    n && /\bapplication\/json\b/.test(n)
      ? ((t.headers = { "Content-Type": n }),
        (t.body = JSON.stringify(await e.json())))
      : n && /\btext\/plain\b/.test(n)
        ? ((t.headers = { "Content-Type": n }), (t.body = await e.text()))
        : n && /\bapplication\/x-www-form-urlencoded\b/.test(n)
          ? (t.body = new URLSearchParams(await e.text()))
          : (t.body = await e.formData());
  }
  return t;
}
const Kg = "__deferred_promise:";
async function Qg(e) {
  if (!e)
    throw new Error("parseDeferredReadableStream requires stream argument");
  let t,
    n = {};
  try {
    let r = Yg(e),
      i = (await r.next()).value;
    if (!i) throw new Error("no critical data");
    let o = JSON.parse(i);
    if (typeof o == "object" && o !== null)
      for (let [a, u] of Object.entries(o))
        typeof u != "string" ||
          !u.startsWith(Kg) ||
          ((t = t || {}),
          (t[a] = new Promise((s, d) => {
            n[a] = {
              resolve: (c) => {
                s(c), delete n[a];
              },
              reject: (c) => {
                d(c), delete n[a];
              },
            };
          })));
    return (
      (async () => {
        try {
          for await (let a of r) {
            let [u, ...s] = a.split(":"),
              d = s.join(":"),
              c = JSON.parse(d);
            if (u === "data")
              for (let [f, x] of Object.entries(c)) n[f] && n[f].resolve(x);
            else if (u === "error")
              for (let [f, x] of Object.entries(c)) {
                let g = new Error(x.message);
                (g.stack = x.stack), n[f] && n[f].reject(g);
              }
          }
          for (let [a, u] of Object.entries(n))
            u.reject(new Bi(`Deferred ${a} will never be resolved`));
        } catch (a) {
          for (let u of Object.values(n)) u.reject(a);
        }
      })(),
      new Fv({ ...o, ...t })
    );
  } catch (r) {
    for (let l of Object.values(n)) l.reject(r);
    throw r;
  }
}
async function* Yg(e) {
  let t = e.getReader(),
    n = [],
    r = [],
    l = !1,
    i = new TextEncoder(),
    o = new TextDecoder(),
    a = async () => {
      if (r.length > 0) return r.shift();
      for (; !l && r.length === 0; ) {
        let s = await t.read();
        if (s.done) {
          l = !0;
          break;
        }
        n.push(s.value);
        try {
          let c = o.decode(Hc(...n)).split(`

`);
          if (
            (c.length >= 2 &&
              (r.push(...c.slice(0, -1)),
              (n = [
                i.encode(
                  c.slice(-1).join(`

`),
                ),
              ])),
            r.length > 0)
          )
            break;
        } catch {
          continue;
        }
      }
      return (
        r.length > 0 ||
          (n.length > 0 &&
            ((r = o
              .decode(Hc(...n))
              .split(
                `

`,
              )
              .filter((d) => d)),
            (n = []))),
        r.shift()
      );
    },
    u = await a();
  for (; u; ) yield u, (u = await a());
}
function Hc(...e) {
  let t = new Uint8Array(e.reduce((r, l) => r + l.length, 0)),
    n = 0;
  for (let r of e) t.set(r, n), (n += r.length);
  return t;
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function T0(e, t) {
  return async ({ request: n, matches: r }) =>
    n.method !== "GET" ? Xg(n, r) : Jg(e, t, n, r);
}
function Xg(e, t) {
  return Promise.all(
    t.map(async (n) => {
      let r,
        l = await n.resolve(async (i) => ({
          type: "data",
          result: await i(async () => {
            let a = Yu(e.url),
              u = await Qu(e),
              { data: s, status: d } = await Wa(a, u);
            return (r = d), Va(s, n.route.id);
          }),
        }));
      return Ku(l.result) || Er(l.result)
        ? l
        : { type: l.type, result: zv(l.result, r) };
    }),
  );
}
function Jg(e, t, n, r) {
  let l;
  return Promise.all(
    r.map(async (i) =>
      i.resolve(async (o) => {
        let a,
          u = Gg(Yu(n.url)),
          s = await Qu(n);
        return (
          e.routes[i.route.id].hasClientLoader
            ? (a = await o(async () => {
                u.searchParams.set("_routes", i.route.id);
                let { data: d } = await Wa(u, s);
                return Wc(d, i.route.id);
              }))
            : (a = await o(async () => {
                l ||
                  ((u = Th(
                    e,
                    t,
                    r.map((c) => c.route),
                    r.filter((c) => c.shouldLoad).map((c) => c.route),
                    u,
                  )),
                  (l = Wa(u, s).then(({ data: c }) => c)));
                let d = await l;
                return Wc(d, i.route.id);
              })),
          { type: "data", result: a }
        );
      }),
    ),
  );
}
function Gg(e) {
  let t = e.searchParams.getAll("index");
  e.searchParams.delete("index");
  let n = [];
  for (let r of t) r && n.push(r);
  for (let r of n) e.searchParams.append("index", r);
  return e;
}
function Th(e, t, n, r, l) {
  let i = (s) => s.filter((d) => e.routes[d].hasLoader).join(",");
  if (
    !n.some((s) => {
      var d, c;
      return (
        ((d = t[s.id]) === null || d === void 0
          ? void 0
          : d.shouldRevalidate) ||
        ((c = e.routes[s.id]) === null || c === void 0
          ? void 0
          : c.hasClientLoader)
      );
    })
  )
    return l;
  let a = i(n.map((s) => s.id)),
    u = i(
      r
        .filter((s) => {
          var d;
          return !(
            (d = e.routes[s.id]) !== null &&
            d !== void 0 &&
            d.hasClientLoader
          );
        })
        .map((s) => s.id),
    );
  return a !== u && l.searchParams.set("_routes", u), l;
}
function Yu(e) {
  let t = typeof e == "string" ? new URL(e, window.location.origin) : e;
  return (
    t.pathname === "/"
      ? (t.pathname = "_root.data")
      : (t.pathname = `${t.pathname.replace(/\/$/, "")}.data`),
    t
  );
}
async function Wa(e, t) {
  let n = await fetch(e, t);
  In(n.body, "No response body to decode");
  try {
    let r = await Zg(n.body, window);
    return { status: n.status, data: r.value };
  } catch (r) {
    throw (
      (console.error(r),
      new Error(
        `Unable to decode turbo-stream response from URL: ${e.toString()}`,
      ))
    );
  }
}
function Zg(e, t) {
  return Rg(e, {
    plugins: [
      (n, ...r) => {
        if (n === "SanitizedError") {
          let [l, i, o] = r,
            a = Error;
          l && l in t && typeof t[l] == "function" && (a = t[l]);
          let u = new a(i);
          return (u.stack = o), { value: u };
        }
        if (n === "ErrorResponse") {
          let [l, i, o] = r;
          return { value: new Fn(i, o, l) };
        }
        if (n === "SingleFetchRedirect") return { value: { [kh]: r[0] } };
      },
    ],
  });
}
function Wc(e, t) {
  let n = e[kh];
  return n ? Va(n, t) : e[t] !== void 0 ? Va(e[t], t) : null;
}
function Va(e, t) {
  if ("error" in e) throw e.error;
  if ("redirect" in e) {
    let n = {};
    return (
      e.revalidate && (n["X-Remix-Revalidate"] = "yes"),
      e.reload && (n["X-Remix-Reload-Document"] = "yes"),
      e.replace && (n["X-Remix-Replace"] = "yes"),
      eh(e.redirect, { status: e.status, headers: n })
    );
  } else {
    if ("data" in e) return e.data;
    throw new Error(`No response found for routeId "${t}"`);
  }
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ class N0 extends v.Component {
  constructor(t) {
    super(t), (this.state = { error: t.error || null, location: t.location });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location
      ? { error: t.error || null, location: t.location }
      : { error: t.error || n.error, location: n.location };
  }
  render() {
    return this.state.error
      ? v.createElement(Nh, { error: this.state.error, isOutsideRemixApp: !0 })
      : this.props.children;
  }
}
function Nh({ error: e, isOutsideRemixApp: t }) {
  console.error(e);
  let n = v.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `,
    },
  });
  if (Er(e))
    return v.createElement(
      Ka,
      { title: "Unhandled Thrown Response!" },
      v.createElement(
        "h1",
        { style: { fontSize: "24px" } },
        e.status,
        " ",
        e.statusText,
      ),
      n,
    );
  let r;
  if (e instanceof Error) r = e;
  else {
    let l =
      e == null
        ? "Unknown Error"
        : typeof e == "object" && "toString" in e
          ? e.toString()
          : JSON.stringify(e);
    r = new Error(l);
  }
  return v.createElement(
    Ka,
    { title: "Application Error!", isOutsideRemixApp: t },
    v.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
    v.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto",
        },
      },
      r.stack,
    ),
    n,
  );
}
function Ka({ title: e, renderScripts: t, isOutsideRemixApp: n, children: r }) {
  var l;
  let { routeModules: i } = kr();
  return (l = i.root) !== null && l !== void 0 && l.Layout && !n
    ? r
    : v.createElement(
        "html",
        { lang: "en" },
        v.createElement(
          "head",
          null,
          v.createElement("meta", { charSet: "utf-8" }),
          v.createElement("meta", {
            name: "viewport",
            content: "width=device-width,initial-scale=1,viewport-fit=cover",
          }),
          v.createElement("title", null, e),
        ),
        v.createElement(
          "body",
          null,
          v.createElement(
            "main",
            { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } },
            r,
            t ? v.createElement(y0, null) : null,
          ),
        ),
      );
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function qg() {
  return v.createElement(
    Ka,
    { title: "Loading...", renderScripts: !0 },
    v.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is running \`clientLoader\` functions on hydration. " +
                "Check out https://remix.run/route/hydrate-fallback for more information."
              );
            `,
      },
    }),
  );
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Dh(e) {
  let t = {};
  return (
    Object.values(e).forEach((n) => {
      let r = n.parentId || "";
      t[r] || (t[r] = []), t[r].push(n);
    }),
    t
  );
}
function bg(e, t, n) {
  let r = Oh(t),
    l =
      t.HydrateFallback && (!n || e.id === "root")
        ? t.HydrateFallback
        : e.id === "root"
          ? qg
          : void 0,
    i = t.ErrorBoundary
      ? t.ErrorBoundary
      : e.id === "root"
        ? () => v.createElement(Nh, { error: fh() })
        : void 0;
  return e.id === "root" && t.Layout
    ? {
        ...(r
          ? {
              element: v.createElement(
                t.Layout,
                null,
                v.createElement(r, null),
              ),
            }
          : { Component: r }),
        ...(i
          ? {
              errorElement: v.createElement(
                t.Layout,
                null,
                v.createElement(i, null),
              ),
            }
          : { ErrorBoundary: i }),
        ...(l
          ? {
              hydrateFallbackElement: v.createElement(
                t.Layout,
                null,
                v.createElement(l, null),
              ),
            }
          : { HydrateFallback: l }),
      }
    : { Component: r, ErrorBoundary: i, HydrateFallback: l };
}
function D0(e, t, n, r, l, i) {
  return Xu(t, n, r, l, i, "", Dh(t), e);
}
function ei(e, t, n) {
  if (n) {
    let o = `You cannot call ${e === "action" ? "serverAction()" : "serverLoader()"} in SPA Mode (routeId: "${t.id}")`;
    throw (console.error(o), new Fn(400, "Bad Request", new Error(o), !0));
  }
  let l = `You are trying to call ${e === "action" ? "serverAction()" : "serverLoader()"} on a route that does not have a server ${e} (routeId: "${t.id}")`;
  if ((e === "loader" && !t.hasLoader) || (e === "action" && !t.hasAction))
    throw (console.error(l), new Fn(400, "Bad Request", new Error(l), !0));
}
function Yo(e, t) {
  let n = e === "clientAction" ? "a" : "an",
    r = `Route "${t}" does not have ${n} ${e}, but you are trying to submit to it. To fix this, please add ${n} \`${e}\` function to the route`;
  throw (console.error(r), new Fn(405, "Method Not Allowed", new Error(r), !0));
}
function Xu(e, t, n, r, l, i = "", o = Dh(e), a) {
  return (o[i] || []).map((u) => {
    let s = t[u.id];
    async function d(p, S, P) {
      if (typeof P == "function") return await P();
      let R = await t0(p, u);
      return S ? n0(R) : R;
    }
    function c(p, S, P) {
      return u.hasLoader ? d(p, S, P) : Promise.resolve(null);
    }
    function f(p, S, P) {
      if (!u.hasAction) throw Yo("action", u.id);
      return d(p, S, P);
    }
    async function x(p) {
      let S = t[u.id],
        P = S ? Rh(u, S) : Promise.resolve();
      try {
        return p();
      } finally {
        await P;
      }
    }
    let g = { id: u.id, index: u.index, path: u.path };
    if (s) {
      var k, _, m;
      Object.assign(g, {
        ...g,
        ...bg(u, s, l),
        handle: s.handle,
        shouldRevalidate: a
          ? Vc(u.id, s.shouldRevalidate, a)
          : s.shouldRevalidate,
      });
      let p =
          n == null || (k = n.loaderData) === null || k === void 0
            ? void 0
            : k[u.id],
        S =
          n == null || (_ = n.errors) === null || _ === void 0
            ? void 0
            : _[u.id],
        P =
          a == null &&
          (((m = s.clientLoader) === null || m === void 0
            ? void 0
            : m.hydrate) === !0 ||
            !u.hasLoader);
      (g.loader = async ({ request: R, params: T }, y) => {
        try {
          return await x(
            async () => (
              In(s, "No `routeModule` available for critical-route loader"),
              s.clientLoader
                ? s.clientLoader({
                    request: R,
                    params: T,
                    async serverLoader() {
                      if ((ei("loader", u, l), P)) {
                        if (S !== void 0) throw S;
                        return p;
                      }
                      return c(R, !0, y);
                    },
                  })
                : l
                  ? null
                  : c(R, !1, y)
            ),
          );
        } finally {
          P = !1;
        }
      }),
        (g.loader.hydrate = l0(u, s, l)),
        (g.action = ({ request: R, params: T }, y) =>
          x(async () => {
            if (
              (In(s, "No `routeModule` available for critical-route action"),
              !s.clientAction)
            ) {
              if (l) throw Yo("clientAction", u.id);
              return f(R, !1, y);
            }
            return s.clientAction({
              request: R,
              params: T,
              async serverAction() {
                return ei("action", u, l), f(R, !0, y);
              },
            });
          }));
    } else
      u.hasClientLoader ||
        (g.loader = ({ request: p }, S) =>
          x(() => (l ? Promise.resolve(null) : c(p, !1, S)))),
        u.hasClientAction ||
          (g.action = ({ request: p }, S) =>
            x(() => {
              if (l) throw Yo("clientAction", u.id);
              return f(p, !1, S);
            })),
        (g.lazy = async () => {
          let p = await e0(u, t),
            S = { ...p };
          if (p.clientLoader) {
            let P = p.clientLoader;
            S.loader = (R, T) =>
              P({
                ...R,
                async serverLoader() {
                  return ei("loader", u, l), c(R.request, !0, T);
                },
              });
          }
          if (p.clientAction) {
            let P = p.clientAction;
            S.action = (R, T) =>
              P({
                ...R,
                async serverAction() {
                  return ei("action", u, l), f(R.request, !0, T);
                },
              });
          }
          return (
            a && (S.shouldRevalidate = Vc(u.id, p.shouldRevalidate, a)),
            {
              ...(S.loader ? { loader: S.loader } : {}),
              ...(S.action ? { action: S.action } : {}),
              hasErrorBoundary: S.hasErrorBoundary,
              shouldRevalidate: S.shouldRevalidate,
              handle: S.handle,
              Component: S.Component,
              ErrorBoundary: S.ErrorBoundary,
            }
          );
        });
    let h = Xu(e, t, n, r, l, u.id, o, a);
    return h.length > 0 && (g.children = h), g;
  });
}
function Vc(e, t, n) {
  let r = !1;
  return (l) =>
    r ? (t ? t(l) : l.defaultShouldRevalidate) : ((r = !0), n.has(e));
}
async function e0(e, t) {
  let n = await Ch(e, t);
  return (
    await Rh(e, n),
    {
      Component: Oh(n),
      ErrorBoundary: n.ErrorBoundary,
      clientAction: n.clientAction,
      clientLoader: n.clientLoader,
      handle: n.handle,
      links: n.links,
      meta: n.meta,
      shouldRevalidate: n.shouldRevalidate,
    }
  );
}
async function t0(e, t) {
  let n = await Lh(e, t.id);
  if (n instanceof Error) throw n;
  if (Hg(n)) throw r0(n);
  if (Ag(n)) throw n;
  return Wg(n) && n.body ? await Qg(n.body) : n;
}
function n0(e) {
  if (Vg(e)) return e.data;
  if (Ku(e)) {
    let t = e.headers.get("Content-Type");
    return t && /\bapplication\/json\b/.test(t) ? e.json() : e.text();
  }
  return e;
}
function r0(e) {
  let t = parseInt(e.headers.get("X-Remix-Status"), 10) || 302,
    n = e.headers.get("X-Remix-Redirect"),
    r = {},
    l = e.headers.get("X-Remix-Revalidate");
  l && (r["X-Remix-Revalidate"] = l);
  let i = e.headers.get("X-Remix-Reload-Document");
  i && (r["X-Remix-Reload-Document"] = i);
  let o = e.headers.get("X-Remix-Replace");
  return o && (r["X-Remix-Replace"] = o), eh(n, { status: t, headers: r });
}
function Oh(e) {
  if (e.default == null) return;
  if (!(typeof e.default == "object" && Object.keys(e.default).length === 0))
    return e.default;
}
function l0(e, t, n) {
  return (
    (n && e.id !== "root") ||
    (t.clientLoader != null &&
      (t.clientLoader.hydrate === !0 || e.hasLoader !== !0))
  );
}
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const hi = new Set(),
  i0 = 1e3,
  Vi = new Set(),
  o0 = 7680;
function Ju(e, t) {
  return e.unstable_lazyRouteDiscovery === !0 && !t;
}
function a0(e, t) {
  let n = new Set(t.state.matches.map((o) => o.route.id)),
    r = t.state.location.pathname.split("/").filter(Boolean),
    l = ["/"];
  for (r.pop(); r.length > 0; ) l.push(`/${r.join("/")}`), r.pop();
  l.forEach((o) => {
    let a = zt(t.routes, o, t.basename);
    a && a.forEach((u) => n.add(u.route.id));
  });
  let i = [...n].reduce((o, a) => Object.assign(o, { [a]: e.routes[a] }), {});
  return { ...e, routes: i };
}
function O0(e, t, n, r, l) {
  if (Ju(n, r))
    return async ({ path: i, patch: o }) => {
      Vi.has(i) || (await Mh([i], e, t, n, r, l, o));
    };
}
function M0(e, t, n, r, l) {
  v.useEffect(() => {
    var i;
    if (
      !Ju(r, l) ||
      ((i = navigator.connection) === null || i === void 0
        ? void 0
        : i.saveData) === !0
    )
      return;
    function o(c) {
      let f =
        c.tagName === "FORM"
          ? c.getAttribute("action")
          : c.getAttribute("href");
      if (!f) return;
      let x = new URL(f, window.location.origin);
      Vi.has(x.pathname) || hi.add(x.pathname);
    }
    async function a() {
      let c = Array.from(hi.keys()).filter((f) =>
        Vi.has(f) ? (hi.delete(f), !1) : !0,
      );
      if (c.length !== 0)
        try {
          await Mh(c, t, n, r, l, e.basename, e.patchRoutes);
        } catch (f) {
          console.error("Failed to fetch manifest patches", f);
        }
    }
    document.body
      .querySelectorAll("a[data-discover], form[data-discover]")
      .forEach((c) => o(c)),
      a();
    let u = s0(a, 100);
    function s(c) {
      return c.nodeType === Node.ELEMENT_NODE;
    }
    let d = new MutationObserver((c) => {
      let f = new Set();
      c.forEach((x) => {
        [x.target, ...x.addedNodes].forEach((g) => {
          s(g) &&
            (((g.tagName === "A" && g.getAttribute("data-discover")) ||
              (g.tagName === "FORM" && g.getAttribute("data-discover"))) &&
              f.add(g),
            g.tagName !== "A" &&
              g
                .querySelectorAll("a[data-discover], form[data-discover]")
                .forEach((k) => f.add(k)));
        });
      }),
        f.forEach((x) => o(x)),
        u();
    });
    return (
      d.observe(document.documentElement, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeFilter: ["data-discover", "href", "action"],
      }),
      () => d.disconnect()
    );
  }, [r, l, t, n, e]);
}
async function Mh(e, t, n, r, l, i, o) {
  let a = `${i ?? "/"}/__manifest`.replace(/\/+/g, "/"),
    u = new URL(a, window.location.origin);
  if (
    (u.searchParams.set("version", t.version),
    e.forEach((g) => u.searchParams.append("p", g)),
    u.toString().length > o0)
  ) {
    hi.clear();
    return;
  }
  let s = await fetch(u);
  if (s.ok) {
    if (s.status >= 400) throw new Error(await s.text());
  } else throw new Error(`${s.status} ${s.statusText}`);
  let d = await s.json(),
    c = new Set(Object.keys(t.routes)),
    f = Object.values(d).reduce(
      (g, k) => (c.has(k.id) ? g : Object.assign(g, { [k.id]: k })),
      {},
    );
  Object.assign(t.routes, f), e.forEach((g) => u0(g, Vi));
  let x = new Set();
  Object.values(f).forEach((g) => {
    (!g.parentId || !f[g.parentId]) && x.add(g.parentId);
  }),
    x.forEach((g) => o(g || null, Xu(f, n, null, r, l, g)));
}
function u0(e, t) {
  if (t.size >= i0) {
    let n = t.values().next().value;
    t.delete(n);
  }
  t.add(e);
}
function s0(e, t) {
  let n;
  return (...r) => {
    window.clearTimeout(n), (n = window.setTimeout(() => e(...r), t));
  };
}
function zh() {
  let e = v.useContext(xr);
  return (
    In(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function co() {
  let e = v.useContext(xl);
  return (
    In(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
const Fh = v.createContext(void 0);
Fh.displayName = "Remix";
function kr() {
  let e = v.useContext(Fh);
  return In(e, "You must render this element inside a <Remix> element"), e;
}
function Ih(e, t) {
  let [n, r] = v.useState(!1),
    [l, i] = v.useState(!1),
    {
      onFocus: o,
      onBlur: a,
      onMouseEnter: u,
      onMouseLeave: s,
      onTouchStart: d,
    } = t,
    c = v.useRef(null);
  v.useEffect(() => {
    if ((e === "render" && i(!0), e === "viewport")) {
      let g = (_) => {
          _.forEach((m) => {
            i(m.isIntersecting);
          });
        },
        k = new IntersectionObserver(g, { threshold: 0.5 });
      return (
        c.current && k.observe(c.current),
        () => {
          k.disconnect();
        }
      );
    }
  }, [e]);
  let f = () => {
      e === "intent" && r(!0);
    },
    x = () => {
      e === "intent" && (r(!1), i(!1));
    };
  return (
    v.useEffect(() => {
      if (n) {
        let g = setTimeout(() => {
          i(!0);
        }, 100);
        return () => {
          clearTimeout(g);
        };
      }
    }, [n]),
    [
      l,
      c,
      {
        onFocus: Ur(o, f),
        onBlur: Ur(a, x),
        onMouseEnter: Ur(u, f),
        onMouseLeave: Ur(s, x),
        onTouchStart: Ur(d, f),
      },
    ]
  );
}
const Gu = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Zu(e, t, n) {
  return e === "render" && !t && !n ? "true" : void 0;
}
let c0 = v.forwardRef(
  ({ to: e, prefetch: t = "none", discover: n = "render", ...r }, l) => {
    let i = typeof e == "string" && Gu.test(e),
      o = $u(e),
      [a, u, s] = Ih(t, r);
    return v.createElement(
      v.Fragment,
      null,
      v.createElement(
        eg,
        Se({}, r, s, {
          ref: jh(l, u),
          to: e,
          "data-discover": Zu(n, i, r.reloadDocument),
        }),
      ),
      a && !i ? v.createElement(bu, { page: o }) : null,
    );
  },
);
c0.displayName = "NavLink";
let d0 = v.forwardRef(
  ({ to: e, prefetch: t = "none", discover: n = "render", ...r }, l) => {
    let i = typeof e == "string" && Gu.test(e),
      o = $u(e),
      [a, u, s] = Ih(t, r);
    return v.createElement(
      v.Fragment,
      null,
      v.createElement(
        mh,
        Se({}, r, s, {
          ref: jh(l, u),
          to: e,
          "data-discover": Zu(n, i, r.reloadDocument),
        }),
      ),
      a && !i ? v.createElement(bu, { page: o }) : null,
    );
  },
);
d0.displayName = "Link";
let f0 = v.forwardRef(({ discover: e = "render", ...t }, n) => {
  let r = typeof t.action == "string" && Gu.test(t.action);
  return v.createElement(
    vh,
    Se({}, t, { ref: n, "data-discover": Zu(e, r, t.reloadDocument) }),
  );
});
f0.displayName = "Form";
function Ur(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function qu(e, t, n) {
  if (n && !pi) return [e[0]];
  if (t) {
    let r = e.findIndex((l) => t[l.route.id] !== void 0);
    return e.slice(0, r + 1);
  }
  return e;
}
function z0() {
  let { isSpaMode: e, manifest: t, routeModules: n, criticalCss: r } = kr(),
    { errors: l, matches: i } = co(),
    o = qu(i, l, e),
    a = v.useMemo(() => Lg(o, n, t), [o, n, t]);
  return v.createElement(
    v.Fragment,
    null,
    r
      ? v.createElement("style", { dangerouslySetInnerHTML: { __html: r } })
      : null,
    a.map(({ key: u, link: s }) =>
      Wu(s)
        ? v.createElement(bu, Se({ key: u }, s))
        : v.createElement("link", Se({ key: u }, s)),
    ),
  );
}
function bu({ page: e, ...t }) {
  let { router: n } = zh(),
    r = v.useMemo(() => zt(n.routes, e, n.basename), [n.routes, e, n.basename]);
  return r
    ? v.createElement(p0, Se({ page: e, matches: r }, t))
    : (console.warn(`Tried to prefetch ${e} but no routes matched.`), null);
}
function h0(e) {
  let { manifest: t, routeModules: n } = kr(),
    [r, l] = v.useState([]);
  return (
    v.useEffect(() => {
      let i = !1;
      return (
        Dg(e, t, n).then((o) => {
          i || l(o);
        }),
        () => {
          i = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function p0({ page: e, matches: t, ...n }) {
  let r = Kt(),
    { future: l, manifest: i, routeModules: o } = kr(),
    { matches: a } = co(),
    u = v.useMemo(() => Bc(e, t, a, i, r, "data"), [e, t, a, i, r]),
    s = v.useMemo(() => Bc(e, t, a, i, r, "assets"), [e, t, a, i, r]),
    d = v.useMemo(() => Og(e, u, i), [u, e, i]),
    c = v.useMemo(() => Mg(s, i), [s, i]),
    f = h0(s),
    x = null;
  if (!l.unstable_singleFetch)
    x = d.map((g) =>
      v.createElement(
        "link",
        Se({ key: g, rel: "prefetch", as: "fetch", href: g }, n),
      ),
    );
  else if (u.length > 0) {
    let g = Th(
      i,
      o,
      t.map((k) => k.route),
      u.map((k) => k.route),
      Yu(e),
    );
    g.searchParams.get("_routes") !== "" &&
      (x = v.createElement(
        "link",
        Se(
          {
            key: g.pathname + g.search,
            rel: "prefetch",
            as: "fetch",
            href: g.pathname + g.search,
          },
          n,
        ),
      ));
  }
  return v.createElement(
    v.Fragment,
    null,
    x,
    c.map((g) =>
      v.createElement("link", Se({ key: g, rel: "modulepreload", href: g }, n)),
    ),
    f.map(({ key: g, link: k }) => v.createElement("link", Se({ key: g }, k))),
  );
}
function F0() {
  let { isSpaMode: e, routeModules: t } = kr(),
    { errors: n, matches: r, loaderData: l } = co(),
    i = Kt(),
    o = qu(r, n, e),
    a = null;
  n && (a = n[o[o.length - 1].route.id]);
  let u = [],
    s = null,
    d = [];
  for (let c = 0; c < o.length; c++) {
    let f = o[c],
      x = f.route.id,
      g = l[x],
      k = f.params,
      _ = t[x],
      m = [],
      h = {
        id: x,
        data: g,
        meta: [],
        params: f.params,
        pathname: f.pathname,
        handle: f.route.handle,
        error: a,
      };
    if (
      ((d[c] = h),
      _ != null && _.meta
        ? (m =
            typeof _.meta == "function"
              ? _.meta({
                  data: g,
                  params: k,
                  location: i,
                  matches: d,
                  error: a,
                })
              : Array.isArray(_.meta)
                ? [..._.meta]
                : _.meta)
        : s && (m = [...s]),
      (m = m || []),
      !Array.isArray(m))
    )
      throw new Error(
        "The route at " +
          f.route.path +
          ` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`,
      );
    (h.meta = m), (d[c] = h), (u = [...m]), (s = u);
  }
  return v.createElement(
    v.Fragment,
    null,
    u.flat().map((c) => {
      if (!c) return null;
      if ("tagName" in c) {
        let { tagName: f, ...x } = c;
        if (!m0(f))
          return (
            console.warn(
              `A meta object uses an invalid tagName: ${f}. Expected either 'link' or 'meta'`,
            ),
            null
          );
        let g = f;
        return v.createElement(g, Se({ key: JSON.stringify(x) }, x));
      }
      if ("title" in c)
        return v.createElement("title", { key: "title" }, String(c.title));
      if (
        ("charset" in c &&
          (c.charSet ?? (c.charSet = c.charset), delete c.charset),
        "charSet" in c && c.charSet != null)
      )
        return typeof c.charSet == "string"
          ? v.createElement("meta", { key: "charSet", charSet: c.charSet })
          : null;
      if ("script:ld+json" in c)
        try {
          let f = JSON.stringify(c["script:ld+json"]);
          return v.createElement("script", {
            key: `script:ld+json:${f}`,
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: f },
          });
        } catch {
          return null;
        }
      return v.createElement("meta", Se({ key: JSON.stringify(c) }, c));
    }),
  );
}
function m0(e) {
  return typeof e == "string" && /^(meta|link)$/.test(e);
}
function v0(e) {
  return v.createElement(Ty, e);
}
let pi = !1;
function y0(e) {
  let {
      manifest: t,
      serverHandoffString: n,
      abortDelay: r,
      serializeError: l,
      isSpaMode: i,
      future: o,
      renderMeta: a,
    } = kr(),
    { router: u, static: s, staticContext: d } = zh(),
    { matches: c } = co(),
    f = Ju(o, i);
  a && (a.didRenderScripts = !0);
  let x = qu(c, null, i);
  v.useEffect(() => {
    pi = !0;
  }, []);
  let g = (R, T) => {
      let y;
      return (
        l && T instanceof Error ? (y = l(T)) : (y = T),
        `${JSON.stringify(R)}:__remixContext.p(!1, ${bl(JSON.stringify(y))})`
      );
    },
    k = (R, T, y) => {
      let M;
      try {
        M = JSON.stringify(y);
      } catch (O) {
        return g(T, O);
      }
      return `${JSON.stringify(T)}:__remixContext.p(${bl(M)})`;
    },
    _ = (R, T, y) => {
      let M;
      return (
        l && y instanceof Error ? (M = l(y)) : (M = y),
        `__remixContext.r(${JSON.stringify(R)}, ${JSON.stringify(T)}, !1, ${bl(JSON.stringify(M))})`
      );
    },
    m = (R, T, y) => {
      let M;
      try {
        M = JSON.stringify(y);
      } catch (O) {
        return _(R, T, O);
      }
      return `__remixContext.r(${JSON.stringify(R)}, ${JSON.stringify(T)}, ${bl(M)})`;
    },
    h = [],
    p = v.useMemo(() => {
      var R;
      let T = o.unstable_singleFetch
          ? "window.__remixContext.stream = new ReadableStream({start(controller){window.__remixContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());"
          : "",
        y = d ? `window.__remixContext = ${n};${T}` : " ",
        M = o.unstable_singleFetch || d == null ? void 0 : d.activeDeferreds;
      y += M
        ? [
            "__remixContext.p = function(v,e,p,x) {",
            "  if (typeof e !== 'undefined') {",
            `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`,
            "    p=Promise.reject(x);",
            "  } else {",
            "    p=Promise.resolve(v);",
            "  }",
            "  return p;",
            "};",
            "__remixContext.n = function(i,k) {",
            "  __remixContext.t = __remixContext.t || {};",
            "  __remixContext.t[i] = __remixContext.t[i] || {};",
            "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});",
            typeof r == "number"
              ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${r});`
              : "",
            "  return p;",
            "};",
            "__remixContext.r = function(i,k,v,e,p,x) {",
            "  p = __remixContext.t[i][k];",
            "  if (typeof e !== 'undefined') {",
            `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`,
            "    p.e(x);",
            "  } else {",
            "    p.r(v);",
            "  }",
            "};",
          ].join(`
`) +
          Object.entries(M).map(([A, Y]) => {
            let he = new Set(Y.pendingKeys),
              oe = Y.deferredKeys.map((Ee) => {
                if (he.has(Ee))
                  return (
                    h.push(
                      v.createElement(Kc, {
                        key: `${A} | ${Ee}`,
                        deferredData: Y,
                        routeId: A,
                        dataKey: Ee,
                        scriptProps: e,
                        serializeData: m,
                        serializeError: _,
                      }),
                    ),
                    `${JSON.stringify(Ee)}:__remixContext.n(${JSON.stringify(A)}, ${JSON.stringify(Ee)})`
                  );
                {
                  let Fe = Y.data[Ee];
                  return typeof Fe._error < "u"
                    ? g(Ee, Fe._error)
                    : k(A, Ee, Fe._data);
                }
              }).join(`,
`);
            return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(A)}], {${oe}});`;
          }).join(`
`) +
          (h.length > 0 ? `__remixContext.a=${h.length};` : "")
        : "";
      let O = s
        ? `${(R = t.hmr) !== null && R !== void 0 && R.runtime ? `import ${JSON.stringify(t.hmr.runtime)};` : ""}${f ? "" : `import ${JSON.stringify(t.url)}`};
${x.map(
  (A, Y) =>
    `import * as route${Y} from ${JSON.stringify(t.routes[A.route.id].module)};`,
).join(`
`)}
${f ? `window.__remixManifest = ${JSON.stringify(a0(t, u), null, 2)};` : ""}
window.__remixRouteModules = {${x.map((A, Y) => `${JSON.stringify(A.route.id)}:route${Y}`).join(",")}};

import(${JSON.stringify(t.entry.module)});`
        : " ";
      return v.createElement(
        v.Fragment,
        null,
        v.createElement(
          "script",
          Se({}, e, {
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: $c(y),
            type: void 0,
          }),
        ),
        v.createElement(
          "script",
          Se({}, e, {
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: $c(O),
            type: "module",
            async: !0,
          }),
        ),
      );
    }, []);
  if (!s && typeof __remixContext == "object" && __remixContext.a)
    for (let R = 0; R < __remixContext.a; R++)
      h.push(
        v.createElement(Kc, {
          key: R,
          scriptProps: e,
          serializeData: m,
          serializeError: _,
        }),
      );
  let S = x
      .map((R) => {
        let T = t.routes[R.route.id];
        return (T.imports || []).concat([T.module]);
      })
      .flat(1),
    P = pi ? [] : t.entry.imports.concat(S);
  return pi
    ? null
    : v.createElement(
        v.Fragment,
        null,
        f
          ? null
          : v.createElement("link", {
              rel: "modulepreload",
              href: t.url,
              crossOrigin: e.crossOrigin,
            }),
        v.createElement("link", {
          rel: "modulepreload",
          href: t.entry.module,
          crossOrigin: e.crossOrigin,
        }),
        w0(P).map((R) =>
          v.createElement("link", {
            key: R,
            rel: "modulepreload",
            href: R,
            crossOrigin: e.crossOrigin,
          }),
        ),
        p,
        h,
      );
}
function Kc({
  dataKey: e,
  deferredData: t,
  routeId: n,
  scriptProps: r,
  serializeData: l,
  serializeError: i,
}) {
  return (
    typeof document > "u" &&
      t &&
      e &&
      n &&
      In(
        t.pendingKeys.includes(e),
        `Deferred data for route ${n} with key ${e} was not pending but tried to render a script for it.`,
      ),
    v.createElement(
      v.Suspense,
      {
        fallback:
          typeof document > "u" && t && e && n
            ? null
            : v.createElement(
                "script",
                Se({}, r, {
                  async: !0,
                  suppressHydrationWarning: !0,
                  dangerouslySetInnerHTML: { __html: " " },
                }),
              ),
      },
      typeof document > "u" && t && e && n
        ? v.createElement(v0, {
            resolve: t.data[e],
            errorElement: v.createElement(g0, {
              dataKey: e,
              routeId: n,
              scriptProps: r,
              serializeError: i,
            }),
            children: (o) =>
              v.createElement(
                "script",
                Se({}, r, {
                  async: !0,
                  suppressHydrationWarning: !0,
                  dangerouslySetInnerHTML: { __html: l(n, e, o) },
                }),
              ),
          })
        : v.createElement(
            "script",
            Se({}, r, {
              async: !0,
              suppressHydrationWarning: !0,
              dangerouslySetInnerHTML: { __html: " " },
            }),
          ),
    )
  );
}
function g0({ dataKey: e, routeId: t, scriptProps: n, serializeError: r }) {
  let l = Py();
  return v.createElement(
    "script",
    Se({}, n, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: { __html: r(t, e, l) },
    }),
  );
}
function w0(e) {
  return [...new Set(e)];
}
function I0() {
  return Cy();
}
function j0(e = {}) {
  return ig(e);
}
function jh(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
export {
  Fn as E,
  f0 as F,
  z0 as L,
  F0 as M,
  c0 as N,
  C0 as O,
  Fh as R,
  y0 as S,
  Se as _,
  sy as a,
  j0 as b,
  D0 as c,
  Zg as d,
  Xu as e,
  k0 as f,
  x0 as g,
  R0 as h,
  In as i,
  T0 as j,
  O0 as k,
  M0 as l,
  zt as m,
  N0 as n,
  _0 as o,
  kr as p,
  Kt as q,
  Jf as r,
  l0 as s,
  ky as t,
  I0 as u,
  L0 as v,
  xy as w,
  wh as x,
};
