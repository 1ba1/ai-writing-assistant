import { useState } from "react"
import {
  BtnBold,
  BtnItalic,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg"

interface Props {
  onTextChange: (value: string) => void
}

const TextEditor = ({ onTextChange }: Props) => {
  const [content, setContent] = useState<string>("")

  const handleChange = (e: ContentEditableEvent) => {
    setContent(e.target.value)
    onTextChange(e.target.value)
  }

  return (
    <div className="text-black">
      <EditorProvider>
        <Editor value={content} onChange={handleChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default TextEditor
