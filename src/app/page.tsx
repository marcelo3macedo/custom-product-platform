import Benefits from "@/components/store/Benefits";
import Categories from "@/components/store/Categories";
import Footer from "@/components/store/Footer";
import Header from "@/components/store/Header";
import Hero from "@/components/store/Hero";
import ProductGrid from "@/components/store/ProductGrid";
import PromoBanner from "@/components/store/PromoBanner";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <Hero />
        <Benefits />
        <Categories />
        <ProductGrid />
        <PromoBanner />
      </main>
      <Footer />
    </>
  );
}
