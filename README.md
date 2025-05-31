# Docker Workshop

Bu repository, “Get Started Workshop” dokümanındaki 8 aşamalı Docker alıştırmalarını içerir.

---

## İçindekiler

1. [Genel Açıklama](#genel-açıklama)
2. [Aşama 1 – Docker Workshop](#a%C5%9Fama-1--docker-workshop)
3. [Kurulum ve Çalıştırma](#kurulum-ve-%C3%A7al%C4%B1%C5%9Ft%C4%B1rma)
4. [Dosya Yapısı](#dosya-yap%C4%B1s%C4%B1)
5. [Lisans](#lisans)
6. [Katkıda Bulunma](#katk%C4%B1da-bulunma)
7. [Davranış Kuralları](#davran%C4%B1%C5%9F-kurallar%C4%B1)
8. [Üçüncü Parti Lisanslar](#%C3%BC%C3%A7%C3%BCnc%C3%BC-parti-lisanslar)

---

## Genel Açıklama

Bu repo iki ana bölüme ayrılmıştır:

1. **Aşama 1 – Docker Workshop**  
   Docker’ın temel konseptlerini öğretmek amacıyla “Get Started Workshop” dokümanını adım adım tamamladım. Bu aşamada:
   - Basit bir Node.js/Express uygulaması (“Merhaba Docker!”) containerize edildi.
   - Uygulama güncellendi, Dockerfile optimize edildi, Docker Hub’a push edildi.
   - Volume ve bind-mount kullanılarak veri kalıcılığı ve canlı geliştirme örnekleri yapıldı.
   - MySQL ile çoklu container kurulumları, Docker Compose kullanımı ve image best practices (multi-stage build vs.) çalışıldı.

---

## Aşama 1 – Docker Workshop

Her bir “step-#” klasöründe ilgili aşama dosyaları mevcuttur:

- **step-1/**:

  - `app.js` (Merhaba Docker! servis kodu)
  - `Dockerfile` (Aşama 1 için)
  - `.dockerignore`, `package.json`, `package-lock.json`

- **step-2/**:

  - `app.js` (Güncellenmiş kod: “Merhaba Docker! Uygulama güncellendi.”)
  - `Dockerfile`, `.dockerignore`, `package.json`, `package-lock.json`

- **step-3/**:

  - (Sadece Docker Hub’a push işlemi yapıldı, kod değişikliği yok)

- **step-4/**:

  - `app.js` (Volume kullanarak veri kalıcılığı örneği)
  - `Dockerfile`, `.dockerignore`, `package.json`, `package-lock.json`

- **step-5/**:

  - `app.js` (Bind-mount ile canlı geliştirme)
  - `.dockerignore`, `package.json`, `package-lock.json`

- **step-6/**:

  - `app.js` (MySQL bağlantılı sayaç uygulaması)
  - `Dockerfile`, `.dockerignore`, `package.json`, `package-lock.json`

- **step-7/**:

  - `docker-compose.yml`, `Dockerfile`, `app.js` (Compose ile multi-container)
  - `.dockerignore`, `package.json`, `package-lock.json`

- **step-8/**:
  - `Dockerfile` (Multi-stage build örneği), `app.js`
  - `.dockerignore`, `package.json`, `package-lock.json`

---

## Kurulum ve Çalıştırma

### Önkoşullar

- **Docker** (en az v20.10) ve **Docker Compose** kurulu olmalı.
- Node.js (sadece local geliştirme için, container içinde zaten Node var).

### Aşama 1’i Çalıştırma

1. Terminal’de `docker-workshop` klasörüne gidin: Örnek olarak:
   ```bash
   cd ~/docker-workshop
   ```
   ```bash
   cd step-7
   docker-compose up -d --build
   ```
1. Tarayıcıda http://localhost:3000 adresine gidin.

- “Docker Workshop Step 6: MySQL ile Sayaç” sayfası ve sayaç artışı görüntülenecektir.
