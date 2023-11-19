import React from 'react'
import './Navbar.css'
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className='navbar-main'>
            <div className='navbar-logo' onClick={() => navigate("")}>
                Book Store
            </div>
            <div className='navbar-search'>
                <input className='navbar-input'></input>
                <SearchOutlined className='navbar-icon' />
                {/* <button className='navbar-search-btn'><SearchOutlined /></button> */}
            </div>
            <div className='navbar-footer'>
                <ShoppingCartOutlined className='navbar-icon' onClick={() => navigate("/cart")} />
                <UserOutlined className='navbar-icon' onClick={() => navigate("/account")} />
            </div>
        </div>
    )
}

export default Navbar