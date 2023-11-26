import React from 'react';
import Layout from '../../../Components/Layout/Layout';
import AdminMenu from '../../../Components/Layout/Adminmenu';
import { useSelector } from 'react-redux';
import Testmenu from '../../../Components/Layout/Testmenu';

function AdminDasboard() {
  const User = useSelector((state) => state.user.user);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row" >
          {/* Mobile view (col-xs-12 for full width) */}
          <div className="col-2" style={{backgroundColor:'#deddd9'}}>
            <Testmenu />
          </div>
          <div className="col-10" style={{backgroundColor:'#deddd9', minHeight: '80vh' ,zIndex:-1}} >
            <div className="cardd">
              <div className="card-header text-black">
                <h3>Welcome, {User.name}!</h3>
              </div>
               <div className="cardd-body">
                <div className="row">
                  <div className="col-5">
                    <div className="card">
                      <div className="card-header">
                        <h4>Recent Activity</h4>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">You created a new category: [Category name].</li>
                        <li className="list-group-item">You edited the product: [Product name].</li>
                        <li className="list-group-item">You received a new order: [Order number].</li>
                        <li className="list-group-item">You created a new user: [User name].</li>
                      </ul>
                    </div>
                  </div>
                  <div className="card col-5">
                    <div className="card-header">
                      <h4>System Info</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Total products: [Number of products]</li>
                      <li className="list-group-item">Total orders: [Number of orders]</li>
                      <li className="list-group-item">Total users: [Number of users]</li>
                      <li className="list-group-item">Server uptime: [Server uptime]</li>
                    </ul>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDasboard;
