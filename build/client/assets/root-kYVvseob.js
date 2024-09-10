import { r as d, j as e } from "./jsx-runtime-56DGgGmo.js";
import {
  p as x,
  q as j,
  t as f,
  v as y,
  _ as g,
  u as S,
  w,
  x as v,
  M as N,
  L,
  F as u,
  N as b,
  O as k,
  S as M,
} from "./components-Cpg49eKb.js";
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ let m = "positions";
function q({ getKey: i, ...r }) {
  let { isSpaMode: n } = x(),
    l = j(),
    a = f();
  y({ getKey: i, storageKey: m });
  let s = d.useMemo(() => {
    if (!i) return null;
    let t = i(l, a);
    return t !== l.key ? t : null;
  }, []);
  if (n) return null;
  let o = ((t, p) => {
    if (!window.history.state || !window.history.state.key) {
      let c = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: c }, "");
    }
    try {
      let h = JSON.parse(sessionStorage.getItem(t) || "{}")[
        p || window.history.state.key
      ];
      typeof h == "number" && window.scrollTo(0, h);
    } catch (c) {
      console.error(c), sessionStorage.removeItem(t);
    }
  }).toString();
  return d.createElement(
    "script",
    g({}, r, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: `(${o})(${JSON.stringify(m)}, ${JSON.stringify(s)})`,
      },
    }),
  );
}
const E = "/assets/app-yLuYGH5p.css",
  H = () => [{ rel: "stylesheet", href: E }];
function I() {
  const { contacts: i, q: r } = S(),
    n = w(),
    l = v(),
    a = n.location && new URLSearchParams(n.location.search).has("q");
  return (
    d.useEffect(() => {
      const s = document.getElementById("q");
      console.log("history", history),
        s instanceof HTMLInputElement && (s.value = r || "");
    }, [r]),
    e.jsxs("html", {
      lang: "en",
      children: [
        e.jsxs("head", {
          children: [
            e.jsx("meta", { charSet: "utf-8" }),
            e.jsx("meta", {
              name: "viewport",
              content: "width=device-width, initial-scale=1",
            }),
            e.jsx(N, {}),
            e.jsx(L, {}),
          ],
        }),
        e.jsxs("body", {
          children: [
            e.jsxs("div", {
              id: "sidebar",
              children: [
                e.jsx("h1", { children: "Remix Contacts" }),
                e.jsxs("div", {
                  children: [
                    e.jsxs(u, {
                      id: "search-form",
                      onChange: (s) => {
                        const o = r === null;
                        l(s.currentTarget, { replace: !o });
                      },
                      role: "search",
                      children: [
                        e.jsx("input", {
                          id: "q",
                          "aria-label": "Search contacts",
                          className: a ? "loading" : "",
                          defaultValue: r || "",
                          placeholder: "Search",
                          type: "search",
                          name: "q",
                        }),
                        e.jsx("div", {
                          id: "search-spinner",
                          "aria-hidden": !0,
                          hidden: !a,
                        }),
                      ],
                    }),
                    e.jsx(u, {
                      method: "post",
                      children: e.jsx("button", {
                        type: "submit",
                        children: "New",
                      }),
                    }),
                  ],
                }),
                e.jsx("nav", {
                  children: i.length
                    ? e.jsx("ul", {
                        children: i.map((s) =>
                          e.jsx(
                            "li",
                            {
                              children: e.jsxs(b, {
                                className: ({ isActive: o, isPending: t }) =>
                                  o ? "active" : t ? "pending" : "",
                                to: `contacts/${s.id}`,
                                children: [
                                  s.first || s.last
                                    ? e.jsxs(e.Fragment, {
                                        children: [s.first, " ", s.last],
                                      })
                                    : e.jsx("i", { children: "No Name" }),
                                  " ",
                                  s.favorite
                                    ? e.jsx("span", { children: "★" })
                                    : null,
                                ],
                              }),
                            },
                            s.id,
                          ),
                        ),
                      })
                    : e.jsx("p", {
                        children: e.jsx("i", { children: "No contacts" }),
                      }),
                }),
              ],
            }),
            e.jsx("div", {
              id: "detail",
              className: n.state === "loading" && !a ? "loading" : "",
              children: e.jsx(k, {}),
            }),
            e.jsx(q, {}),
            e.jsx(M, {}),
          ],
        }),
      ],
    })
  );
}
export { I as default, H as links };
