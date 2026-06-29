# 🛒 QybitShop — Full-Stack E-Commerce Platform

QybitShop, endüstriyel IoT donanımları, yapay zeka geliştirici kitleri ve yazılım çözümleri sunan özgün konseptli bir full-stack e-ticaret uygulamasıdır. Bu proje, **MultiGroup Community Foundation Frontend Web Development Course** eğitimi bitirme yükümlülüğü kapsamında modüler, tip güvenli ve performans odaklı olarak geliştirilmiştir.

## 🎬 Proje Tanıtım Videosu
👉 [Proje Sunum ve Demo Videosunu İzlemek İçin Tıklayın](BURAYA_VIDEO_LINKINI_YAPISTIR)

---

## 🛠️ Kullanılan Teknolojiler ve Altyapı

| Kategori | Teknoloji / Kütüphane | Açıklama |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | Sunucu taraflı render (SSR), Server Actions ve optimize yönlendirme mimarisi. |
| **Dil** | TypeScript | `any` kullanılmadan kurgulanmış strict type-safe mimari ve interface modelleri. |
| **UI Core** | React 19 | Gelecek nesil React özellikleriyle güçlendirilmiş bileşen yapısı. |
| **Styling** | Tailwind CSS 4 | Modern, esnek, performanslı ve utility-first CSS tasarımları. |
| **Veritabanı** | SQLite (better-sqlite3) | Sipariş, kullanıcı ve yorum kayıtlarının tutulduğu ilişkisel lokal DB katmanı. |
| **Oturum Yönetimi** | iron-session | Güvenli, şifrelenmiş cookie tabanlı session yönetimi. |
| **Validasyon** | Zod | Runtime tip güvenliği ve form verilerinin güvenli doğrulanması. |
| **Şifreleme** | bcryptjs | Kullanıcı şifrelerinin veritabanına güvenli bir şekilde hashlenerek kaydedilmesi. |

---

## 🚀 Öne Çıkan Mimari ve Gelişmiş Özellikler (Eksiksiz Liste)

### 🏗️ Çekirdek Özellikler & Kimlik Doğrulama
- **Gelişmiş Oturum Yönetimi:** Kullanıcı kaydı, girişi ve `iron-session` ile güvenli session kontrolü.
- **Güvenli Sayfa Erişimi (Auth Middleware):** Giriş yapmamış kullanıcıların sepet, ödeme ve sipariş geçmişi sayfalarına erişmesini engelleyen Next.js Middleware altyapısı.
- **Profil Yönetimi:** Kullanıcı detaylarının gösterimi ve güvenli oturum kapatma (Logout) mekanizması.

### 🛍️ Ürün ve Sepet Dinamikleri
- **Akıllı Listeleme & Vitrin:** Ana sayfada öne çıkan ürünler, dinamik kategori navigasyonu ve grid yapılı ürün listesi.
- **Arama, Filtreleme ve Sıralama:** Ürünler sayfasında anlık kategori filtreleme, fiyata göre sıralama (artan/azalan) özellikleri.
- **useDebounce Entegrasyonu:** Ürün arama barında veritabanını optimize etmek ve gereksiz render/istek trafiğini engellemek amacıyla özel debouncing hook'u.
- **Global State Yönetimi:** Sepet işlemleri için React'ın native `Context API` ve `useReducer` mekanizması bir arada kullanılmıştır.
- **LocalStorage Kalıcılığı:** Sepet içeriği, miktar güncellemeleri ve kullanıcı tercihleri sayfa yenilense dahi tarayıcı hafızasında saklanır.

### 🌟 İleri Düzey & Bonus Özellikler
- **El Yapımı Çoklu Dil (i18n):** Dışarıdan ekstra ağır paket yüklenmeden, React Context API ve yerel JSON dil paketleri (`src/i18n`) kullanılarak tamamen native olarak kurgulanmış Türkçe/İngilizce dinamik dil sistemi.
- **Native Dark Mode:** Kullanıcı tercihlerini `localStorage` üzerinde saklayan, CSS değişkenleri tabanlı bütünsel tema yönetim sistemi.
- **Ürün Yorum ve Puanlama Sistemi:** Kullanıcıların ürün detay sayfasında dinamik olarak puan (1-5 Yıldız) ve yorum bırakabileceği, veritabanındaki `reviews` tablosuna canlı işleyen altyapı.
- **Sipariş ve Ödeme Döngüsü:** Teslimat bilgileri formu, simüle edilmiş kredi/banka kartı ödeme adımı, başarılı sipariş sonrası `orders` ve `order_items` tablolarının tetiklenmesi ve sipariş geçmişi takibi.

---

## 📂 Proje Yapısı

```text
src/
├── app/              # Next.js App Router sayfaları ve API rotaları
├── components/       # Yeniden kullanılabilir UI bileşenleri (auth, cart, layout, products, reviews)
├── context/          # Küresel state yönetim sağlayıcıları (Cart, Theme, Locale)
├── hooks/            # useDebounce gibi özel custom hook tanımları
├── i18n/             # Türkçe ve İngilizce dil paketleri (tr.ts, en.ts)
├── lib/              # Veritabanı sorguları, auth süreçleri, seed verileri ve yardımcı fonksiyonlar
├── actions/          # Sunucu tarafında çalışan Server Actions mimarisi (auth, orders, reviews)
├── types/            # Proje genelinde kullanılan strict TypeScript interface modelleri
└── middleware.ts     # Route bazlı erişim koruma katmanı

📋 Sayfa Haritası ve Erişim YetkileriRoute (URL)Erişim TürüAçıklama/Public (Herkes)QybitShop vitrini, slaytlar ve öne çıkan teknoloji ürünleri./productsPublic (Herkes)Dinamik filtreleme, arama ve sıralama yapılabilen gelişmiş ürün listesi./products/[id]Public (Herkes)Ürün detayları, teknik özellikler ve canlı kullanıcı yorumları./login / /registerPublic (Herkes)Kullanıcı giriş ve kayıt sayfaları./cartProtected (Kullanıcı)Sepet içeriği, miktar güncellemeleri ve anlık tutar hesaplamaları./checkoutProtected (Kullanıcı)Teslimat bilgileri formu ve simüle edilmiş ödeme adımı./checkout/successProtected (Kullanıcı)Başarılı sipariş sonrası yönlendirilen güvenli onay ekranı./ordersProtected (Kullanıcı)Kullanıcının geçmiş siparişlerini ve durumunu görebileceği canlı liste./orders/[id]Protected (Kullanıcı)Verilen siparişe ait ürün kırılımları ve fatura adresi detayları./profileProtected (Kullanıcı)Güvenli çıkış (Logout) butonu ve kullanıcı profil detayları.

🔑 Demo Hesap BilgileriSistemi doğrudan test edebilmeniz için veritabanında hazır tanımlanmış kimlik bilgileri:E-postaŞifreRol / Yetkidemo@multiacademy.comdemo123Standart Kullanıcı Hesabıadmin@multiacademy.comdemo123Yönetici (Admin) Hesabı
Kurulum ve Çalıştırma
Projeyi bilgisayarınıza indirin veya klonlayın:

Bash
git clone [https://github.com/sudekacar/qybitshop.git](https://github.com/sudekacar/qybitshop.git)
cd qybitshop
Gerekli bağımlılıkları yükleyin:

Bash
npm install
Ortam değişkenlerini ayarlayın (Root dizinde .env.local dosyası oluşturun):

Bash
cp .env.example .env.local
Geliştirme sunucusunu başlatın:

Bash
npm run dev
Uygulama yerel ağda http://localhost:3000 adresinde çalışmaya başlar. İlk çalıştırmada SQLite veritabanı otomatik olarak oluşturulur ve src/lib/seed.ts üzerindeki örnek veriler (kategoriler, teknolojik ürünler, yorumlar ve demo kullanıcılar) sisteme otomatik enjekte edilir.

☁️ Deployment (Dağıtım) Notu
SQLite dosya tabanlı bir veritabanıdır. Vercel gibi tamamen serverless (sunucusuz) çalışan platformlar geçici dosya sistemi kullandığından kalıcı depolama desteklemez. Projenin canlıya taşınması durumunda:

Railway veya Render gibi kalıcı disk alanı (persistent volume) sunan platformlar tercih edilmelidir.

Ya da veritabanı katmanı Turso / libSQL gibi bulut tabanlı bir SQLite servisine kolayca bağlanabilir.

⚖️ Lisans
Bu proje MultiAcademy React Foundations bootcamp mezuniyet projesi kapsamında geliştirilmiştir. Tüm hakları saklıdır.
