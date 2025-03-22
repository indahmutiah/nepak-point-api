import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { dataProducts } from "@/data/product";

async function main() {
  for (const product of dataProducts) {
    const resultproduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });

    console.log(`product: ${resultproduct.name}`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
