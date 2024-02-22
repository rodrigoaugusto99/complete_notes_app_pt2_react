import { Container } from './styles'

/*vamos ter duas sections, as tem titles porem o resto eh diferente
uma tem links e outro tem tags. */
export function Section({ title, children }) {
  return (
    <Container>
      <h2>{title}</h2>

      {children}
    </Container>
  )
}