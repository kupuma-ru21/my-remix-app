import { Outlet, useNavigation } from "@remix-run/react";
import appStylesHref from "../../app.css?url";
import Detail from "~/shared/Detail";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

// NOTE: https://remix.run/docs/en/main/file-conventions/routes#nested-layouts-without-nested-urls
export default function WithoutSidebar() {
  const navigation = useNavigation();
  return (
    <Detail className={navigation.state === "loading" ? "loading" : ""}>
      <Outlet />
    </Detail>
  );
}
