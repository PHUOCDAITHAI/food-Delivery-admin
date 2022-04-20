import React from 'react'
import { Icon } from 'react-icons-kit';
import {ic_delete} from 'react-icons-kit/md/ic_delete'
import {pencil} from 'react-icons-kit/icomoon/pencil'
import { Link } from 'react-router-dom';
const ProductItem = ({deleteProduct, item}) => {
  return (
    <tr className='tr-hover'>
        <td><img style={{height: '100px', width: '150px'}} src={item.Img} alt="" /></td>
        <td>{item.Title}</td>
        <td>{item.Price}</td>
        <td><Link to={{pathname: '/edit', item}}><Icon className='edit' icon={pencil} size={30} /></Link></td>
        <td><Link to={{pathname: '/delete', item}}><Icon  className='delete' icon={ic_delete} size={30} /></Link></td>
    </tr>
  )
}

export default ProductItem
// onClick={() => deleteProduct(item.ID, item.Title)}