import React from 'react'
import { db } from '../config/firebase';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useHistory} from 'react-router-dom'
const Delete = (props) => {
    const history = useHistory();
    const {ID, Title} = props.location.item;
    db.collection('Products').doc(ID).delete().then(() => {
        history.push('/products')
        toast.success(`Xóa sản phẩm ${Title} thành công!`, {
            autoClose: 2000
        });
    })
    return (
        <div></div>
    )
}

export default Delete