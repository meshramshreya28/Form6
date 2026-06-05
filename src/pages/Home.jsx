import React from 'react';
import Hero from '../components/Hero';
import ShopByBenefit from '../components/ShopByBenefit';
import FeatureSection from '../components/FeatureSection';
import BenefitBanner from '../components/BenefitBanner';
import ProductList from '../components/ProductList';
import Marquee from '../components/Marquee';
import CommitmentSection from '../components/CommitmentSection';
import SubscribeBanner from '../components/SubscribeBanner';

const Home = () => {
  return (
    <main>
      <Hero />
      <Marquee />
      <ShopByBenefit />
      <FeatureSection />
      <BenefitBanner />
      <ProductList />
      <CommitmentSection />
      <SubscribeBanner />
    </main>
  );
};

export default Home;
