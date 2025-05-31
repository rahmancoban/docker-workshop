# 1. Node 18 Alpine tabanlı imaj
# FROM node:18-alpine

# 2. Çalışma dizinini ayarla
# WORKDIR /usr/src/app

# 3. Paket dosyalarını kopyala ve bağımlılıkları yükle
# COPY package*.json ./
# RUN npm install --production

# 4. Uygulama dosyasını kopyala
# COPY . .

# 5. Portu bildir
# EXPOSE 3000

# 6. Çalıştırma komutu
# CMD ["node", "app.js"]

# FROM node:18-alpine


####
# --- Stage 1: Dependencies ---
FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production

# --- Stage 2: Final Image ---
FROM node:18-alpine
WORKDIR /usr/src/app

# 1) deps aşamasından yalnızca node_modules klasörünü kopyala
COPY --from=deps /usr/src/app/node_modules ./node_modules

# 2) Kaynak kodunu kopyala
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]


