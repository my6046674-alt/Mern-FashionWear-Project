import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png";

export const LoadingCard = () => {
  return (
    <div className="product-card animate-pulse opacity-70">
      <Image
        className="w-full h-40 object-cover"
        src={placeholder}
        alt="featured"
        height={300}
        width={400}
      />
      <div className=" dark:bg-gray-900 pt-3 px-4 pb-4">
        <div className="w-24 h-5 bg-accent rounded mb-3" />

        <div className=" bg-gray-500 h-7 w-full"></div>
        <div className="py-2 items-center flex gap-2">
          <span className="w-24 h-5 bg-gray-300 inline-block"></span>
        </div>
        <p className="bg-primary w-30 h-7 mt-2">Rs.</p>
        <div className="grid grid-cols-[auto-1fr] justify-between text-center gap-4 my-2">
          <div className="h-9 px-10 bg-background py-2 w-full rounded-3xl "></div>
          <div className="h-9 bg-primary px-4 py-2 w-full  rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <h2 className="mb-8 text-2xl dark:text-white">Feature products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </>
  );
};

export default Loading;
