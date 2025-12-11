import { Metadata } from 'next';
import { getProductBySlug, getAllProductSlugs } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = getProductBySlug(productId);

  if (!product) {
    return {
      title: 'Product Not Found - Imbari Coffee',
    };
  }

  const baseUrl = 'https://www.imbaricoffee.com';
  const productUrl = `${baseUrl}/shop/${product.slug}`;
  const imageUrl = `${baseUrl}${product.image}`;

  return {
    title: `${product.name} ${product.size} - Imbari Coffee`,
    description: product.longDescription || product.description,
    openGraph: {
      title: `${product.name} - ${formatCurrency(product.price)}`,
      description: product.longDescription || product.description,
      url: productUrl,
      siteName: 'Imbari Coffee',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${formatCurrency(product.price)}`,
      description: product.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({
    productId: slug,
  }));
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
