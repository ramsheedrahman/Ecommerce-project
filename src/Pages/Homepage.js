import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {Checkbox ,Radio} from "antd";
import { Prices } from "../Components/Routes/Price";
import SearchInput from "../Components/Forms/SerachInput"
import { useNavigate} from "react-router-dom";
import { useState,useEffect } from 'react';
import '../Styles/Homepage.css'
import { useCart } from '../Components/Context/cart';
function Homepage() {
  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const [categories,setCategories]=useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [cart,setCart]=useCart()
  const handleCheckboxChange = (value,c) => {
    let all=[...selectedCategories]
    if(value){
      all.push(c)
    }
    else{
      all.filter((category)=> category !== c)
    }
    setSelectedCategories(all)
  //   if(value){
  //   if (selectedCategories.includes(category)) {
  //     setSelectedCategories(selectedCategories.filter((c) => c !== category));
  //   } else {
  //     setSelectedCategories([...selectedCategories, category]);
  //   }
  // }
  };
  
  const handleAddtoCart = (p) => {
    const existingProduct = cart.find((item) => item._id === p._id);
  
    if (existingProduct) {
      // If the product already exists in the cart, update its quantity
      const updatedCart = cart.map((item) =>
        item._id === p._id ? { ...item, quantity: item.quantity + 1 } : item
      );
  
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If the product is not in the cart, add it with quantity 1
      const updatedCart = [...cart, { ...p, quantity: 1 }];
  
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  
  console.log(selectedCategories);
  console.log(cart);
  
    const getAllcategory=async()=>{
      try {
       const {data} =await axios.get("http://localhost:8000/category/get-category")
       if(data.success){
        setCategories(data.category)
       }
      } catch (error) {
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
      }
    }
    useEffect(()=>{
      getAllcategory()}
      ,[])
    //getall products
    const getAllProducts = async () => {
      try {
       
          const { data } = await axios.get("http://localhost:8000/product/get-allproducts");
          setProducts(data.products);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong");
      }
    };
    const handleDropdownChange = (selectedCategoryId) => {
      if (selectedCategoryId === 'all') {
        // Handle the case where 'All Categories' is selected
        setSelectedCategories([]); // Clear the selected categories array
      } else {
        // Handle the case where a specific category is selected
        setSelectedCategories([selectedCategoryId]);
      }
    };
    
    const getFilteredProducts=async ()=>{
      try {
        const filter= await axios.post("http://localhost:8000/product/filter-products",{selectedCategories,selectedPrices})
           console.log(filter);
            setProducts(filter.data.products)
      } catch (error) {
        console.log(error);
        toast.error(error)
      }
      
    }
  
    //lifecycle method
    useEffect(() => {
      if(!selectedCategories.length || !setSelectedPrices.length) getAllProducts();
    }, []);
    useEffect(() => {
      if(selectedCategories.length ||  setSelectedPrices.length) getFilteredProducts();
    }, [selectedCategories,selectedPrices]);
  const data= useSelector((state) => state.user.user);
  return (
    <Layout>
      <div className="row dashboard" style={{zIndex:"-1"}}>
      <div className="col-12 col-md-6 my-3">
          <SearchInput/>
                </div>
            

<div className="col-12 col-md-6 my-3">
<form>
									<select class="input-select">
										<option value="0">All Categories</option>
										<option value="1">Category 01</option>
										<option value="1">Category 02</option>
									</select>
								</form>
</div>
<div className="row">
  <div className="col-12 m-2">
  <img className='home-image' src="/Web-Banner_Long_Newborn.jpg" alt="mmmm" />

  </div>
</div>
<div className="conatiner-fluid">
<div className="row">
<div className=" col-12 filter-section">
<section>
        <label for="category">Filter by Category:</label>
        <select id="category"   onChange={(e) => handleDropdownChange(e.target.value)}>
          {categories.map((category)=>(
          <option value={category._id} >{category.name}</option>

          ))}
           
        </select>

        <label for="price">Filter by Price:</label>
        <select id="category" onChange={e => setSelectedPrices(e.target.value)}>
          {Prices.map((category)=>(
          <option value={category.array} >{category.name}</option>

          ))}
        </select>

    </section>
</div>
</div>
</div>
 <div className="col-3 col-md-2 filter "> 
      <div className="d-flex flex-column">
      <div className="heading">
        <h4 className="text-start"> Filter by Categories</h4>
        </div>
  {categories.map((category) => (
    <Checkbox className="checkbox" key={category._id} onChange={(e) => handleCheckboxChange(e.target.checked,category._id)}>
      {category.name}
    </Checkbox>
 ) )}
</div>
<div className="d-flex flex-column">
<div className="heading">
  <h4 className="text-start">Filter by Prices</h4>
</div>
  <Radio.Group 
    onChange={e => setSelectedPrices(e.target.value)}
    style={{ textAlign:'left' }}
  >
    {Prices.map((price) => (
      <div key={price._id}>
        <Radio className="radiobox" value={price.array}>{price.name}</Radio>
      </div>
    ))}
  </Radio.Group>
</div> 
</div>

<div className="col-6">
      <nav className="navbar navbar-expand-lg navbar-dark mt-3 mb-5 shadow p-2" style={{ backgroundColor: "#607D8B" }}>
        <a className="navbar-brand" href="#">Categories:</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent2"
          aria-controls="navbarSupportedContent2"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent2">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <a className="nav-link text-white" href="#">All</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Shirts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Sport wears</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Outwears</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>


        <div className="col-9 col-md-10 product-section"  >
          <div className="row">
            {products?.map((p) => (
              <div className=" col-md-3 d-flex justify-content-center ">
              {/* <Li
                key={p._id}
                to={`/dashboard/admin/product/${p._id}`}
                className="product-link"
                style={{textDecoration:'none'}}
              > */}
                <div className="card m-2" style={{ width: "16rem"}}>
                  <img 
                    src={`http://localhost:8000/product/get-productphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{height:'14rem', minHeight:'14rem',maxHeight:'14rem'}}
                  />
                  <div className="card-body" >
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-primary mx-1" onClick={()=> navigate(`/productdetails/${p._id}`)}>Aboutmore</button>
                    <button className="btn btn-primary" onClick={()=>handleAddtoCart(p)}>Add to Cart</button>
                  </div>
                </div>
            </div>))} 
          </div>
        </div>
      
            </div>
    </Layout>
  
  )
}

export default Homepage
