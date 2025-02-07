import React from "react";
import "./Description.css";

const Description = (props) => {
  const { product } = props;
  return (
    <div className="descriptionBox">
      <div className="description-navigator">
        <div className="description-nav-box">Description</div>
        <div className="description-nav-box fade">
          Reviews ({product.rating.count})
        </div>
      </div>
      <div className="description">
        <p>
          {product.description}
        </p>
        
      </div>
    </div>
  );
};

export default Description;
