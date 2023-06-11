import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json("Hello, world!");
});

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});