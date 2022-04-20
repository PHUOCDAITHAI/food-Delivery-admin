import React, { useState, useEffect } from 'react'
import { db } from '../config/firebase'
import { Icon } from 'react-icons-kit'
import {arrowLeft} from 'react-icons-kit/fa/arrowLeft'
import { Link } from 'react-router-dom'
const Details = (props) => {
    const {uid} = props.location;
    const [products, setProducts] = useState([]);
    useEffect(() => {
        db.collection('Buyer-Cart ' + uid).onSnapshot(snap => {
            setProducts(snap.docs.map(doc => doc.data()))
        })
    },[])
    const ProductItem = ({item}) => {
        return (
            <tr className='tr-hover'>
                <td><img style={{height: '100px', width: '150px'}} src={item.Img} alt="" /></td>
                <td>{item.Title}</td>
                <td>{item.qty}</td>
                <td>{item.qty*item.Price}</td>
            </tr>
        )
      }
    return (
        <div>
            <div style={{marginBottom: "20px", display: "flex", alignItems: "center"}}>
                <Link to="/" className='arrow-left'><Icon icon={arrowLeft} size={50} /></Link>
                <h1 style={{marginLeft: "10px"}}>Thông tin chi tiết đơn hàng</h1>
            </div>
            
            <div className='table-wrapper' style={{marginTop: '30px'}}>
                <table>
                    <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    products && products.map((item, index) => (
                        <ProductItem key={index} item={item} index={index} />
                    ))
                    }
                    </tbody>
                    
                </table>
                <div className='page-pagination'>
                    {/* {
                    pageNumbers.map(number => (
                        <div onClick={() => paginate(number)} key={number} className={`page-pagination-number ${currentPage===number ? 'active' : ''}`}>
                        <h5>{number}</h5>
                        </div>
                    ))
                    } */}
                </div>
            </div>
        </div>
    )
}

export default Details