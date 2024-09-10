import { Link } from "@remix-run/react";

export default function BreadcrumbsChildren() {
  return <Link to="/breadcrumbs">To Breadcrumbs</Link>;
}

export const handle = {
  breadcrumb: () => <Link to="/breadcrumbs">To Breadcrumbs</Link>,
};
