import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BudgetEstimator from "../components/BudgetEstimator";

function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Services />
        <BudgetEstimator />
        <About />
        <Reviews />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default Home;