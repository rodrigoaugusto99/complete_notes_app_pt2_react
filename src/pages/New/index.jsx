import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container, Form } from './styles'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../../services/api'

export function New() {

  const navigate = useNavigate()
 //________________________________
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

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !==deleted))
  }

  //__________________________________
  const [tags, setTags] = useState([])

  const [newTag, setNewTags] = useState("")

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag])

   setNewTags('')
  }

  function handleRemoveTag(deleted){
    //esse filtro tras de volta todas as tags, menos a que estou deletando
    //(a que foi pelo parametro)
    setTags(prevState => prevState.filter(tag => tag !==deleted))
  }
//______________________________________

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleNewNote(){

    if(!title){
      return alert('digite um titulo para a nota')
    }
    if(newLink && newTag){
      return alert('Ha um campos pendentes para adicionar, se voce salvar, eles serao descartados')
    }
    if(newLink){
      return alert('Ha um link pendente para adicionar, se voce salvar, esse link sera descartado')
    }
    if(newTag){
      return alert('Ha um tag pendente para adicionar, se voce salvar, essa tag sera descartado')
    }
    await api.post('/notes', {
      title,
      description, 
      tags, 
      links,
    })

    alert('nota criada com sucesso(sem tratamento)')
    navigate('/')
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

          <Input 
            placeholder="Título" 
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Observações" 
            onChange={e => setDescription(e.target.value)}
          />
          <Section title="links úteis">
            {
              //map retorna, alem do item, tbm retorna o index
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  //no noteItem, nois fizemos a propriedade onClick,
                  //criamos a funcao aqui e mandamos pra la
                  onClick={() => handleRemoveLink(link)}
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
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={()=> handleRemoveTag(tag)}
                  />
                ))
              }
              

              <NoteItem 
              isNew 
              placeholder="Nova tag" 
              value={newTag}
              onChange={e => setNewTags(e.target.value)}
              onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title="Salvar" 
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}