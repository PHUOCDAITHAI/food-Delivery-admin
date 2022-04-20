import React, { useState } from 'react'
import { auth } from '../config/firebase';
import Logo from '../images/ADMIN.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'
const SignIn = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            toast.success('Đăng nhập thành công !', {autoClose: 2000})
            history.push('/')
        }).catch((err) => {
            toast.error(err.message, {autoClose: 2000})
        })
    }
    return (
        <div>
            <div className='form-wrapper'>
                <form onSubmit={handleSubmit} className='form-main'>
                    <div className='form-img'>
                        <img src={Logo} alt="" />
                    </div>
                    <div style={{padding: '20px'}}>
                        <label className='label'>Email</label><br />
                        <input 
                            type="email" 
                            placeholder='Email....' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /><br />
                        <label className='label'>Mật khẩu</label><br />
                        <input 
                            type="password" 
                            placeholder='Mật khẩu....' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        /><br />
                        <button>Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn