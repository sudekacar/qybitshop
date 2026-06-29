import type Database from "better-sqlite3";
import bcrypt from "bcryptjs";

const categories = [
  {
    name: "Yapay Zeka",
    slug: "yapay-zeka",
    description: "LLM araçları, model API'leri ve AI otomasyon çözümleri",
  },
  {
    name: "Yazılım & Araçlar",
    slug: "yazilim-araclari",
    description: "IDE lisansları, DevOps araçları ve bulut yazılım paketleri",
  },
  {
    name: "Donanım & IoT",
    slug: "donanim-iot",
    description: "Endüstriyel sensörler, edge cihazlar ve akıllı makine bileşenleri",
  },
  {
    name: "Geliştirici Kitleri",
    slug: "gelistirici-kitleri",
    description: "Mikrodenetleyici kitleri, prototipleme setleri ve maker ekipmanları",
  },
];

const products = [
  {
    name: "Qybit AI Studio Pro",
    description:
      "Kurumsal yapay zeka iş akışları için görsel model tasarımı, fine-tuning ve API yönetim paneli.",
    price: 4999.99,
    stock: 40,
    image_url:'/products/aistudio.jpg',
    category_slug: "yapay-zeka",
    is_featured: 1,
  },
  {
    name: "Neural Edge Inference Kit",
    description:
      "Sahada gerçek zamanlı görüntü işleme için optimize edilmiş edge AI hesaplama modülü.",
    price: 3299.0,
    stock: 35,
    image_url: '/products/inference.jpg',
    category_slug: "yapay-zeka",
    is_featured: 1,
  },
  {
    name: "LLM API Kredisi — 1M Token",
    description:
      "Qybit Labs altyapısında GPT sınıfı modellere erişim için ön ödemeli API kredisi paketi.",
    price: 899.0,
    stock: 200,
    image_url: '/products/tokens.jpg',
    category_slug: "yapay-zeka",
    is_featured: 0,
  },
  {
    name: "Prompt Engineering Toolkit",
    description:
      "Şablon kütüphanesi, değerlendirme metrikleri ve ekip iş birliği araçları içeren AI prompt paketi.",
    price: 649.99,
    stock: 80,
    image_url: '/products/guide.webp',
    category_slug: "yapay-zeka",
    is_featured: 0,
  },
  {
    name: "Qybit DevOps Suite",
    description:
      "CI/CD pipeline, container registry ve izleme panellerini tek lisans altında sunan yazılım paketi.",
    price: 2499.0,
    stock: 60,
    image_url: '/products/devops.jpg',
    category_slug: "yazilim-araclari",
    is_featured: 1,
  },
  {
    name: "Cloud IDE Enterprise",
    description:
      "Tarayıcı tabanlı geliştirme ortamı, ekip paylaşımı ve güvenli kod depolama entegrasyonu.",
    price: 1799.99,
    stock: 75,
    image_url: '/products/cloudide.jpg',
    category_slug: "yazilim-araclari",
    is_featured: 0,
  },
  {
    name: "API Gateway Manager",
    description:
      "Mikroservis mimarileri için rate limiting, auth ve analytics özellikli API yönetim yazılımı.",
    price: 1899.0,
    stock: 45,
    image_url: '/products/api.jpg',
    category_slug: "yazilim-araclari",
    is_featured: 1,
  },
  {
    name: "Qybit Machinery Sensör Paketi",
    description:
      "Titreşim, sıcaklık ve basınç ölçümü için endüstriyel IoT sensör seti — Qybit Machinery uyumlu.",
    price: 2199.0,
    stock: 50,
    image_url: '/products/sensor.jpg',
    category_slug: "donanim-iot",
    is_featured: 1,
  },
  {
    name: "Edge Gateway X2",
    description:
      "Fabrika sahasında veri toplama, protokol dönüştürme ve buluta güvenli aktarım sağlayan edge cihaz.",
    price: 3499.99,
    stock: 30,
    image_url: '/products/gate.png',
    category_slug: "donanim-iot",
    is_featured: 1,
  },
  {
    name: "Endüstriyel Kamera Modülü",
    description:
      "4K görüntüleme, düşük gecikme ve makine görüşü uygulamaları için compact vision modülü.",
    price: 2799.0,
    stock: 40,
    image_url: '/products/kamera.jpg',
    category_slug: "donanim-iot",
    is_featured: 0,
  },
  {
    name: "Qybit Labs Maker Board V3",
    description:
      "Wi-Fi 6, Bluetooth LE ve çoklu GPIO destekli geliştirme kartı — hızlı prototipleme için ideal.",
    price: 899.99,
    stock: 120,
    image_url: '/products/saver.jpg',
    category_slug: "gelistirici-kitleri",
    is_featured: 1,
  },
  {
    name: "Robotics Starter Kit",
    description:
      "Servo motorlar, motor sürücü, sensör seti ve Qybit SDK örnek projeleri içeren robotik başlangıç paketi.",
    price: 1599.0,
    stock: 55,
    image_url: '/products/robotics.jpg',
    category_slug: "gelistirici-kitleri",
    is_featured: 1,
  },
  {
    name: "FPGA Prototyping Bundle",
    description:
      "FPGA geliştirme kartı, JTAG programlayıcı ve dijital tasarım örnek projeleri içeren paket.",
    price: 4299.0,
    stock: 20,
    image_url: '/products/fpga.webp',
    category_slug: "gelistirici-kitleri",
    is_featured: 0,
  },
  {
    name: "SMD Lehim İstasyonu Seti",
    description:
      "Hassas sıcaklık kontrolü, çoklu uç ve ESD güvenli çalışma alanı sunan elektronik montaj seti.",
    price: 749.0,
    stock: 65,
    image_url: '/products/smd.jpg',
    category_slug: "gelistirici-kitleri",
    is_featured: 0,
  },
  {
    name: "Qybit Vision AI Box",
    description:
      "Üretim hattı kalite kontrolü için önceden eğitilmiş görüntü sınıflandırma ve anomali tespit cihazı.",
    price: 5999.0,
    stock: 25,
    image_url: '/products/vision.jpg',
    category_slug: "donanim-iot",
    is_featured: 1,
  },
];

export function seedDatabase(database: Database.Database): void {
  const insertCategory = database.prepare(
    "INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)"
  );
  const insertProduct = database.prepare(
    `INSERT INTO products (name, description, price, stock, image_url, category_id, is_featured)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const insertUser = database.prepare(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
  );

  const categoryMap = new Map<string, number>();

  const seedCategories = database.transaction(() => {
    for (const cat of categories) {
      const result = insertCategory.run(cat.name, cat.slug, cat.description);
      categoryMap.set(cat.slug, Number(result.lastInsertRowid));
    }
  });
  seedCategories();

  const seedProducts = database.transaction(() => {
    for (const product of products) {
      const categoryId = categoryMap.get(product.category_slug);
      if (!categoryId) continue;

      insertProduct.run(
        product.name,
        product.description,
        product.price,
        product.stock,
        product.image_url,
        categoryId,
        product.is_featured
      );
    }
  });
  seedProducts();

  const passwordHash = bcrypt.hashSync("demo123", 10);
  insertUser.run("Demo Kullanıcı", "demo@qybitlabs.com", passwordHash, "user");
  insertUser.run("Qybit Admin", "admin@qybitlabs.com", passwordHash, "admin");

  const insertReview = database.prepare(
    "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)"
  );

  const sampleReviews = [
    {
      productId: 1,
      userId: 1,
      rating: 5,
      comment:
        "Qybit AI Studio Pro, ekip içi model geliştirme sürecimizi ciddi ölçüde hızlandırdı.",
    },
    {
      productId: 1,
      userId: 2,
      rating: 4,
      comment: "Arayüz modern ve kullanımı kolay. API entegrasyonu sorunsuz.",
    },
    {
      productId: 8,
      userId: 1,
      rating: 5,
      comment:
        "Qybit Machinery sensör paketi fabrika hattımızda mükemmel çalışıyor.",
    },
    {
      productId: 11,
      userId: 2,
      rating: 5,
      comment: "Maker Board V3 ile prototipleme süremiz yarıya indi.",
    },
    {
      productId: 5,
      userId: 1,
      rating: 4,
      comment: "DevOps Suite CI/CD pipeline kurulumunu çok kolaylaştırdı.",
    },
  ];

  for (const review of sampleReviews) {
    insertReview.run(
      review.productId,
      review.userId,
      review.rating,
      review.comment
    );
  }
}
