import "reflect-metadata";
import app from "./app";
import { env } from "./cofig/env";

const PORT = env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
