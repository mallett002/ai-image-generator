import express from 'express';
import 'dotenv/config';

import routes from './routes/openai-routes.js';

// dotenv.config();

const port = process.env.PORT;
const app = express();

app.use('/openai', routes);

app.listen(port, () => console.log(`Server started on port ${port}`));