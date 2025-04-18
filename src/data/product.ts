import { html } from "hono/html";

type SeedProduct = {
  name: string;
  slug: string;
  series: string;
  description: string;
  price: number;
  imageUrl: string;
  categorySlug: string;
};

export const dataProducts: SeedProduct[] = [
  {
    name: "Flypower Tornado 800 Raket Badminton - Black Red Free Tas Bonus 2R + Kaos",
    slug: "flypower-tornado-800-raket-badminton-black-red",
    series: "Flypower Tornado 800",
    description:
      "Flypower Tornado 800 Raket Badminton - Black Red Free Tas Bonus 2R + Kaos",
    price: 1000000,
    imageUrl:
      "https://ucarecdn.com/3e88446d-e811-455d-9dc0-4d07aea2a026/-/preview/500x500/",
    categorySlug: "racket",
  },
  {
    name: "Decathlon Kok Bulu FSC 930 Speed 77 X 12",
    slug: "decathlon-kok-bulu-fsc-930-speed-77-x-12",
    series: "Decathlon Kok Bulu FSC 930",
    description: ` 
    <p>
      Decathlon Kok Bulu FSC 930 Speed 77 X 12 merupakan kok bulu yang terbuat
      dari bulu angsa yang berkualitas tinggi. Kok bulu ini memiliki kecepatan
      77 dan terdiri dari 12 buah kok bulu. Ideal digunakan untuk kompetisi dan
      latihan performa tinggi.
    </p>`,
    price: 549000,
    imageUrl:
      "https://ucarecdn.com/3923ce55-fb95-44cf-8256-eb5bea1eca4e/-/preview/800x800/",
    categorySlug: "shuttlecock",
  },
  {
    name: "Yonex Raket Badminton Astrox 99 Pro",
    slug: "yonex-raket-badminton-astrox-99-pro",
    series: "Yonex Astrox 99 Pro",
    description:
      "Yonex Raket Badminton Astrox 99 Pro merupakan raket badminton yang dirancang untuk meningkatkan kekuatan dan kecepatan permainan Anda. Dengan teknologi terbaru dari Yonex, raket ini memberikan performa yang optimal di lapangan.",
    price: 3500000,
    imageUrl:
      "https://ucarecdn.com/1df4e864-e75d-41d6-8b68-921aaf03d47b/-/preview/500x500/",
    categorySlug: "racket",
  },
  {
    name: "Lining Badminton Axforce Blast 6U Tanpa Senar",
    slug: "lining-badminton-axforce-blast-6u-tanpa-senar",
    series: "Lining Axforce Blast - 6U",
    description: `
    <p>
      Lining Axforce Blast - 6U Tanpa Senar adalah lingkaran yang dibuat dari
      lingkaran yang berkualitas tinggi. Dengan teknologi yang baru, lingkaran
      ini memberikan lingkaran yang sangat kuat dan mudah digunakan. Diperuntukkan untuk pemain profesional.
    </p>`,
    price: 1000000,
    imageUrl:
      "https://ucarecdn.com/a2c67453-392d-4010-82e2-a93805e9247f/-/preview/500x500/",
    categorySlug: "racket",
  },
  {
    name: "Senar Badminton Yonex BG 66 Ultimax",
    slug: "senar-badminton-yonex-bg-66-ultimax",
    series: "BG 66 Ultimax White",
    description: `
      <p>
        Senar Badminton Yonex BG 66 Ultimax adalah senar badminton yang dibuat
        dari senar badminton yang berkualitas tinggi. Keseimbangan sempurna
        antara kecepatan maksimum, kendali, dan daya tahan, menjadikannya
        pilihan terbaik bagi pemain top dunia.
      </p>
      <ul>
        <li>Power tinggi + kontrol bagus, cocok untuk offensive play.</li>
        <li>Tension max: ~30 lbs</li>
        <li>Diameter: 0.65 mm</li>
        <li>Warna: Putih</li>
      </ul>
    `,
    price: 105000,
    imageUrl:
      "https://ucarecdn.com/30226baa-6575-4b52-8a2f-d1efbbe1c3c3/-/preview/500x500/",
    categorySlug: "accessories",
  },
  {
    name: "Two Tone Wristband - Red",
    slug: "two-tone-wristband-red",
    series: "Lining Two Tone Wristband Red",
    description: ` <p>
        Lining Two Tone Wristband - Red dirancang untuk mendukung Anda dalam
        setiap pertandingan dengan kenyamanan dan dukungan yang luar biasa.
        Lupakan kekhawatiran Anda tentang keringat dan fokuslah pada permainan
        Anda. Gelang ini dibuat dengan kain yang sangat menyerap dengan desain
        warna solid yang lembut untuk permainan tanpa gangguan. Gelang ini
        dibuat dengan katun rajutan kepadatan tinggi yang memberikan
        fleksibilitas luar biasa dan dukungan yang baik untuk menjaga
        pergelangan tangan Anda dalam posisi netral.
      </p>
      <ul>
        <li>Material: 90% Cotton, 6% Elastane, 4% Nylon.</li>
        <li>Using for: Professional / Senior</li>
      </ul>`,
    price: 49800,
    imageUrl:
      "https://ucarecdn.com/4128d118-afbd-43fa-93b3-f9a40049d898/-/preview/500x500/",
    categorySlug: "accessories",
  },
  {
    name: "Gold Shuttlecock Badminton",
    slug: "gold-shuttlecock-badminton",
    series: "Flypower Gold Shuttlecock",
    description: `
      <p>
        Flypower Gold Shuttlecock Badminton adalah shuttlecock yang terbuat
        dari bulu angsa asli dan memiliki kecepatan 77. Cocok untuk latihan dan
        pertandingan. Dapat digunakan di lapangan indoor maupun outdoor.
      </p>
      <ul>
        <li>Speed: 77</li>
        <li>Material: Goose feather</li>
        <li>Quantity: 12 pieces</li>
      </ul>`,
    price: 400000,
    imageUrl:
      "https://ucarecdn.com/609c072a-2791-4f13-a775-2c59c12f122c/-/preview/500x500/",
    categorySlug: "shuttlecock",
  },
];
