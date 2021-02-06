import React, { useState } from 'react'
import { createUser, showUserId, updateUser } from '../../services/user'
// import Loading from '../loading/loading'
import Alert from '../alert/index.js'
import './user.css'
import Nav from '../layout/nav/nav'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { FormGroup, CustomInput } from 'reactstrap';

const UserCreate = (props) => {

    const [isSubmit, setIsSubmit] = useState(false)
    const [isEdit, setisEdit] = useState(false)
    const [alert, setAlert] = useState({})
    const history = useHistory()
    const { id } = useParams()
    const methodUser = isEdit ? updateUser : createUser

    const [form, setForm] = useState({
        is_active: true,
        is_admin: false
    })


    useEffect(() => {

        const getShowUser = async () => {
            const user = await showUserId(id)
            if (user.data.senha) {
                delete user.data.senha
            }
            setForm(user.data)
        }


        if (id) {
            setisEdit(true)
            getShowUser()
        }

    }, [id])


    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        return;
    }

    const formIsValid = () => {
        return form.nome && form.email && form.senha
    }

    const submitForm = async (event) => {

        try {
            setIsSubmit(true)
            await methodUser(form)
            setForm({
                is_active: true,
                is_admin: false
            })
            setAlert({
                type: "success",
                message: 'Seu formulário foi enviado com sucesso',
                show: true
            })
            setIsSubmit(false)

            setTimeout(() =>
                history.push('/')
                , 3000)
        } catch (e) {
            setAlert({
                type: "error",
                message: 'Ocorreu um erro no cadastro',
                show: true
            })
            setIsSubmit(false)
        }
    }

    return (
        <React.Fragment>
            <Nav name="Lista" to="/" />
            <section>
                <Alert type={alert.type || ""} message={alert.message || ""} show={alert.show || false} />

                <div className="create_user">
                    <div className="form_login">
                        <FormGroup>
                            <label htmlFor="auth_nome">Nome:</label>
                            <input disabled={isSubmit} type="text" id="auth_nome" name="nome" onChange={handleChange} value={form.nome || ""} placeholder="Insira o seu nome" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="auth_email">Email:</label>
                            <input disabled={isSubmit || isEdit} type="email" id="auth_email" name="email" onChange={handleChange} value={form.email || ""} placeholder="Insira sua senha" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="auth_password">Senha:</label>
                            <input disabled={isSubmit} type="password"
                                id="auth_password" name="senha"
                                onChange={handleChange}
                                value={form.senha || ""}
                                placeholder={isEdit ? `Atualize sua senha ` : 'Informe sua senha'} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="auth_nascimento">Data de Nascimento:</label>
                            <input disabled={isSubmit || isEdit} type="nascimento" id="auth_nascimento" name="nascimento" onChange={handleChange} value={form.fabricante || ""} placeholder="Insira o fabricante da cerveja" />
                        </FormGroup>

                        <FormGroup>
                            {isSubmit ? (
                                <CustomInput type="switch" label="Ativar Usuário como administrador:" name="is_admin" id="is_admin" onChange={handleChange} checked={(!isEdit ? true : form.is_admin) || false} />
                            ) : ""}
                            <CustomInput type="switch" label="Usuário ativo ?" id="is_active" name="is_active" onChange={handleChange} checked={(!isEdit ? true : form.is_active) || false} />
                        </FormGroup>

                        <button disabled={!formIsValid()} onClick={submitForm}>
                            {isEdit ? "Atualizar" : "Cadastrar"}
                        </button>
                    </div>
                    <br />
                    {/* <Loading show={isSubmit}/> */}
                    {isSubmit ? <div>Carregando....</div> : ""}

                </div>
            </section >
        </React.Fragment>

    )
}

export default UserCreate
