"use client";
import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png";
import { useState } from "react";

const ProductImage = ({ imageUrls }) => {
  const [selectedImage, setSelectedImage] = useState(imageUrls?.[0]);

  return (
    <div>
      <Image
        src={selectedImage ?? placeholder}
        alt=""
        height={600}
        width={600}
        className="w-auto h-120 mx-auto rounded-2xl object-cover"
      />

      <div className="flex gap-3 mt-10 justify-center">
        {imageUrls?.map((url, index) => (
          <Image
            key={index}
            src={url ?? placeholder}
            alt=""
            height={250}
            width={250}
            className="h-20 w-20 object-cover rounded-md border-2 border-primary/50"
            onClick={() => setSelectedImage(url)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImage;