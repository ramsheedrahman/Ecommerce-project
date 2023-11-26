import React from 'react'
import Layout from '../../../Components/Layout/Layout'
import UserMenu from '../../../Components/Layout/UserMenu'

function Dashboard() {
  
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

