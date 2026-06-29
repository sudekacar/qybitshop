🛒 QybitShop — Full-Stack E-Commerce Platform
QybitShop, endüstriyel IoT donanımları, yapay zeka geliştirici kitleri ve yazılım çözümleri sunan özgün konseptli bir full-stack e-ticaret uygulamasıdır. Bu proje, React Foundations eğitimi bitirme yükümlülüğü kapsamında modüler, tip güvenli ve performans odaklı olarak geliştirilmiştir.

🎬 Proje Tanıtım Videosu
👉 Proje Sunum ve Demo Videosunu İzlemek İçin Tıklayın

🚀 Öne Çıkan Özellikler
🏗️ Çekirdek Mimari
Next.js App Router & Server Actions: Form mutasyonları ve veritabanı işlemleri tamamen modern sunucu eylemleriyle yönetilir.

SQLite & İlişkisel Veritabanı: Hafif, hızlı ve kararlı bir veritabanı mimari katmanı üzerinde sipariş ve yorum kayıtları tutulur.

TypeScript: any kullanılmadan, tam tip güvenliği (strict type-safe) sağlanarak tüm veri modelleri interface'ler ile kurgulanmıştır.

🌟 Gelişmiş Özellikler (Bonus)
El Yapımı Çoklu Dil (i18n): Dışarıdan ekstra ağır üçüncü parti paketler yüklenmeden, React Context API ve yerel JSON dil paketleri kullanılarak Türkçe/İngilizce dinamik dil desteği sağlandı.

Native Dark Mode: Kullanıcı tercihlerini localStorage üzerinde saklayan, CSS tabanlı özel tema yönetim sistemi.

Dinamik Arama & useDebounce: Ürün arama barında veritabanını optimize etmek ve gereksiz istekleri engellemek amacıyla custom debouncing hook'u entegre edilmiştir.

Ürün Yorum ve Puanlama Sistemi: Kullanıcıların ürün detay sayfasında dinamik olarak puan (1-5 Yıldız) ve yorum bırakabileceği SQLite entegreli yapı.

Korumalı Sayfalar (Auth Middleware): Giriş yapmamış kullanıcıların sepet ve sipariş geçmişine erişmesini engelleyen Next.js Middleware koruması.

🛠️ Kullanılan Teknolojiler
Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

Database: SQLite

State Management: React Context API & useReducer

💻 Kurulum ve Çalıştırma
Projeyi bilgisayarınıza indirin veya klonlayın:
git clone https://github.com/sudekacar/qybitshop.git
cd qybitshop

Gerekli bağımlılıkları yükleyin:
npm install

Geliştirici modunda projeyi ayağa kaldırın:
npm run dev

Tarayıcınızda http://localhost:3000 adresini açın.
