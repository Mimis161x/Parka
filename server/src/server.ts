import app from './app';
import db from './utils/db';
import dotenv  from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

const start = async () => {
    await db();
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
}

start();