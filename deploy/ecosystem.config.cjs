// Configuração do PM2. É copiada para dentro de cada release pelo GitHub Actions.
const path = require("path");

const deployPath = process.env.DEPLOY_PATH || path.resolve(__dirname, "../..");

module.exports = {
  apps: [
    {
      name: "custom-products-platform",
      script: "server.js",
      cwd: path.join(deployPath, "current"),
      // Variáveis de ambiente de produção ficam em shared/.env no servidor
      node_args: `--env-file-if-exists=${path.join(deployPath, "shared/.env")}`,
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
