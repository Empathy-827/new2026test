# new2026_tc_test

Node.js + Express version for Tencent Cloud deployment.

## Local Run

```bash
cd new2026_tc_test
npm install
npm start
```

Open:
- http://localhost:3000/
- http://localhost:3000/videos
- http://localhost:3000/gallery
- http://localhost:3000/about

## Tencent Cloud (CVM) Quick Deploy

```bash
cd /path/to/new2026_tc_test
npm install --production
PORT=3000 npm start
```

Recommend using PM2:

```bash
npm install -g pm2
pm2 start server.js --name new2026_tc_test
pm2 save
```

Then configure Nginx reverse proxy to `127.0.0.1:3000`.
