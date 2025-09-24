const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const corsConfig = { origin: CLIENT_URL, credential: true };
