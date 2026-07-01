Markdown# 🛒 QybitShop - Industrial IoT & E-Commerce Platform

QybitShop, modern web teknolojileri, katı güvenlik standartları ve yüksek performanslı yazılım mimarileri (RBAC) dikkate alınarak geliştirilmiş full-stack bir e-ticaret ve endüstriyel cihaz yönetim platformudur. Projenin frontend ve backend servisleri tek bir çatı altında birleştirilmiş ve canlı ortama (production) başarılı bir şekilde deploy edilmiştir.

🌐 **Canlı Uygulama Linki (Railway):** [qybitshop-production.up.railway.app](https://qybitshop-production.up.railway.app)
🎥 **Proje Demo ve Teknik Sunum Videosu:** [Proje Teslim Sistemi Eki]

---

## 🚀 Proje Kurulumu ve Yerel Çalıştırma (Local Setup)

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Repoyu Klonlayın:**
   ```bash
   git clone [https://github.com/sude-yaren-kacar/qybitshop.git](https://github.com/sude-yaren-kacar/qybitshop.git)
   cd qybitshop

1. Bağımlılıkları Yükleyin:

```bash
npm install
```

2. Veritabanını Hazırlayın (Seed Data):
Aşağıdaki komut, SQLite veritabanını (data/shop.db) ilk kez oluşturur ve gerekli tüm demo ve admin hesaplarını otomatik olarak içerisine enjekte (seed) eder.

```bash
npm run db:setup
```

3. Uygulamayı Başlatın:

```bash
npm run dev
```

Uygulama tarayıcınızda http://localhost:3000 adresinde çalışmaya başlayacaktır.

