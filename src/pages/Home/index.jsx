import { FiPlus } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'


//pras tags nao ficarem duplicadas, iremos fazer uma logica la no backend no banco

export function Home() {
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [search, setSearch] = useState('')
  //tbm foi feito estado de notas p guardar e atualizar
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()

  function handleTagSelected(tagName){
    if(tagName === 'all'){
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName)
    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected(prevState => [...prevState, tagName])
    }
    console.log(alreadySelected)
    
  }

  function handleDetails(id){
    navigate(`/details/${id}`)
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

  /*nesse useEffect, quero que  seja executado novamente se o usuario selecionar uma tag nova.
  se seleciona tag nova, quero que a pesquisa recarregue com aqueel filtro */
  useEffect(() => {
    async function fetchNotes(){
      //query
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }
    fetchNotes()
  },[tagsSelected, search])

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
        <Input
          placeholder="Pesquisar pelo título"
          //conteudo da caixa de texto sendo armazenado no estado
          /*no "e", ele guarda o conteudo que ta na caixihha,
          quando da onChange, dispara e atualiza o search com
          o novo conteudo atraves do setSearh, passando o valor atual
          da caixinha (e.target.value(*/

          /*e como o seach eh uma dependencia daquele useEffect
          pra atualizsar as notas (fetchNotes), chama aquele useEffect
          que faz o filtro com tags e search na query.*/
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
        {notes.map(note => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus/>
        Criar nota
      </NewNote>
    </Container>
  )
}