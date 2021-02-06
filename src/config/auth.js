const TOKEN_KEY = 'phoenix_token' 

const getToken = () => localStorage.getItem(TOKEN_KEY)   //responsavel por reguperar um dado que foi salvo no localstorage

const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token)  //guarda um novo valor na funcao

const removeToken = () => localStorage.removeItem(TOKEN_KEY)   //remover um dado que foi salvo 


const isAuthenticated = () => {
    // pegar dentro do localstage
    // validar o token 
    // retornar se true ou false
    return getToken() !== null
}


export {
    isAuthenticated,
    getToken,
    saveToken,
    removeToken
}
