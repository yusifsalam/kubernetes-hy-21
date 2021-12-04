import { connect } from "nats";
const fetch = require("node-fetch");

const main = async () => {
  const nc = await connect({
    servers: process.env.NATS_URL || "nats://nats:4222",
  });
  const sub = nc.subscribe("todo_update", { queue: "todo-operations" });
  for await (const m of sub) {
    console.log("nats m:", m);
    await sendTelegramMessage(m.data.toString());
  }
};
const tgBaseUrl = `https://api.telegram.org/bot${process.env.TG_TOKEN}/`;

const sendTelegramMessage = async (message: string) => {
  const url = tgBaseUrl.concat(
    `sendMessage?chat_id=${process.env.TG_CHAT_ID}&text=${message}`
  );
  const result = await fetch(url, { method: "get" });
  console.log("result", result);
};

main();
