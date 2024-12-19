import { useEffect, useRef, useState } from 'react'
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
import Controls from './Controls'
import { Action } from '../types'
import { generateText } from '../services/api'

interface Props {
  setLoading: (v: boolean) => void
  setError: (v: string) => void
  setResult: (v: string) => void
}

const TextEditor = ({ setLoading, setError, setResult }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const [tone, setTone] = useState('Formal')

  useEffect(() => editorRef.current?.focus(), [])

  const handleToneChange = (selectedTone: string) => {
    setTone(selectedTone)
  }

  const handleGenerate = async (action?: Action) => {
    if (!content.trim()) {
      setError('Input cannot be empty!')
      return
    }
    setLoading(true)
    setError('')
    try {
      const prompt =
        action === Action.SUMMARIZE
          ? `Summarize the following text:\n\n${content}`
          : `Respond in a ${tone} tone:\n\n${content}`
      const aiResponse = await generateText([{ role: 'user', content: prompt }])
      setResult(aiResponse)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ContentEditableEvent) => {
    setContent(e.target.value)
  }

  return (
    <>
      <EditorProvider>
        <Editor
          ref={editorRef}
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
      <Controls
        onGenerate={handleGenerate}
        onToneChange={handleToneChange}
        onClearEditor={() => setContent('')}
      />
    </>
  )
}

export default TextEditor
