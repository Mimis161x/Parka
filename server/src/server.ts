import app from './app';
import db from './utils/db';

const port = process.env.PORT || 3000;

const start = async () => {
    await db();
    app.listen(PORT, () => {console.log(`Server started on http://localhost${port}`)});
}


start();