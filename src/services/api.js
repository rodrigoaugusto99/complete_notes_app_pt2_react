import axios from 'axios'

//aqui fica o endereco do backend, pra nao precisar repetir em todas as requisicoes
export const api = axios.create({
    baseURL: 'http://localhost:3333'
})
