# 🛒 QybitShop

Multi Group Foundation Frontend Web Development Course eğitimi bitirme yükümlülüğü kapsamında geliştirilmiş; endüstriyel IoT donanımları, yapay zeka geliştirici kitleri ve yazılım çözümleri sunan modern, full-stack bir e-ticaret platformudur.

### 🎬 Proje Sunumu & Demo
👉 [Proje Sunum ve Demo Videosunu İzlemek İçin Tıklayın](BURAYA_VIDEO_LINKINI_YAPISTIR)

---

### 🚀 Öne Çıkan Teknik Özellikler

*   **Modern Mimari:** Next.js 15 App Router, React 19, Server Actions ve tam tip güvenliği sağlayan TypeScript.
*   **Küresel State:** Sepet yönetimi ve veri kalıcılığı için yerel `Context API`, `useReducer` ve `LocalStorage` entegrasyonu.
*   **Gelişmiş Filtreleme:** Arama barında veritabanını yormayan `useDebounce` custom hook altyapısı ile anlık kategori/fiyat filtreleme.
*   **Korumalı Sayfalar:** Giriş yapmamış kullanıcıların hassas sayfalara erişmesini engelleyen Next.js `Middleware` koruması.
*   **Özel Bonus Özellikler:**
    *   🌍 **El Yapımı Çoklu Dil (i18n):** Paket kullanılmadan Context API ile yazılmış Türkçe/İngilizce desteği.
    *   🌙 **Native Dark Mode:** Kullanıcı tercihine duyarlı, CSS değişkenli tema sistemi.
    *   💬 **Yorum & Puanlama:** Ürün detay sayfasında SQLite veritabanına canlı işleyen 1-5 Yıldız ve yorum sistemi.

---

### 📦 Teknoloji Yığını & Sayfa Haritası

<details>
<summary>🛠️ Kullanılan Teknolojiler (Genişletmek için tıklayın)</summary>

*   **Framework / Dil:** Next.js 15 & TypeScript
*   **Styling:** Tailwind CSS 4
*   **Database:** SQLite (`better-sqlite3`)
*   **Oturum Yönetimi:** `iron-session` (Session tabanlı)
*   **Validasyon & Şifreleme:** Zod & `bcryptjs`
</details>

<details>
<summary>📋 Sayfa Haritası & Yetkilendirme (Genişletmek için tıklayın)</summary>

*   `/` & `/products` & `/products/[id]` 🔓 **Public** — Vitrin, filtreleme ve ürün detayları.
*   `/login` & `/register` 🔓 **Public** — Giriş ve kayıt işlemleri.
*   `/cart` & `/checkout` & `/checkout/success` 🔒 **Korumalı** — Sepet ve simüle ödeme adımları.
*   `/orders` & `/orders/[id]` & `/profile` 🔒 **Korumalı** — Canlı sipariş geçmişi ve profil yönetimi.
</details>

---

### 🔑 Test Bilgileri & Kurulum

**Demo Hesaplar:**
*   **Kullanıcı:** `demo@multiacademy.com` | **Şifre:** `demo123`
*   **Yönetici:** `admin@multiacademy.com` | **Şifre:** `demo123`

**Çalıştırma Adımları:**
```bash
# 1. Projeyi klonlayın ve klasöre girin
git clone https://github.com/sudekacar/qybitshop.git
cd qybitshop

# 2. Bağımlılıkları yükleyin ve ortam dosyasını oluşturun
npm install
cp .env.example .env.local

# 3. Projeyi lokalde başlatın
npm run dev

🔗 Yerel Bağlantı
Uygulama yerel ağda başlatıldıktan sonra aşağıdaki bağlantı üzerinden test edilebilir:

👉 http://localhost:3000

İlk çalıştırmada SQLite veritabanı otomatik kurulur ve örnek veriler (src/lib/seed.ts) sisteme enjekte edilir.
