import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div id="index-page">
      This is a demo for Remix.
      <br />
      <ul>
        <li>
          <Link to="/memos">Memos</Link>
        </li>
        <li>
          <Link to="/breadcrumbs">Breadcrumbs</Link>
        </li>
      </ul>
    </div>
  );
}
