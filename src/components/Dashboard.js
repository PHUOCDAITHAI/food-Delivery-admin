import React, {useState, useEffect} from 'react'
import { db } from '../config/firebase';
// import { Icon } from 'react-icons-kit'
// import {shoppingBag} from 'react-icons-kit/fa/shoppingBag'
// import {money} from 'react-icons-kit/fa/money'
import iconOrder from '../images/order.png'
import iconVND from '../images/VND.png'
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    db.collection('Buyer-Personal-Info').orderBy('createdAt', 'desc').onSnapshot(snap => {
      setCustomers(snap.docs.map(doc => doc.data()))
    })
  }, [])

  const price = customers.map((item) => {
    return item.CartPrice;
  })
  const reducerOfPrice = (accumulator, currentValue) => accumulator+currentValue;
  const totalPrice = price.reduce(reducerOfPrice, 0);

  const CustomerItem = ({item}) => {
    const d = item.time;
    let text = d;
    return (
      <tr className='tr-hover'>
        <td>#OD{item.orderId}</td>
        <td>{item.FullName}</td>
        <td>{item.CartPrice}</td>
        <td>{text.substring(0,text.lastIndexOf('GMT'))}</td>
        <td>
          {
            item.status ? (
              <Link to={{
                pathname: '/details',
                uid: item.uid
              }} className='paid'>Đã thanh toán</Link>
            ) : <Link to={{
                pathname: '/details',
                uid: item.uid
              }} className='shipping'>Đang giao hàng</Link>
          }
        </td>
      </tr>
    )
  }
  return (
    <div>
      <h1 style={{marginBottom: '20px'}}>Dashboard</h1>
      <div className='total'>
        <div className='total-income'>
          <img src={iconVND} style={{width: '50px', height: '50px'}} alt="" />
          <div className='total-ml-10'>
            <h1>{totalPrice}</h1>
            <h3 style={{marginTop: '10px'}}>Tổng số tiền</h3>
          </div>
        </div>
        <div className='total-orders'>
          <img src={iconOrder} style={{width: '50px', height: '50px'}} alt="" />
          <div className='total-ml-10'>
            <h1>{customers.length}</h1>
            <h3 style={{marginTop: '10px'}}>Tổng đơn đặt hàng</h3>
          </div>
        </div>
      </div>
      <div className='table-wrapper' style={{marginTop: '30px'}}>
        <h1 style={{margin: '10px 20px'}}>Đơn hàng mới nhất</h1>
        <table>
            <thead>
            <tr>
                <th>Order ID</th>
                <th>Họ và Tên</th>
                <th>Tổng số tiền</th>
                <th>Ngày/Tháng/năm</th>
                <th>Trạng thái</th>
            </tr>
            </thead>
            <tbody>
            {
              customers && customers.map((item, index) => (
                <CustomerItem key={index} item={item} index={index} />
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

export default Dashboard