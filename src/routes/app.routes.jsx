import { Routes, Route, Navigate } from 'react-router-dom'

import { New } from '../pages/New'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { Details } from '../pages/Details'

export function AppRoutes() {

  //jogar o fallback aqui tbm, ai ao chamar o navigate to /, vai mandar pra pagina inicial,
  //que nesse caso, diferentemente do AuthRoutes, eh o Home, e nao o SignIN.
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/details/:id" element={<Details />} />

      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}