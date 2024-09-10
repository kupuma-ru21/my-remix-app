import { Link } from "@remix-run/react";

export default function Breadcrumbs() {
  return <Link to="/breadcrumbs/children">To Breadcrumbs Children</Link>;
}

export const handle = {
  breadcrumb: () => (
    <Link to="/breadcrumbs/children">To Breadcrumbs Children</Link>
  ),
};
