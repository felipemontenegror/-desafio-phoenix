import React from 'react'
import './footer.css'
import imgLogo from '../../../assets/img/github.png'

const Footer = () => (
    <footer>
        <div className="projectName">
            Cadastro de usuários
      </div>
        <div className="copyRight">
            <img src={imgLogo} alt="" />
        </div>
    </footer>
)


export default Footer
