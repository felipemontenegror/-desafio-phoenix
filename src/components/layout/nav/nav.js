import React from 'react'
import './nav.css'
import history from '../../../config/history'
const Nav = ({ name, to }) => {

    const changePage = () => history.push(to)

    return (
        <nav className="">
            <div className="title"> Lista de Usuários</div>
            <div className="action">
                <button onClick={changePage}>
                    {name}
                </button>
            </div>
        </nav>
    )
}
export default Nav;
