import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { SubjectData } from '@/lib/types'

interface FileUploadProps {
  onSubmit: (subject: SubjectData) => void
}

export function FileUpload({ onSubmit }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; content: string }[]>([])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = await Promise.all(
        Array.from(files).map(async (file) => ({
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          content: await file.text()
        }))
      )
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeUploadedFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName))
  }

  const handleSubmitUploadedFiles = () => {
    uploadedFiles.forEach(file => {
      const lines = file.content.split('\n')
      const topics = lines.map((line, index) => ({
        name: line.trim(),
        checked: false,
        number: (index + 1).toString()
      }))
      onSubmit({
        id: Date.now().toString(),
        subject: file.name,
        topics
      })
    })
    setUploadedFiles([])
  }

  return (
    <div className="space-y-4 mb-8">
      <Input
        type="file"
        accept=".md"
        multiple
        onChange={handleFileUpload}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uploadedFiles.map((file) => (
          <Card key={file.name} className="p-4 flex justify-between items-center">
            <span>{file.name}</span>
            <Button variant="ghost" size="icon" onClick={() => removeUploadedFile(file.name)}>
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
      <Button onClick={handleSubmitUploadedFiles} disabled={uploadedFiles.length === 0}>
        Submit Uploaded Files
      </Button>
    </div>
  )
}