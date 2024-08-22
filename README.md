Same
I'm not sure about a difference between `<Form>` and `fetcher.Form`

> [There is one key difference though, it's not a navigation, so the URL doesn't change and the history stack is unaffected.](https://remix.run/docs/en/main/start/tutorial#forms-without-navigation)

In other words, `<Form>` makes URL change but it doesn't happen in my environment

And I checked how history stack was affected between `<Form>` and `fetcher.Form`
There's one difference about it
`fetcher.Form` doesn't change anything of history stack
On the flip side, `<Form>` changes key in state of history stack
It makes sense cuz docs say that
But there's a question
What any merits can I get through not changing the key or changing it?
