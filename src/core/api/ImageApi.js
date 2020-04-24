import React from "react";
import { API } from "../../backend";

const ImageApi = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : `https://cdn.pixabay.com/photo/2015/11/09/14/43/laptop-1035345_1280.jpg`;
  return (
    <img
      src={imageUrl}
      alt="photo"
      style={{
        display: "block",
        position: "absolute",
        display: "block",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        width: "100%",
        height: "auto",
        margin: "auto",
      }}
      className="mb-3 rounded"
    />
  );
};

export default ImageApi;
