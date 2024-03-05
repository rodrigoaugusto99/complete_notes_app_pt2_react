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

            //api.defaults.headers.authorization = `Bearer ${token}`
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, [])


    async function updateProfile({ user, avatarFile }){
        try {

            if(avatarFile){
                //vamos enviar como um arquivo
                const fileUpdloadForm = new FormData()
                //la no backend, tamo esperando um campo "avatar"
                //vamos jogar dentro desse formulario, no campo avatar, esse avatarFile
                fileUpdloadForm.append('avatar',avatarFile)
                //no imnsonia, a gente jogava esse arquivo pelo multiformdata
//fazendo a requisicao
                const response = await api.patch('/users/avatar', fileUpdloadForm)
//esperando como resposta um usuario com o conteudo atualziado. o user com O AVATAR ATUALIZADO
//entao vamos botar no avatar do user, o conteudo do response.data, da parte .avatar
                user.avatar = response.data.avatar
            }
            await api.put('/users', user)
            localStorage.setItem('@rocketnotes:user', JSON.stringify(user))

            setData({ user, token: data.token})
            alert('Perfil atualizado!')
        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Nao foi possivel atualizar o perfil")
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn, 
            signOut,
            updateProfile,
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
