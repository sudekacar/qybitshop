# 🚀 QybitShop

Next.js 16 App Router, TypeScript ve Tailwind CSS 4 mimarisi üzerine kurulu, endüstriyel IoT ve modern e-ticaret süreçlerini birleştiren full-stack bir mezuniyet projesidir. Uygulama, veri tutarlılığı ve yüksek performans için ilişkisel SQLite veritabanı altyapısını kullanmakta olup, canlı ortam olarak Railway üzerinde kesintisiz çalışmaktadır.

---

## 🌐 Canlı Uygulama & Sunum Bilgileri

* 🌍 **Canlı Proje URL:** `qybitshop-production.up.railway.app`
* 🎬 **Teknik Sunum & Demo Videosu: https://youtu.be/0hdw5N94JLc?si=_6Kb-8_ALin2syBw** Proje dizininde yer alan 10 dakikalık sunum videosunda, kod mimarisi ve kullanıcı akışları detaylı olarak anlatılmıştır.
* 📝 **Proje Mühendislik Makalesi (Medium):** [https://medium.com/@sudeykacar/building-qybitshop-a-production-ready-full-stack-e-commerce-platform-with-next-js-ea34cf33d74e?sharedUserId=sudeykacar] — *Projenin ardındaki mimari kararlar, teknik süreçler ve gelecek planları detaylı bir makale olarak kaleme alınmıştır.*
---

## 🔑 Hazır Demo Hesapları

Uygulama ilk kez ayağa kalktığında (seed aşamasında) aşağıdaki iki adet demo hesap otomatik olarak veritabanına işlenir:

| E-posta | Şifre | Rol / Yetki | Görünen Ad |
| :--- | :--- | :--- | :--- |
| 🧑‍💻 `demo@qybitlabs.com` | `demo123` | Kullanıcı (User) | Demo Kullanıcı |
| 🛡️ `admin@qybitlabs.com` | `demo123` | Yönetici (Admin) | Qybit Admin |

> 📌 **Önemli Not:** Giriş sayfasında (`/login`) pratiklik açısından kullanıcı arayüzünde `demo@qybitlabs.com` bilgileri hazır olarak sunulmaktadır. Rol tabanlı yetkilendirme (RBAC) altyapısı hazır olup, admin hesabı ile giriş yapıldığında ilgili yetki durumu profil sayfasında dinamik olarak doğrulanmaktadır.

---

## 🛠️ Kullanılan Teknolojiler ve Mimari Kararlar

### 1. Core Stack
* **Next.js 16 (App Router):** Frontend ve backend süreçleri entegre bir full-stack mimaride birleştirilmiştir. Sayfaların hızlı yüklenmesi ve SEO optimizasyonu için Server-Side Rendering (SSR) ve Server Components yapısı aktif kullanılmıştır.
* **TypeScript:** Projenin tüm veri modeli ve API yanıtları katı kurallarla tiplendirilmiş, geliştirme aşamasında tip güvenliği (type-safety) maksimuma çıkarılmıştır.
* **React 19 & Tailwind CSS 4:** Modern, performanslı ve tamamen duyarlı (responsive) bileşen mimarisi, yardımcı sınıf öncelikli (utility-first) güncel tasarım motoruyla harmanlanmıştır.

### 2. Veritabanı ve Kalıcılık (Persistence)
* **SQLite & Better-sqlite3:** Uygulamanın kalbinde, dosya tabanlı ancak ilişkisel veri modeli yeteneklerine tam sahip SQLite veritabanı yer alır. Tablolar arasındaki bire-çok (one-to-many) ilişkiler SQL standartlarında korunmaktadır.

### 3. Güvenlik ve Doğrulama (Security)
* **Iron Session:** Şifreli, durum bilgisi barındırmayan (stateless) ve `httpOnly` çerezler (cookies) kullanan oturum yönetimi kütüphanesi tercih edilmiştir. `middleware.ts` üzerinden korumalı sayfalara yetkisiz erişimler sunucu sınırında engellenmektedir.
* **Bcrypt:** Kullanıcı parolaları veritabanına asla düz metin (plain text) olarak yazılmaz; kriptografik olarak salt'lanarak hash'lenmiş şekilde saklanır.
* **Zod:** Form girdileri ve API talepleri daha sunucu sınırındayken şema tabanlı katı bir doğrulamadan geçirilerek veri bütünlüğü güvenceye alınır.

---

## 🚀 Öne Çıkan Gelişmiş Özellikler

* 🌗 **Dinamik Vibe (Dark / Light Mode):** `ThemeContext` (React Context API) ve `localStorage` senkronizasyonu sayesinde kullanıcının tema tercihi sayfa yenilense dahi korunur.
* 🌐 **Çoklu Dil Desteği (i18n):** Harici kütüphane yükü olmaksızın, yerel JSON sözlük dosyalarından beslenen ve `LanguageContext` ile yönetilen, sayfa yenilenmesine ihtiyaç duymayan saliselik dil geçiş mekanizması kurulmuştur.
* 🔍 **Arama Optimizasyonu (useDebounce):** Kullanıcı arama çubuğuna yazarken veritabanını yormamak adına istemci tarafında geciktirme (debounce) mekanizması kurgulanmış, SQLite sorguları optimize edilmiştir.
* 🛒 **Sepet ve Süreklilik:** Sepet durum yönetimi merkezi bir Context yapısında tutulur ve tarayıcı `localStorage` alanı ile anlık senkronize edilerek sayfa yenilemelerinde veri kaybı engellenir.
* 💳 **Simüle Checkout Döngüsü:** Adres ve sipariş bilgileri alındıktan sonra Server Actions aracılığıyla başarılı bir sipariş döngüsü simüle edilir, veriler ilişkisel veritabanına yazılır ve kullanıcının profilindeki sipariş geçmişinde listelenir.

---

## 💻 Yerel Kurulum (Local Setup)

Projeyi kendi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install

 Geliştirme sunucusunu başlatın (İlk çalıştırmada veritabanı otomatik seed edilecektir):

```bash
npm run dev
```

2. ** Tarayıcınızda http://localhost:3000 adresini ziyaret edin. **

🗺️ Gelecek Planları (Future Roadmap)
---

[ ] Admin rol bilgisine tam bağımlı, stok ve ürün yönetiminin yapılabileceği kapsamlı bir Yönetici Paneli (Dashboard) entegrasyonu.

---

[ ] Simüle edilen ödeme adımının iyzico veya PayTR API'leri kullanılarak gerçek bir Ödeme Geçidi (Payment Gateway) sistemine dönüştürülmesi.

