import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import AuthService from "../services/AuthService";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(AuthService.isLoggedIn());
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={process.env.PUBLIC_URL + '/toyshop-logo.png'} height={100} alt="coffe-shop-logo"/>
        </Link>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Koszyk <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        {
          !isLoggedIn ?
        <li>
         <Link to="/login" className="log_in_link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Zaloguj się
            </span>
          </Link>
        </li>
        :
        <li>
         <Link to="/" onClick={() => handleLogout()} className="log_in_link ">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Wyloguj się
            </span>
          </Link>
        </li>
      }
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
