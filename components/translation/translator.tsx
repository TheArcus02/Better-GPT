'use client'

import { useCompletion } from 'ai/react'
import { useState } from 'react'

const Translator = () => {
  const [content, setContent] = useState('')
  const { complete } = useCompletion({
    api: '/api/completion',
  })

  return <div>Translator</div>
}

export default Translator
