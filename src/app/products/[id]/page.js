import { getProductById, getProducts } from "@/api/products";
import ProductImage from "./_components/ProductImage";
import SuggestedProducts from "./_components/SuggestedProducts";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: `${product.name} ${product.brand || ""} ${product.category || ""}`,
  };
};

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const suggestedProducts = await getProducts({
    category: product.category,
    limit: 4,
  });

  return (
    <main className="container mx-auto px-4 py-12 dark:text-white">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <ProductImage imageUrls={product.imageUrls || []} />

        <div className="space-y-5">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold md:text-5xl">{product.name}</h1>

          <p className="text-xl font-semibold text-primary">Rs. {product.price}</p>

          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <span className="font-semibold text-gray-900 dark:text-white">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold text-gray-900 dark:text-white">Stock:</span> {product.stock ?? "In stock"}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-3 text-lg font-semibold">Description</h2>
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
        <SuggestedProducts category={product.category} />
      </div>
    </main>
  );
};

export default ProductDetailsPage;
