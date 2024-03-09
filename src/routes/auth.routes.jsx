import { Routes, Route, Navigate } from 'react-router-dom'

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'


export function AuthRoutes() {

  //pegando o usuario POR AQUI MMESMO, pois ate pegar la do contexto, ja entrou no fall back pq 
  //o user ainda ta nulo.

  //entao vms pegar aqui e so mandar praquela pagina inicial se realmetne for nulo o usuario
  const user = localStorage.getItem("@rocketnotes:user")

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      { !user && <Route path="*" element={<Navigate to={'/'} />} />}


    </Routes>
  )
}