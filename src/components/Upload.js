import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {db, storage} from '../config/firebase'
const Upload = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState('');
    const [img, setImg] = useState(null);
    const [error, setError] = useState('');
    const types = ['image/png', 'image/jpeg'];
    
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if(selectedFile && types.includes(selectedFile.type)){
            setImg(selectedFile);
        }else {
            setImg(null);
            toast.error('Xin vui lòng chọn loại hình ảnh là png or jpeg !',{
                autoClose: 2000
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`products/${img.name}`).put(img);
        uploadTask.on(`state_changed`, snapshot => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => {
            setError(err.message)
        }, () => {
            storage.ref(`products`).child(img.name).getDownloadURL().then(url =>  {
                db.collection('Products').add({
                    Title: title,
                    // Description: productDescription,
                    Price: Number(price),
                    Img: url,
                    itemId: categories
                }).then(() => {
                    setTitle(''); 
                    setPrice(0);
                    setImg('');
                    setError('');
                    document.getElementById('file').value="";
                    toast.success('Đã tải lên sản phẩm thành công !',{autoClose: 2000})
                }).catch(err => {
                    toast.error('Sản phẩm tải lên không thành công !');
                });
            })
        })
    }
    return (
        <div>
            <h1 style={{marginBottom: '20px'}}>Upload Sản Phẩm</h1>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form-control'>
                    <label>Tên sản phẩm</label> <br />
                    <input 
                        placeholder='Tên sản phẩm ....'
                        className='input'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    /><br />
                    <label>Giá</label> <br />
                    <input 
                        placeholder='Giá ....'
                        className='input'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    /><br />
                    <label>Loại</label> <br />
                    <input 
                        placeholder='Loại ....'
                        className='input'
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        required
                    /><br />
                    <label>Hình ảnh</label> <br />
                    <input
                        onChange={productImgHandler} 
                        id="file"
                        type="file" 
                        className='input'
                        required
                    /><br />
                    <button type='submit'>Tải Lên</button>
                </div>
            </form>
        </div>
    )
}

export default Upload