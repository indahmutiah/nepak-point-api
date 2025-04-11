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
    slug: "flypower-tornado-800-raket-badminton-black-red-free-tas-bonus-2r-kaos",
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
    categorySlug: "accessories",
  },
  {
    name: "Kickstart Men's Badminton Shoes - Off White",
    slug: "kickstart-mens-badminton-shoes-off-white",
    series: "Kickstart Men's Badminton Shoes",
    description: `
      <p>
        Sepatu ini dirancang untuk bergaya, nyaman, dan meningkatkan permainan.
        Sepatu ini memiliki kombinasi kulit sintetis & kain rajut / bagian atas
        mesh yang dapat bernapas, midsole yang empuk dengan penopang serat
        karbon, dan sol luar dari karet non-marking yang memberikan daya
        cengkeram dan stabilitas. Dengan sepatu badminton Astec, Anda dapat
        tampil dan terlihat memukau di lapangan!
      </p>
    `,
    price: 599000,
    categorySlug: "shoes",
    imageUrl:
      "https://ucarecdn.com/da7bfb2b-1ae0-4f31-8671-a47681426c4e/-/preview/800x800/",
  },
];
