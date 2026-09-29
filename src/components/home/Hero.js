import heroImg from "@/assets/images/hero.jpg";
import { ABOUT_ROUTE, PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="hero" className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-8 lg:gap-16">
          <Image
            src={heroImg}
            alt="Hero image"
            height={900}
            width={1200}
            className="max-w-full w-auto h-full rounded-2xl shadow-lg"
          />
          <div>
            <span className="text-accent bg-accent/10 text-xs font-medium px-4 py-1 rounded-xl">
              Latest Collection 2026 ⚡
            </span>
            <h1 className="mt-2 text-4xl dark:text-white font-bold tracking-tight md:text-5xl lg:text-6xl">
              Choose Your Everyday Style
            </h1>
            <p className="text-light dark:text-gray-400 py-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
              quod saepe minus ex doloribus voluptatum, culpa asperiores? Ex
              soluta cum, modi exercitationem dicta quod, explicabo enim,
              eligendi qui in ipsa.
            </p>
            <Link
              href={PRODUCTS_ROUTE}
              className="bg-primary rounded-3xl text-white py-2 px-8 transition ease duration-300 hover:shadow-lg"
            >
              Shop Now →
            </Link>
            <Link
              href={ABOUT_ROUTE}
              className="bg-tranparent rounded-3xl border-2 border-primary text-primary px-8 py-2 transition ease duration-300 mx-2 hover:bg-primary hover:text-white"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;