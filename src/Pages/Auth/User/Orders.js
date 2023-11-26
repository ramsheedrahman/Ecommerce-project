import React from 'react'
import UserMenu from '../../../Components/Layout/UserMenu'
import Layout from '../../../Components/Layout/Layout'
function Orders() {
  return (
    <Layout>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <UserMenu/>
        </div>
        <div className="col-md-9">
            <h1>Orders</h1>
        </div>
      </div>
    </div>
  </Layout>  )
}

export default Orders