import { Container } from './styles'

export function Tag({ title , ...rest}) {
  //esse ...rest joga tudo aqui tbm, ate essa key la feita em Note
 // data.tags.map(tag => <Tag key={tag.id} title={tag.name} />)
  return (
    <Container {...rest}>
      {title}
    </Container>
  )
}