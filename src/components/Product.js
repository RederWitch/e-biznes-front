import "./Product.css";
import { Link } from "react-router-dom";

const getImageUrl = (name) => {
  if (name) {
    name = name.replace(/\s+/g, '-').toLowerCase();
    return `${process.env.PUBLIC_URL}/products/${name}.jpg`;
  } else {
    return '';
  }
}

const Product = ({ imageUrl, description, price, name, productId }) => {
  return (
    <div className="product">
      <img src={getImageUrl(name)} alt={name} />
      <div className="product__info">
        <p className="info__name">{name}</p>
        <p className="info__description">{description.substring(0, 100)}...</p>
        <p className="info__price">{price} zł</p>
        <Link to={`/product/${productId}`} className="info__button">
          Podgląd
        </Link>
      </div>
    </div>
  );
};

export default Product;
