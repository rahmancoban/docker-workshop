

//V1 
/*
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Merhaba Docker!');
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
*/

//V2
/*
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  // Eski: res.send('Merhaba Docker!');
  // Yeni: hem eski mesajı hem de güncelleme bilgisini gösterelim
  res.send('Merhaba Docker! Uygulama güncellendi. Bind mounts for live development icin eklendi');
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
*/


//V3
// app.js
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// MySQL bağlantı ayarları
// "db" ismi: adım 6.5’te oluşturacağımız MySQL container’ın hostname’i olacak.
const dbConfig = {
  host: 'db',
  user: 'dockeruser',
  password: 'dockerpass',
  database: 'counterdb',
};

// Veritabanı ve tabloyu ilk başlatma fonksiyonu
async function initDb() {
  // 1) root kullanıcıyla önce MySQL server’a bağlanıp veritabanını oluştur
  const rootConn = await mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'dockerrootpwd',
  });
  await rootConn.query(`CREATE DATABASE IF NOT EXISTS counterdb;`);
  await rootConn.end();

  // 2) Şimdi counterdb veritabanına bağlanıp tabloyu oluştur
  const conn = await mysql.createConnection(dbConfig);
  await conn.query(`
    CREATE TABLE IF NOT EXISTS visits (
      id INT PRIMARY KEY AUTO_INCREMENT,
      count INT NOT NULL
    );
  `);
  // Ziyaret tablosu boşsa, ilk satırı ekle
  const [rows] = await conn.query(`SELECT COUNT(*) AS total FROM visits;`);
  if (rows[0].total === 0) {
    await conn.query(`INSERT INTO visits (count) VALUES (0);`);
  }
  await conn.end();
}

// Her istek geldiğinde sayaç değerini okumak ve artırmak için fonksiyon
async function getCountAndIncrement() {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.query(`SELECT count FROM visits WHERE id=1;`);
  let currentCount = rows[0].count;
  currentCount += 1;
  await conn.query(`UPDATE visits SET count = ? WHERE id = 1;`, [currentCount]);
  await conn.end();
  return currentCount;
}

// Ana rota: sayaç işlemini yapıp kullanıcıya göster
app.get('/', async (req, res) => {
  try {
    const newCount = await getCountAndIncrement();
    const currentTime = new Date().toLocaleString();
    res.send(`
      <h1>Docker Workshop Step 6: MySQL ile Sayaç</h1>
      <p>Bu sayfayı ${newCount} kez ziyaret ettiniz.</p>
      <p>Son erişim: ${currentTime}</p>
    `);
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).send('Veritabanı hatası oluştu!');
  }
});

app.listen(PORT, async () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
  try {
    await initDb();
    console.log('Veritabanı ve tablo kontrolü tamamlandı.');
  } catch (e) {
    console.error('Veritabanı başlatma hatası:', e);
  }
});


