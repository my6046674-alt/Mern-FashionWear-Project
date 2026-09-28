import Image from "next/image";

import watchImage from "@/assets/images/watch.png";

const ProductBanner = () => {
  return (
    <div className="rounded-xl p-10 bg-linear-to-r from-blue-800 via-blue-300 to-blue-700 shadow-xl grid grid-cols-3 items-center">
      <h2 className="font-black text-white  text-center grid sm:text-3xl lg:text-6xl md:text-3xl">
        New Arrival
      </h2>
      <Image
        src={watchImage}
        height={400}
        width={400}
        className="h-36 w-auto mx-auto"
        alt="watch"
      />
      <h4 className="flex flex-col items-center justify-center rounded-full bg-white shadow border-4 border-blue-200 w-30 h-30 font-bold text-xl text-center">
        <span className="text-3xl text-red-600">50%</span> Off
      </h4>
    </div>
  );
};

export default ProductBanner;