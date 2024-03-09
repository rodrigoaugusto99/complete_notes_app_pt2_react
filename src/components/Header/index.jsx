import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { useNavigate } from 'react-router-dom';

export function Header() {

  const { signOut, user } = useAuth()
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

  //quando deslogar, vamos primeiro chamar o navigate pra tela inciial antes de chamar o signOut do useAuth
  const navigate = useNavigate()
  function handleSignOut(){
    navigate('/')
    signOut()
  }

  return (
    <Container>
      <Profile to='/profile'>
        <img
          //src="https://github.com/rodrigoaugusto99.png"
          src={avatarUrl}
          alt="Foto do usuário"
        />

        <div>
          <span>Bem-vindo</span>
          <strong>Rodrigo Gonçalves</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}