import React from 'react'
import { useHistory } from 'react-router-dom'
import { removeToken } from '../../../config/auth'
import './header.css'

const Header = (props) => {
    const history = useHistory()

    const logout = () => {
        removeToken()
       history.push('/login')
    }

    return (
        <header>
            <div className="title">{props.title}</div>
            <div className="profile">
                <i className="fa fa-user" /> {props.info.nome ? `${props.info.nome} |` : ""}

                <button className="logout" onClick={logout}> <i className="fa fa-sign-out"></i> Sair</button>
            </div>
        </header>
    )
}


export default Header
