import { getAllProductSlugs } from '@/lib/products';

export function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    productId: slug,
  }));
}
