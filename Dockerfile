FROM ghcr.io/puppeteer/puppeteer:21.7.0

ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /Users/stark/Documents

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["node", "index.js"]