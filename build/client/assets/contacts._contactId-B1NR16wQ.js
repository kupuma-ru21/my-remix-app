import { j as t } from "./jsx-runtime-56DGgGmo.js";
import { u as o, F as i, b as a } from "./components-Cpg49eKb.js";
function d() {
  const { contact: e } = o();
  return t.jsxs("div", {
    id: "contact",
    children: [
      t.jsx("div", {
        children: t.jsx(
          "img",
          { alt: `${e.first} ${e.last} avatar`, src: e.avatar },
          e.avatar,
        ),
      }),
      t.jsxs("div", {
        children: [
          t.jsxs("h1", {
            children: [
              e.first || e.last
                ? t.jsxs(t.Fragment, { children: [e.first, " ", e.last] })
                : t.jsx("i", { children: "No Name" }),
              " ",
              t.jsx(n, { contact: e }),
            ],
          }),
          e.twitter
            ? t.jsx("p", {
                children: t.jsx("a", {
                  href: `https://twitter.com/${e.twitter}`,
                  children: e.twitter,
                }),
              })
            : null,
          e.notes ? t.jsx("p", { children: e.notes }) : null,
          t.jsxs("div", {
            children: [
              t.jsx(i, {
                action: "edit",
                children: t.jsx("button", { type: "submit", children: "Edit" }),
              }),
              t.jsx(i, {
                action: "destroy",
                method: "post",
                onSubmit: (r) => {
                  confirm("Please confirm you want to delete this record.") ||
                    r.preventDefault();
                },
                children: t.jsx("button", {
                  type: "submit",
                  children: "Delete",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const n = ({ contact: e }) => {
  const r = a(),
    s = r.formData ? r.formData.get("favorite") === "true" : e.favorite;
  return t.jsx(r.Form, {
    method: "post",
    children: t.jsx("button", {
      "aria-label": s ? "Remove from favorites" : "Add to favorites",
      name: "favorite",
      value: s ? "false" : "true",
      children: s ? "★" : "☆",
    }),
  });
};
export { d as default };
