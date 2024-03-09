//import  './styles.js'
import { Container, Links, Content } from './styles'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'



/*o children captura tudo que tiver aqui dentro, como se fosse
        uma propriedade generica. O title foi passado propriamente dito*/
export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    
      console.log(response.data)
    }

    fetchNote()
    
  }, [])

  function handleBack(){
    navigate('/')
  }
  return (
    <Container>
      <Header />
{
  data && 
      <main>
        <Content>
          <ButtonText title="Excluir nota" />

          <h1>
            {data.note.title}
          </h1>
          <p>
          {data.note.description}          
          </p>

          {data.links &&
            <Section title="Links úteis">
            <Links>
              {
                data.links.map(link => (
                  <li key={link.id}>
                    <a href={link.url} target='_blank'>
                      {link.url}
                    </a>
                  </li>
                ))
              }
             
            </Links>
          </Section>
          }

          {
          data.tags &&
            <Section title="Marcadores">
          {
                data.tags.map(tag => (
                    <Tag
                      key={String(tag.id)}
                      title={tag.name}
                    />
                ))
              }
          </Section>
          }

          <Button title="Voltar" onClick={handleBack}/>
        </Content>
      </main>
}
    </Container>
    
  )
}