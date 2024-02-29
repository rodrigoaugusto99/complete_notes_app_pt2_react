import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../services/api"

export const AuthContext = createContext({})

function AuthProvider({ children }){

    const [data, setData] = useState({})

    async function signIn({ email, password }){
        try {
            const response = await api.post('/sessions', { email, password })
            const { user, token } = response.data
            //console.log(user, token)

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            localStorage.setItem("@rocketnotes:token", token)

            api.defaults.headers.authorization = `Bearer ${token}`
            setData( {user, token})

        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Nao foi possivel entrar")
            }
        }
    }

    function signOut(){
        localStorage.removeItem("@rocketnotes:token")
        localStorage.removeItem("@rocketnotes:user")

        setData({})
    }

    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token")
        const user = localStorage.getItem("@rocketnotes:user")

        if(token && user){
            api.defaults.headers.authorization = `Bearer ${token}`

            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            signIn, 
            signOut,
            user: data.user,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    
    return context
}

export { AuthProvider, useAuth }

/*
 você criou um hook personalizado chamado useAuth. Este hook utiliza o hook useContext para consumir o contexto de autenticação (AuthContext), 
 tornando mais fácil para outros componentes acessarem as funcionalidades relacionadas à autenticação.
Ao criar e exportar o AuthProvider, você encapsula a lógica de autenticação e o estado relacionado em um 
provedor de contexto. Em seguida, o useAuth é disponibilizado para outros componentes utilizarem, 
facilitando o acesso às funções e ao estado relacionado à autenticação sem a necessidade de prop drilling 
(passar as props através de múltiplos componentes intermediários). Isso é uma prática comum para manter o código modular e fácil de entender.
 */
