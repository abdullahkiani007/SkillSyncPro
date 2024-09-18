import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { Snackbar, Alert, Button } from '@mui/material'
import * as monaco from 'monaco-editor'

const CodeEditor = ({ initialCode, language, onSubmit }) => {
  const [code, setCode] = useState(initialCode || '')
  const [startTime] = useState(Date.now())
  const [isPasting, setIsPasting] = useState(false)
  const [isTabSwitched, setIsTabSwitched] = useState(false)
  const [timeLimit] = useState(1800000) // 30 minutes
  const [keystrokes, setKeystrokes] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleEditorChange = (value) => {
    setCode(value)
  }

  const preventPasteInEditor = (editor) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      setIsPasting(true)
      setSnackbarMessage('Pasting code is not allowed!')
      setOpenSnackbar(true)
    })
  }
  useEffect(() => {
    const handleEditorDidMount = (editor) => {
      preventPasteInEditor(editor)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabSwitched(true)
        setSnackbarMessage('Switching tabs is not allowed!')
        setOpenSnackbar(true)
      }
    }

    const handleKeyDown = (event) => {
      setKeystrokes((prev) => prev + 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const handleRunCode = () => {
    const timeSpent = Date.now() - startTime

    if (timeSpent > timeLimit || isPasting || isTabSwitched) {
      // setSnackbarMessage(
      //   'Submission failed due to one or more of the following reasons:\n- Time limit exceeded\n- Pasting detected\n- Tab switching detected'
      // )
      // setOpenSnackbar(true)
      // remove this
      onSubmit(code, timeSpent, keystrokes)

    } else {
      onSubmit(code, timeSpent, keystrokes)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <div className='code-editor-container'>
      <Editor
        height='400px'
        language={language}
        value={code}
        theme='vs-dark'
        onChange={handleEditorChange}
        onMount={(editor) => {
          preventPasteInEditor(editor)
        }}
      />
      <Button
        className='mt-4 p-2 bg-blue-500 text-white rounded'
        onClick={handleRunCode}
      >
        Submit Code
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color='inherit' onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='error'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CodeEditor
