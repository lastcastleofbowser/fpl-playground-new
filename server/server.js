import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://fantasy.premierleague.com/',
    changeOrigin: true,
  })
);

const PORT = 3008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
