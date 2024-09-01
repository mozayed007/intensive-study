'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { ChecklistGrid } from "@/components/checklist/checklist-grid"
import { useSubjects } from "@/lib/hooks/use-subjects"
import { SubjectForm } from "@/components/SubjectForm"
import { FileUpload } from "@/components/FileUpload"
import Link from 'next/link'

export default function ChecklistsPage() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects()

  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Checklists</h1>
      
      <Tabs defaultValue="view">
        <TabsList>
          <TabsTrigger value="view">View Checklists</TabsTrigger>
          <TabsTrigger value="add-subject">Add Subject</TabsTrigger>
          <TabsTrigger value="upload-files">Upload Files</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          <ChecklistGrid subjects={subjects} updateSubject={updateSubject} deleteSubject={deleteSubject} />
        </TabsContent>

        <TabsContent value="add-subject">
          <SubjectForm onSubmit={addSubject} />
        </TabsContent>
        
        <TabsContent value="upload-files">
          <FileUpload onSubmit={addSubject} />
        </TabsContent>
      </Tabs>
    </div>
  )
}