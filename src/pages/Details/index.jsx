//import  './styles.js'
import { Container, Links } from './styles'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

/*o children captura tudo que tiver aqui dentro, como se fosse
        uma propriedade generica. O title foi passado propriamente dito*/
export function Details() {
  return (
    <Container>
      <Header />
      <ButtonText title='excluir nota'/>

      <Section title="Links úteis">
        <Links>
          <li>
            <a href="#">https://rocketseat.com.br</a>
          </li>
          <li>
            <a href="#">https://rocketseat.com.br</a>
          </li>
        </Links>
      </Section>

      <Section title="Marcadores">
        <Tag title="express" />
        <Tag title="node" />
      </Section>

      <Button title="Voltar" />
    </Container>
  )
}