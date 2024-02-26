import { useState } from 'react'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Background } from './styles'

import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  function handleSignUp(e){
    console.log(name, email, password)
    if(!name || !email || !password){
      return alert('preencha todos os campos')
    }

    api.post('/users', { name, email, password})
    .then(()=> {
      alert('Usuario cadastrado com sucesso')
      navigate('/')
    })
    .catch(error => {
      if(error.response){
        alert(error.response.data.message)
        
      }else{
        alert('Nao foi possivel cadastrar')
      }
    })

  }

  
  return (
    <Container>
      <Background />

      <Form >
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          //value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          //value={email}
          onChange={(e)  => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          //value={password}
          onChange={(e)  => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp}/>

        <Link to='/'>Voltar para o login</Link>
      </Form>

    </Container>
  )
}