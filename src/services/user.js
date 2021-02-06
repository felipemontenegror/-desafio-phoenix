import { clientHttp } from '../config/config.js'

const createUser = (data) => clientHttp.post(`/user`, data)

const updateUser = (data) => clientHttp.put(`/user/${data._id}`, data)

const ListUser = () => clientHttp.get(`/user`) // busca todos os usuarios
const ListUserId = (id) => clientHttp.get(`/user/${id}`) //busca usuario pelo ID

const DeleteUser = (id) => clientHttp.delete(`/user/${id}`)

const showUserId = (id) => clientHttp.patch(`/user/${id}`)

export {
    createUser,
    ListUser,
    DeleteUser,
    showUserId,
    updateUser,
    ListUserId
}
