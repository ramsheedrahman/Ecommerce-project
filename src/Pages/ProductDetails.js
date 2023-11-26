import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/ProductDetails.css';
import { useParams } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts,setSimilarProducts]=useState([])

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/product/get-product/${id}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);

    } catch (error) {
      console.log(error.message);
    }
  };

  const getSimilarProduct=async(pid,cid)=>{
    try {
      const {data}=await axios.get(`http://localhost:8000/product/get-relatedproducts/${pid}/${cid}`)
      setSimilarProducts(data?.relatedProducts)
      console.log(data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  return (
    <Layout>
      <div className="pd-container-fluid">
        <div className="product-card">
          <div className="product-image">
            <img src={`http://localhost:8000/product/get-productphoto/${id}`} alt="Product" />
          </div>
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>{product?.category?.name}</p>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <div className="product-actions">
              <button className="update-button">Update</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        </div>
        
          <div>
            
            <div>
            <p className='heading-similar'>Similar Products</p>

            {similarProducts?.map((p) => (
              <div className="d-flex justify-content-center ">
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
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
            </div>))} 
          </div>
          </div>
          
      </div>
    </Layout>
  );
}

export default ProductDetails;
