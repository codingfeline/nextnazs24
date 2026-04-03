import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
  item: string
}

const MyCodeHighlighter = ({ item }: Props) => {
  return (
    <SyntaxHighlighter language="typescript" style={oneDark}>
      {item}
    </SyntaxHighlighter>
  )
}

export default MyCodeHighlighter
