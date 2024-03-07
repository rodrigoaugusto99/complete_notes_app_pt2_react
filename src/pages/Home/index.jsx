import { FiPlus } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'

//pras tags nao ficarem duplicadas, iremos fazer uma logica la no backend no banco

export function Home() {
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])

  function handleTagSelected(tagName){
    const alreadySelected = tagsSelected.includes(tagName)
    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected(prevState => [...prevState, tagName])
    }
    console.log(alreadySelected)
    
  }

  //arrow func tion que recebe um vetor pra colocar os estados dependentes
  //vazio pq nao queremos buscar o tempo todo pelas tags, vamos buscar apena
  //na primeira vez que carregar a pagina

  /*quando temos uma funcao que queremos reaprovietar ela, colcoamos
  ela fora, mas como nesse caso vamos usar so aqui, podemos criar dentro
  do useEffect. e chamamos a fuuncao la dentro mesmo. Pois nao podemos 
  fazer async useEffect.*/
  useEffect(() => {
    //funcao que pega as apis
    //e mete no setTags
    async function fetchTags(){
      const response = await api.get('/tags')
      setTags(response.data)
    }
    fetchTags()
  }, [])

  /*tags && pra certificar-se que tem conteudo ali dentro 
  faz o mapeamento com o map iterando e criando cada tag(ButtonText)*/
  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header></Header>

      <Menu>
      
        <li>
          <ButtonText 
            title="Todos" 
            onClick={() => handleTagSelected('all')}
            $isactive={tagsSelected.length === 0}
          />
        </li>
        {
          tags && tags.map(tag =>(
            //chave vms colocar o id pois eh unico la no sqlite
            //String() pois eh o padrao p key
            <li key={String(tag.id)}>  
              <ButtonText 
                title={tag.name} 
                onClick={() => handleTagSelected(tag.name)}
                $isactive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input placeholder="Pesquisar pelo título" />
      </Search>

      <Content>
        <Section title="Minhas notas">
          <Note data={{
            title: 'React',
            tags: [
              { id: '1', name: 'react' },
              { id: '2', name: 'rocketseat' }
            ]
          }}
          />
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus/>
        Criar nota
      </NewNote>
    </Container>
  )
}