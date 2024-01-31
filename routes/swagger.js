const express = require("express");
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

/* Swagger route */
router.get("/", swaggerUI.setup(swaggerDocument));
router.use("/", swaggerUI.serve);

module.exports = router;
