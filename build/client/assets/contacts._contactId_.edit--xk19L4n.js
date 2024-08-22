import { j as t } from "./jsx-runtime-56DGgGmo.js";
import { u as s, a as l, F as n } from "./components-Cpg49eKb.js";
function o() {
  const { contact: a } = s(),
    e = l();
  return t.jsxs(
    n,
    {
      id: "contact-form",
      method: "post",
      children: [
        t.jsxs("p", {
          children: [
            t.jsx("span", { children: "Name" }),
            t.jsx("input", {
              defaultValue: a.first,
              "aria-label": "First name",
              name: "first",
              type: "text",
              placeholder: "First",
            }),
            t.jsx("input", {
              "aria-label": "Last name",
              defaultValue: a.last,
              name: "last",
              placeholder: "Last",
              type: "text",
            }),
          ],
        }),
        t.jsxs("label", {
          children: [
            t.jsx("span", { children: "Twitter" }),
            t.jsx("input", {
              defaultValue: a.twitter,
              name: "twitter",
              placeholder: "@jack",
              type: "text",
            }),
          ],
        }),
        t.jsxs("label", {
          children: [
            t.jsx("span", { children: "Avatar URL" }),
            t.jsx("input", {
              "aria-label": "Avatar URL",
              defaultValue: a.avatar,
              name: "avatar",
              placeholder: "https://example.com/avatar.jpg",
              type: "text",
            }),
          ],
        }),
        t.jsxs("label", {
          children: [
            t.jsx("span", { children: "Notes" }),
            t.jsx("textarea", {
              defaultValue: a.notes,
              name: "notes",
              rows: 6,
            }),
          ],
        }),
        t.jsxs("p", {
          children: [
            t.jsx("button", { type: "submit", children: "Save" }),
            t.jsx("button", {
              onClick: () => e(-1),
              type: "button",
              children: "Cancel",
            }),
          ],
        }),
      ],
    },
    a.id,
  );
}
export { o as default };
