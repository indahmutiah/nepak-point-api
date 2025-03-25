import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { dataProducts } from "@/data/product";

async function main() {
  // TODO: for loop to seed categories

  for (const product of dataProducts) {
    const { categorySlug, ...productData } = product;

    const resultproduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...productData,
        category: { connect: { slug: categorySlug } },
      },
      create: {
        ...productData,
        category: { connect: { slug: categorySlug } },
      },
    });

    console.log(`🎾 Product: ${resultproduct.name}`);
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
