import Image from "next/image";

async function fetchProductsById(id) {
  const product = await fetch(
    `https://mern-20251103-api.vercel.app/api/products/${id}`,
  ).then((data) => data.json());

  if (!product.name) {
    throw "product not found";
  }
  return product;
}

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProductsById(id);

  return {
    title: product.name,
    description: `${product.name} ${product.brand} ${product.category}`,
  };
};

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;

  const product = await fetchProductsById(id);

  return (
    <div>
      <Image
        src={product.imageUrls[0]}
        alt={product.name}
        height={400}
        width={600}
        className="w-auto h-64"
      />
      <h1 className="text-3xl">{product.name}</h1>
      <p>{product.brand}</p>
      <p>{product.category}</p>
      <p>Rs. {product.price}</p>
      <p>Rs. {product.description}</p>
    </div>
  );
};

export default ProductDetailsPage;
