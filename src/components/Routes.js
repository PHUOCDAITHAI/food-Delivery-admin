import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Customer from './Customer'
import Dashboard from './Dashboard'
import Delete from './Delete'
import Details from './Details'
import EditProduct from './EditProduct'
import Products from './Products'
import Shipper from './Shipper'
import Upload from './Upload'
const Routes = () => {
  return (
    <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/customer' component={Customer} />
        <Route path='/products' component={Products} />
        <Route path='/upload' component={Upload} />
        <Route path='/edit' component={EditProduct} />
        <Route path='/delete' component={Delete} />
        <Route path='/details' component={Details} />
        <Route path='/shipper' component={Shipper} />
    </Switch> 
  )
}

export default Routes