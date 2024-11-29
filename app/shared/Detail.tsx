import { HTMLAttributes } from "react";

// NOTE: https://remix.run/docs/en/main/file-conventions/routes#scaling
export default function Detail(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} id="detail" />;
}
