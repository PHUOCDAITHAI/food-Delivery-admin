import React, { useEffect, useState } from 'react'
import {db} from '../config/firebase';
import '../global/Customer.css'

const Shipper = () => {
  const [shippers, setShippers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  useEffect(() => {
    db.collection('Shipper').onSnapshot(snap => {
        setShippers(snap.docs.map(doc => doc.data()))
    })
  }, [])

  const indexOfLastCustomer = currentPage * perPage
  const indexOfFirstCustomer = indexOfLastCustomer - perPage
  const currentCustomers = shippers.slice(indexOfFirstCustomer, indexOfFirstCustomer + perPage)
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(shippers.length / perPage); i++){
    pageNumbers.push(i);
  }
  
  const paginate = (number) => {
    setCurrentPage(number)
  }

  const CustomerItem = ({index, item}) => {
    return (
      <tr className='tr-hover'>
        <td>{item.FullName}</td>
        <td>{item.Email}</td>
        <td>{item.PhoneNumber}</td>
        <td>{item.TransportFee}</td>
        <td>#OD{item.orderId}</td>
      </tr>
    )
  }
  
  return (
    <div>
      <h1 style={{marginBottom: '20px'}}>Khách Hàng</h1>
      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Họ và Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Phí vận chuyển</th>
              <th>orderId</th>
            </tr>
          </thead>
          <tbody>
            {
              currentCustomers && currentCustomers.map((item, index) => (
                <CustomerItem index={indexOfFirstCustomer} item={item} key={index}/>
              ))
            }
          </tbody>
          
        </table>
        <div className='page-pagination'>
          {
            pageNumbers.map(number => (
              <div onClick={() => paginate(number)} key={number} className={`page-pagination-number ${currentPage===number ? 'active' : ''}`}>
                <h5>{number}</h5>
              </div>
            ))
          }
        </div>
        
      </div>
    </div>
  )
}

export default Shipper