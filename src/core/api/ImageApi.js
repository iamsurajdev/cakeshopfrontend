import React from "react";
import { API } from "../../backend";

const ImageApi = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : `https://cdn.pixabay.com/photo/2015/11/09/14/43/laptop-1035345_1280.jpg`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageApi;
