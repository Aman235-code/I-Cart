import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0].url);
  return (
    <div className="flex gap-5 w-max">
      <div className="gap-5 flex flex-col">
        {images.map((img) => {
          return (
            <img
              onClick={() => setMainImage(img.url)}
              src={img.url}
              className="cursor-pointer w-20 h-20 border shadow-lg"
            />
          );
        })}
      </div>
      <Zoom>
        <img src={mainImage} className="w-125 border shadow-lg" />
      </Zoom>
    </div>
  );
};

export default ProductImg;
