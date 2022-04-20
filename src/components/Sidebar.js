import React from 'react'
import {Icon} from 'react-icons-kit'
import { Link } from 'react-router-dom'
import logo from '../images/PhuocDai.png'
import {thLarge, userO} from 'react-icons-kit/fa'
import {upload, cart} from 'react-icons-kit/iconic'
import {cube} from 'react-icons-kit/fa/cube'
import {ic_electric_moped} from 'react-icons-kit/md/ic_electric_moped'
const sidebar_routes = [
    {
        "display_name": "Dashboard",
        "route": "/",
        "icon": thLarge
    },
    {
        "display_name": "Khách hàng",
        "route": "/customer",
        "icon": userO
    },
    {
        "display_name": "Sản phẩm",
        "route": "/products",
        "icon": cube
    },
    // {
    //     "display_name": "Đặt hàng",
    //     "route": "/orders",
    //     "icon": cart
    // },
    {
        "display_name": "Shipper",
        "route": "/shipper",
        "icon": ic_electric_moped
    },
    {
        "display_name": "Upload sản phẩm",
        "route": "/upload",
        "icon": upload
    },
]

const SidebarItem = props => {
    const active = props.active ? 'active' : ''
    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <Icon icon={props.icon} size={32} />
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = (props) => {
    const activeItem = sidebar_routes.findIndex(item => item.route === props.location.pathname)
    return (
    <div className='sidebar'>
        <div className="sidebar__logo">
            <img src={logo} alt="company logo" />
        </div>
        <div className='mt-50'>
            {
                sidebar_routes.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem 
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                    
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar