import BreadCrumb from "@/components/BreadCrumb";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const params = useParams();
  const productId = params.id;
  const { products } = useSelector((store) => store.products);

  const product = products.find((item) => item._id === productId);

  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto">
      <BreadCrumb product={product} />
      <div className="mt-10 grid grid-cols-2 items-start">
        <ProductImg images={product.productImg} />
        <ProductDesc product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;
