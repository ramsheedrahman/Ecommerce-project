import React from "react";
import './test.css'
import { FaPlus, FaPlusCircle, FaShoppingCart, FaUsers, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Testmenu = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to={'dashboard/admin'}>
            <FaPlus className="icon" />
            <span className="icon-text">Dashborad</span>
            </Link>
            </li>
        <li>
          <Link to={'/dashboard/admin/create-product'}>
            <FaPlus className="icon" />
            <span className="icon-text">Create Products</span>
          </Link>
        </li>
        <li>
          <Link to={"/dashboard/admin/create-category"}
>
            <FaPlusCircle className="icon"/>
            <span className="icon-text">Create Category</span>
          </Link>
        </li>
        <li>
          <Link to={"/dashboard/admin/products"}>
            <FaShoppingCart className="icon" />
            <span className="icon-text">Products</span>
          </Link>
        </li>
        <li>
          <Link  to={"/dashboard/admin/users"}>
            <FaUsers className="icon" />
            <span className="icon-text">Users</span>
            </Link>
            </li>
        <li>
          <Link to={"/dashboard/admin/orders"}>
            <FaShoppingBag className="icon"/>
            <span className="icon-text">Orders</span>
            </Link>
                    </li>
        <li className="logout">
          <a href="/logout">
            <FaSignOutAlt className="icon" />
            <span className="icon-text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Testmenu;
