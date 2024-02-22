//import  './styles.js'
import { Container } from './styles'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'

export function Details(){

  return (
    <Container>
      <Header/>
      <h1>Hello World!</h1>
      <h1>Hello World!</h1>
      <Button title='sim'/>
      <Button title='nao'/>
      <Button title='talvez'/>
    </Container>
    
  )
}