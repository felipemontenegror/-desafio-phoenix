import React, { useState } from 'react'
import { saveToken } from '../../config/auth'
import './login.css'
import { useHistory } from 'react-router-dom';
import { authentication } from '../../services/auth';
import { clientHttp } from '../../config/config';
import imgLogo from '../../../src/assets/img/github.png'

const Login = (props) => {
    const [auth, setAuth] = useState({
        email: 'felipe@github.com.br', //email tem que estar validado na API, falta mocar
        senha: '123456'
    })

    const history = useHistory()

    const handleChange = (event) => {
        setAuth({
            ...auth,
            [event.target.name]: event.target.value
        })
        return;
    }

    const isValidSubmit = () => auth.email && auth.senha

    const submitLogin = async () => {
        if (isValidSubmit()) {
            const { data: { token } } = await authentication(auth)
            clientHttp.defaults.headers['x-auth-token'] = token;  // token de forma global
            saveToken(token)
            history.push('/')

        }
        return;
    }

    return (
        <section>
            <div id="login">
                <div className="form_login">
                    <div className="copyRight">
                        <img src={imgLogo} alt="" />
                    </div>
                    <div>
                        <label htmlFor="auth_login">Login</label>
                        <input type="email" id="email" name="email" onChange={handleChange} value={auth.email || ""} placeholder="Insira seu e-mail" />
                    </div>
                    <div>
                        <label htmlFor="auth_password">Senha</label>
                        <input type="password" id="senha" name="senha" onChange={handleChange} value={auth.senha || ""} placeholder="Insira sua senha" />
                    </div>
                    <button disabled={!isValidSubmit()} onClick={submitLogin}>Entrar</button>
                </div>
            </div>
        </section>
    )
}


export default Login;
