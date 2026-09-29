import { getProducts } from "@/api/products";
import ProductCard from "../../_components/Card";

const SuggestedProducts = async ({ category }) => {
  const products = await getProducts({ category, limit: 4 });

  return (
    <div className="self-start grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
      {products?.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))}
    </div>
  );
};

export default SuggestedProducts;