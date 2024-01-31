const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
const dfd = require("danfojs-node");

// Routers
var networthRouter = require('./routes/networth');
var testRouter = require('./routes/test');
const swaggerRouter = require('./routes/swagger');

// App Use Routes
app.use("/networth", networthRouter);
app.use("/test", testRouter);
app.use('/', swaggerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});