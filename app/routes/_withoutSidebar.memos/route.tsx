export default function Memos() {
  return (
    <ul>
      {MEMOS.map((memo) => {
        return (
          <li key={memo.title}>
            <h2>{memo.title}</h2>
            <p>{memo.content}</p>
            <ul>
              {memo.references.map((reference) => {
                return (
                  <li key={reference.id}>
                    <a href={reference.id} target="_blank" rel="noreferrer">
                      {reference.id}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

const MEMOS = [
  {
    title: "Nested Layouts Without Nested URLs",
    content:
      "I guess this isn't really useful, it may be the best to create a layout component",
    references: [
      {
        id: "https://remix.run/docs/en/main/file-conventions/routes#nested-layouts-without-nested-urls",
      },
      {
        id: "https://github.com/remix-run/remix/discussions/7296#discussioncomment-6857836",
      },
    ],
  },
];
