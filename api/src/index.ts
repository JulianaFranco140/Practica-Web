import { createServer } from "./interfaces/http/server";

const PORT = Number(process.env.PORT) || 3001;

const app = createServer();

app.listen(PORT, () => {
  console.log(`Users API running on http://localhost:${PORT}`);
});
