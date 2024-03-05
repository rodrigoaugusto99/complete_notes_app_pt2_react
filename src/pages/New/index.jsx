import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container, Form } from './styles'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'

import { Link } from 'react-router-dom'
import { useState } from 'react'



export function New() {

  //estado que guarda todos os links
  const [links, setLinks] = useState([])
  //estado que guarda o link que vai ser adicionado
  const [newLink, setNewLink] = useState("")
/*acessamos com oprevState o que que tinha antes dentro do array,
e depois montamos o novo array, com td q tinha antes + o novo link*/
  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink])

    setNewLink('')
  }
  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input placeholder="Título" />
          <Textarea placeholder="Observações" />
          <Section title="links úteis">
            {
              //map retorna, alem do item, tbm retorna o index
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => {}}
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              <NoteItem value="react" />
              <NoteItem isNew placeholder="Nova tag" />
            </div>
          </Section>

          <Button title="Salvar" />
        </Form>
      </main>
    </Container>
  )
}