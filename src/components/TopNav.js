import React, { useState, useEffect } from 'react'
import Icon from 'react-icons-kit'
import {search} from 'react-icons-kit/fa/search'
import { auth, db } from '../config/firebase'
const TopNav = () => {
  const [img, setImg] = useState('');
  const uid = auth.currentUser.uid;
  useEffect(() => {
    db.collection('users').doc(uid).get().then((doc) => {
      setImg(doc.data().Img)
    })
  },[])
  console.log(uid)
  return (
    <div className='topnav'>
        <div className="topnav__search">
            <Icon className='iconSearch' icon={search} size={20} />
            <input type="text" placeholder='Tìm kiếm ở đây...' />
        </div>
        <div className="topnav__acount">
            <img src={img} alt="" />
            <button onClick={() => auth.signOut()}>Đăng xuất</button>
        </div>
    </div>
  )
}

export default TopNav