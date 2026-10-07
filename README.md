# Node.js EC2 Learning App

A tiny Node.js application with no runtime dependencies. It serves a webpage at `/` and a JSON health check at `/health`.

## Run locally

```bash
npm start
```

Open <http://localhost:3000>. To use another port:

```bash
PORT=8080 npm start
```

## Deploy on EC2

1. Launch an Ubuntu EC2 instance and allow inbound TCP `3000` in its security group (or use Nginx on port 80).
2. Connect through SSH and install Node.js 18 or newer.
3. Clone this repository, then run:

   ```bash
   cd node-deployment-ec2
   npm start
   ```

4. Visit `http://YOUR_EC2_PUBLIC_IP:3000`.

For a process that keeps running after disconnecting, use a process manager such as PM2:

```bash
npm install --global pm2
pm2 start server.js --name ec2-learning-app
pm2 save
pm2 startup
```

Never commit SSH private keys or environment secrets to the repository.
