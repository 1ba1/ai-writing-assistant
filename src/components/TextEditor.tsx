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
import { updateCredits } from '../db'
import { useSession } from '@clerk/clerk-react'

type Props = {
  loading: boolean
  setLoading: (v: boolean) => void
  setError: (v: string) => void
  setResult: (v: string) => void
  credits: number
  setCredits: (v: number) => void
}

const TextEditor = ({
  loading,
  setLoading,
  setError,
  setResult,
  credits,
  setCredits,
}: Props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const [tone, setTone] = useState('Formal')

  const { session } = useSession()

  useEffect(() => editorRef.current?.focus(), [])

  const handleToneChange = (selectedTone: string) => {
    setTone(selectedTone)
  }

  const handleUpdateCredits = async (): Promise<string | void> => {
    if (session) {
      try {
        const email = session.user.emailAddresses[0].emailAddress
        const result = await updateCredits(email, credits)
        const { updatedCredits } = result[0]
        setCredits(updatedCredits)
      } catch (err) {
        return err instanceof Error
          ? console.error(err.message)
          : 'An error occurred'
      }
    }
  }

  const handleGenerate = async (action?: Action): Promise<void> => {
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
      await handleUpdateCredits()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ContentEditableEvent) => {
    setContent(e.target.value.replace(/<br>/g, '').replace(/&nbsp;/g, ' '))
  }

  return (
    <>
      <EditorProvider>
        <Editor
          ref={editorRef}
          value={content}
          onChange={handleChange}
          className={`${
            !credits ? 'cursor-not-allowed' : ''
          } bg-white text-black min-h-[320px] max-h-[320px] overflow-auto`}
          disabled={!credits}
        >
          <div className={!credits ? 'hidden pointer-events-none' : ''}>
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
          </div>
        </Editor>
      </EditorProvider>

      <Controls
        onGenerate={handleGenerate}
        onToneChange={handleToneChange}
        onClearEditor={() => setContent('')}
        buttonsDisabled={!content.trim() || loading || !credits}
      />
    </>
  )
}

export default TextEditor
