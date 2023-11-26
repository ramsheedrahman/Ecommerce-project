import {React,useState}from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbar.css'
import { useCart } from '../Context/cart';
import { Badge } from 'react-bootstrap';
function Header() {
  const[cart,setCart]=useCart([])
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const [isOpen, setIsOpen] = useState(false);
  const User=  useSelector((state) => state.user.user);
  const logOut=()=>{
    localStorage.removeItem("auth");

  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <nav className={`navbar ${isOpen ? 'mbscreen' : ''}`}>
      <div className="navbar-logo">
        <a href="#">A-ROF TRADERS</a>
      </div>
      <ul className="navbar-menu">
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/category"}>Category</Link></li>
        <li>
        <Link to={"/cartpage"}>
        <Badge count={0} showZero>

                    Cart {totalQuantity}
                    </Badge>
                    </Link>
                  
                  </li>
        {User ? 
        <li><Link to={`/dashboard/${User.role === 1 ? 'admin' : 'user'}`}>Dashboard</Link></li>
         :
         null
        }
        {!User ? 
        <li><Link to={"/login"}>Login</Link></li>
        :

        <li> <Link href="" onClick={logOut}>Logout</Link> </li>
}
      </ul>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Header