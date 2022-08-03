import { NextPage } from 'next';
import Layout from '../components/Layout';
import PricingComponent from '../components/Pricing';

const Pricing: NextPage = () => {
  return (
    <Layout>
      <PricingComponent />
    </Layout>
  )
};

export default Pricing;
