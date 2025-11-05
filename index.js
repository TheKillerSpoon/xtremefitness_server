import * as dotenv from "dotenv";
dotenv.config({ path: `.env.local`, override: true });

import server from "./lib/server.js";

const PORT = process.env.PORT || 3042;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`API listening on ${PORT}`);
});
