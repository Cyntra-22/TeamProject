const app = require('./src/app');
const connectDB = require('./src/infra/databases/config');

const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});