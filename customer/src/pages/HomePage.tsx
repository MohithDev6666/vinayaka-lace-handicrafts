import { CategorySection } from '../components/home/CategorySection.tsx';
import { CollectionsSection } from '../components/home/CollectionsSection.tsx';
import { CustomerReviews } from '../components/home/CustomerReviews.tsx';
import { FeaturedProducts } from '../components/home/FeaturedProducts.tsx';
import { HeroCarousel } from '../components/home/HeroCarousel.tsx';
import { NewsletterSection } from '../components/home/NewsletterSection.tsx';
import { TrendingProducts } from '../components/home/TrendingProducts.tsx';
import { TrustBenefits } from '../components/home/TrustBenefits.tsx';
import { usePageTitle } from '../hooks/usePageTitle.ts';

export function HomePage() {
  usePageTitle('Vinayaka | New Lace Handicrafts');

  return (
    <>
      <HeroCarousel />
      <CategorySection />
      <FeaturedProducts />
      <CollectionsSection />
      <CustomerReviews />
      <TrendingProducts />
      <TrustBenefits />
      <NewsletterSection />
    </>
  );
}
