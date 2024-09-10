import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";

export function Layout({ children }: { children: React.ReactNode }) {
  // NOTE: Layout shouldn't include useLoaderData (https://remix.run/docs/en/main/file-conventions/root#layout-export)
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const matches = useMatches();
  return (
    <>
      <header>
        <ol>
          {matches
            .filter((match) => match.handle && match.handle.breadcrumb)
            .map((match, index) => (
              <li key={index}>{match.handle.breadcrumb()}</li>
            ))}
        </ol>
      </header>
      <Outlet />
    </>
  );
}
