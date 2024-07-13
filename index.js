import path from 'path';
import express from 'express';
import 'dotenv/config';

import routes from './routes/openai-routes.js';
import { fileURLToPath } from 'url';

const port = process.env.PORT;
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Get current file path
const currFilePath = fileURLToPath(import.meta.url);
const dirName = path.dirname(currFilePath);

// static folder
app.use(express.static(path.join(dirName, 'public')));

app.use('/openai', routes);

app.listen(port, () => console.log(`Server started on port ${port}`));