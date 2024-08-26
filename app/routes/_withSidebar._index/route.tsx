import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div id="index-page">
      This is a demo for Remix.
      <br />
      <ul>
        {LINKS.map((link) => {
          return (
            <li key={link}>
              <Link to={`/${link}`}>{link.toUpperCase()}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const LINKS = ["memos", "breadcrumbs", "search-params"];
