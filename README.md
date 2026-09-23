# custom-products-platform

Next.js 16 + Tailwind CSS 4 + Fabric.js 7, rodando em Node.js 22.22.3.

## Desenvolvimento

```bash
nvm use            # usa a versão do .nvmrc (22.22.3)
npm install
npm run dev        # http://localhost:3000
```

## Build de produção

```bash
npm run build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
PORT=3000 node .next/standalone/server.js
```

## Deploy

O workflow `.github/workflows/deploy.yml` roda lint + build a cada push/PR e, em push na `main`,
envia o build standalone para o servidor via SSH/rsync e reinicia o app com PM2.
Veja `deploy/` para os arquivos de configuração do servidor.
