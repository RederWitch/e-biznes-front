import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const getImageUrl = (name) => {
  if (name) {
    name = name.replace(/\s+/g, '-').toLowerCase();
    return `${process.env.PUBLIC_URL}/products/${name}.jpg`;
  } else {
    return '';
  }
}

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(product.id, qty));
    history.push(`/cart`);
  };

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Ładowanie...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={getImageUrl(product.name)} alt={product.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>{product.price} zł</p>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Cena:
                <span>{product.price} zł</span>
              </p>
              <p>
                Ilość
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(20).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Dodaj do koszyka
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
