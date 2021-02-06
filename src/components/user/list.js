import React, { useEffect, useState } from 'react'
import { ListUser, DeleteUser } from '../../services/user'
import Loading from '../loading/loading'
import Nav from '../../components/layout/nav/nav'

const UserList = (props) => {

    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(false)

    const getList = async () => {
        try {
            setloading(true)
            const usersAll = await ListUser()
            if (usersAll) {
                setUsers(usersAll.data)
            }
            setloading(false)
        } catch (error) {
            setloading(false)
        }
    }

    const editUser = (user) => props.history.push(`/edit/${user._id}`)


    const deleteUser = async ({ _id: id, nome }) => {
        try {
            if (window.confirm(`Voce deseja excluir o usuário ${nome}`)) {
                await DeleteUser(id)
                getList()
            }
        } catch (error) {
            setloading(false)
        }
    }

    const verifyIsEmpty = users.length === 0


    const montarTabela = () => {

        const linhas = users.map((user, index) => (
            <tr key={index}>
                <td>{user.is_active ? "SIM" : "NÃO"}</td>
                <td>{user.is_admin ? "SIM" : "NÃO"}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.senha}</td>
                <td>{user.nascimento}</td>
                <td>
                    <span onClick={() => editUser(user)} >Editar</span> |
                    <span onClick={() => deleteUser(user)}>Excluir </span>
                </td>
            </tr>
        ))

        return !verifyIsEmpty ? (
            <table >
                <thead>
                    <tr>
                        <th>ATIVO</th>
                        <th>ADMIN</th>
                        <th>NOME</th>
                        <th>EMAIL</th>
                        <th>SENHA</th>
                        <th>NASCIMENTO</th>
                    </tr>
                </thead>
                <tbody>
                    {linhas}
                </tbody>
            </table>
        ) : ""
    }



    useEffect(function () {
        getList()
    }, [])


    //render
    return (
        <div>
            <Nav name="Novo" to="/create" />
            <section>
                <div className="list_user">
                    <Loading show={loading} />
                    {montarTabela()}
                </div>
            </section>
        </div>

    )
}

export default UserList
