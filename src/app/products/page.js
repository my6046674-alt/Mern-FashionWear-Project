import { getBrands, getCategories, getProducts } from "@/api/products";
import Link from "next/link";
import ProductCard from "./_components/Card";
import { LoadingCard } from "./loading";
import Filters from "./_components/Filters";

export const metadata={
  title:"Products"
}

const ProductsPage = async ({searchParams}) => {
  console.log(await searchParams);

  const products = await getProducts(await searchParams);
  const brands= await getBrands();
  const categories= await getCategories();

  return <>
         <h2 className='mb-8 text-2xl dark:text-white'>Feature products</h2>
   <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr">
    <Filters brands={brands} categories={categories} />
      <div className="self-start grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
         {products.map((product, index) => (
          <ProductCard product={product} key={index} />
          ))}
      </div>
</div>

  
    
  </>;
};

export default ProductsPage;
