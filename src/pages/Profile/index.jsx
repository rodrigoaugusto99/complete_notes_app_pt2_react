import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Avatar  } from "./styles";
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import {  useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState()
  const [passwordNew, setPasswordNew] = useState()


  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  //se tiver avatar ,ja carrega
  const [avatar, setAvatar] = useState(avatarUrl)
  //se nao tiver avatar, vamos carregar com isso
  const [avatarFile, setAvatarFile] = useState(null)

  async function handleUpdate(){
    const updated = {
      name, 
      email, 
      password: passwordNew, 
      old_password: passwordOld,
    }

    const userUpdated = Object.assign(user, updated)
    await updateProfile({ user: userUpdated, avatarFile})
  }

  function handleChangeAvatar(event){
    const file = event.target.files[0]
    //colocando aqui o arquivo que o usuario selecionou
    setAvatarFile(file)

    /*agora, vamos mudar o avatar com essa avatarFile,
    atualziando aquele estado "avatar" que eh o estado
    que exibe de fato o avatar*/
    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }
  //so com esse handleChangeAvatar, com os dois estados,
  //ja eh o suficiente pra mudar ali a foto 

  const navigate = useNavigate()
  function handleBack(){
    navigate(-1)
  }

  return (
    <Container>
      <header>
        <button type='button' onClick={handleBack}>
          <FiArrowLeft />
        </button>
      </header>

      <Form>
      <Avatar>
          <img
            //src="https://github.com/rodrigoaugusto99.png"
            src={avatar}  
            alt="Foto do usuário"
          />
          <label htmlFor="avatar">
            <FiCamera />

            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate}/>
      </Form>
    </Container>
  )
}