const article = await fetch("https://en.wikipedia.org/wiki/Special:Random");

const backendUri = Deno.env.get("uri") as string;

const todo = await fetch(backendUri, {
  method: "post",
  body: `READ ${article.url}`,
});

console.log("added todo", todo);
