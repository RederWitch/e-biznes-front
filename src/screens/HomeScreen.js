import {useLocation} from "react-router-dom";
import "./HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { getProducts as listProducts } from "../redux/actions/productActions";

const HomeScreen = () => {
    let location = useLocation();
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const paramEmail = query.get("email");
        const paramAuth = query.get("authenticator");
        if (paramEmail) {
            document.cookie = `email=${paramEmail}; path=/`;
            document.cookie = `oAuth=true; path=/`;
            document.cookie = `authenticator=${decodeURIComponent(
                paramAuth
            ).replaceAll(" ", "+")}; path=/`;
            window.location.href = "/";
        }
    }, []);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Produkty</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Ładowanie...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
