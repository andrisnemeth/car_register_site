const express = require("express");
const cors = require('cors');

import staticRouter from './routes/static';

const app = express();
app.use(cors())


// app.use(loggingMiddleware({ logger }));
app.use(staticRouter);

export default app;