import React, { useState, useEffect } from 'react'
import { db } from '../config/firebase';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductItem from './ProductItem';
import {useHistory} from 'react-router-dom'
toast.configure();
const Products = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const getProducts = async() => {
        const products = await db.collection('Products').get();
        const  productsArray = [];
        for(var snap of products.docs){
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length===products.docs.length){
                setProducts(productsArray)
            }
        }
    }
    useEffect(() => {
        getProducts();
    },[])
    const indexOfLastProduct = currentPage * perPage
    const indexOfFirstProduct = indexOfLastProduct - perPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfFirstProduct + perPage)
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(products.length / perPage); i++){
        pageNumbers.push(i);
    }
    
    const paginate = (number) => {
        setCurrentPage(number)
    }

    const updateProduct = (item) => {
        // db.collection('Products').doc(item.ID).update({

        // })
    }

    const deleteProduct = (id, title) => {
        db.collection('Products').doc(id).delete().then(() => {
            toast.success(`Xóa sản phẩm ${title} thành công!`, {
                autoClose: 2000
            });
        })
    }
    return (
        <div>
            <h1 style={{marginBottom: '20px'}}>Sản phẩm</h1>
            <div className='table-wrapper'>
                <table>
                    <thead>
                    <tr>
                        <th>Hình Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th colSpan={3}>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        currentProducts && currentProducts.map((item, index) => (
                        <ProductItem deleteProduct={deleteProduct} item={item} key={index}/>
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

export default Products