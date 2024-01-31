const express = require("express");
const router = express.Router();
const app = express();

// TEST ROUTE WORKS
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Endpoint connected!' });
  });


module.exports = router;
