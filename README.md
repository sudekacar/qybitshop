# MultiShop — E-Ticaret Uygulaması

MultiAcademy React Foundations mezuniyet projesi kapsamında geliştirilmiş tam işlevsel bir e-ticaret web uygulamasıdır.

## Canlı Demo

> Deployment sonrası buraya canlı demo linkinizi ekleyin.

## Tanıtım Videosu

> 3-5 dakikalık proje tanıtım video linkinizi buraya ekleyin.

## Kullanılan Teknolojiler

| Kategori | Teknoloji |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Dil | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Veritabanı | SQLite (better-sqlite3) |
| Kimlik Doğrulama | iron-session (session tabanlı) |
| Validasyon | Zod |
| Şifreleme | bcryptjs |

## Özellikler

### Kimlik Doğrulama
- Kullanıcı kaydı ve girişi
- Session tabanlı oturum yönetimi
- Middleware ile korumalı sayfa erişimi
- Profil sayfası ve güvenli çıkış

### Ürünler
- Ana sayfada öne çıkan ürünler ve kategori navigasyonu
- Ürün listesi (grid görünümü)
- Arama, kategori/fiyat filtreleme ve sıralama
- Ürün detay sayfası

### Sepet
- Context API + useReducer ile global sepet yönetimi
- localStorage ile kalıcılık
- Miktar güncelleme ve ürün kaldırma

### Sipariş
- Teslimat bilgileri formu
- Simüle ödeme (kredi/banka kartı)
- Sipariş onay sayfası
- Sipariş geçmişi ve detay takibi

## Demo Hesap Bilgileri

| E-posta | Şifre | Rol |
|---------|-------|-----|
| demo@multiacademy.com | demo123 | Kullanıcı |
| admin@multiacademy.com | demo123 | Admin |

## Kurulum

### Gereksinimler

- Node.js 18+
- npm

### Adımlar

```bash
# Repoyu klonlayın
git clone <repo-url>
cd multiacademy-ecommerce

# Bağımlılıkları yükleyin
npm install

# Ortam değişkenlerini ayarlayın
cp .env.example .env.local

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışır.

İlk çalıştırmada SQLite veritabanı otomatik oluşturulur ve örnek veriler (4 kategori, 15 ürün, demo kullanıcılar) yüklenir.

## Proje Yapısı

```
src/
├── app/              # Next.js App Router sayfaları
├── components/       # Yeniden kullanılabilir UI bileşenleri
├── context/          # CartProvider (Context API)
├── hooks/            # useDebounce custom hook
├── lib/              # Veritabanı, auth, yardımcı fonksiyonlar
├── actions/          # Server Actions (auth, checkout)
├── types/            # TypeScript tip tanımları
└── middleware.ts     # Route koruma
```

## Sayfa Haritası

| Route | Erişim | Açıklama |
|-------|--------|----------|
| `/` | Public | Ana sayfa |
| `/products` | Public | Ürün listesi |
| `/products/[id]` | Public | Ürün detay |
| `/login` | Public | Giriş |
| `/register` | Public | Kayıt |
| `/cart` | Protected | Sepet |
| `/checkout` | Protected | Ödeme |
| `/checkout/success` | Protected | Sipariş onayı |
| `/orders` | Protected | Sipariş geçmişi |
| `/orders/[id]` | Protected | Sipariş detay |
| `/profile` | Protected | Profil |

## Deployment Notu

SQLite dosya tabanlı bir veritabanıdır. Vercel gibi serverless platformlarda kalıcı depolama desteklenmez. Önerilen platformlar:

- **Railway** veya **Render** (persistent volume ile)
- Alternatif: Turso/libSQL gibi bulut SQLite servisi

## Lisans

Bu proje MultiAcademy React Foundations bootcamp mezuniyet projesi kapsamında geliştirilmiştir.
