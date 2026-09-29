import { getProducts } from "@/api/products";
import ProductCard from "@/app/products/_components/Card";

const Featured = async () => {
  const products = await getProducts({ limit: 4 });

  return (
    <section id="featured" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-8 font-bold text-2xl dark:text-white">
          Featured products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.length ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
              No featured products available right now.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Featured;