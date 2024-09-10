import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const brands = url.searchParams.getAll("brand");
  return json({ brands });
};

export default function SearchParams() {
  const data = useLoaderData<typeof loader>();
  const brands = data.brands;
  const submit = useSubmit();
  return (
    <Form method="get">
      <p>
        <label htmlFor="nike">Nike</label>
        <input
          type="checkbox"
          id="nike"
          name="brand"
          value="nike"
          onChange={(e) => submit(e.currentTarget.form)}
          checked={brands.includes("nike")}
        />
        <Link to="?brand=nike">Nike (only)</Link>
      </p>
      <label htmlFor="adidas">Adidas</label>
      <input
        type="checkbox"
        id="adidas"
        name="brand"
        value="adidas"
        defaultChecked={brands.includes("adidas")}
      />
      <button type="submit">Update</button>
    </Form>
  );
}
