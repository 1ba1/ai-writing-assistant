import { useState } from 'react'
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg'

interface Props {
  onTextChange: (value: string) => void
}

const TextEditor = ({ onTextChange }: Props) => {
  const [content, setContent] = useState<string>('')

  const handleChange = (e: ContentEditableEvent) => {
    setContent(e.target.value)
    onTextChange(e.target.value)
  }

  return (
    <EditorProvider>
      <Editor
        value={content}
        onChange={handleChange}
        className="bg-white text-black min-h-[320px] max-h-[320px] overflow-auto"
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <HtmlButton />
        </Toolbar>
      </Editor>
    </EditorProvider>
  )
}

export default TextEditor
