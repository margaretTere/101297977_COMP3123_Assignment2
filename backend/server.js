const app = require('./config/app');
const CFG = require('./config/config');
const connectToMongo = require('./config/db');

connectToMongo();

app.listen(CFG.PORT, () => {
  console.log(`Assignment 2 server is running on port: ${CFG.PORT}`);
});

