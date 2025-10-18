import Hero from '../../components/layout/Landing/Hero'
import FeaturedCategories from '../../components/layout/Landing/FeaturedCategories'
import FeaturedProducts from '../../components/layout/Landing/FeaturedProducts'
import Services from '../../components/layout/Landing/Services'
import Newsletter from '../../components/layout/Landing/Newsletter'


const Home = () => {
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Services />
      <Newsletter />
    </main>
  );
};

export default Home;