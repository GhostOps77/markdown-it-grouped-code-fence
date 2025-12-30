import { useCallback, useState } from 'react'
import { Container } from '@column-resizer/react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import { groupedCodeFencePlugin } from 'markdown-it-grouped-code-fence'
import MD from 'markdown-it'

import { Editor, Section, Bar, MarkDown, GroupClassName } from './styled'
import README from './assets/example.md?raw'

import 'codemirror/mode/markdown/markdown.js'


const md = new MD()

md.use(groupedCodeFencePlugin({ className: GroupClassName }))


export default function App() {
  const [markdownContent, setMarkdownContent] = useState(README)

  const onChange = useCallback((_: any, __: any, newValue: string) => {
    setMarkdownContent(newValue)
  }, [])

  return (
    <Container>
      <Section minSize={300}>
        <Editor>
          <CodeMirror
            options={{
              mode: 'text/x-markdown',
              theme: 'dracula',
              // autoCloseBrackets: true,
              // styleActiveLine: true,
              // foldGutter: true,
              lineNumbers: true,
              lineWrapping: true,
              indentWithTabs: false,
            }}
            value={README}
            onChange={onChange}
          />
        </Editor>
      </Section>

      <Bar size={0} expandInteractiveArea={{ left: 10, right: 10 }} />

      <Section minSize={300}>
        <MarkDown
          dangerouslySetInnerHTML={{ __html: md.render(markdownContent) }}
        />
      </Section>
    </Container>
  )
}
