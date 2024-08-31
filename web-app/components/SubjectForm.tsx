import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SubjectData } from '@/lib/types'

interface SubjectFormProps {
  onSubmit: (subject: SubjectData) => void
}

export function SubjectForm({ onSubmit }: SubjectFormProps) {
  const [subject, setSubject] = useState('')
  const [topics, setTopics] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newSubject: SubjectData = {
      id: Date.now().toString(),
      subject: subject,
      topics: topics.split('\n').map((t, index) => ({ 
        name: t.trim(), 
        checked: false, 
        number: (index + 1).toString() 
      }))
    }
    onSubmit(newSubject)
    setSubject('')
    setTopics('')
  }

  const handleImport = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const importedText = e.target.value
    const lines = importedText.split('\n')
    if (lines.length > 0) {
      setSubject(lines[0].replace('#', '').trim())
      setTopics(lines.slice(1).join('\n'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label htmlFor="subject" className="block mb-2">Subject Name:</label>
        <Input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="import" className="block mb-2">Import Markdown List:</label>
        <Textarea
          id="import"
          placeholder="Paste your markdown list here..."
          onChange={handleImport}
          className="mb-2"
        />
        <p className="text-sm text-gray-500">Paste a markdown-style list to automatically populate the subject and topics.</p>
      </div>
      <div>
        <label htmlFor="topics" className="block mb-2">Topics (one per line):</label>
        <Textarea
          id="topics"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}