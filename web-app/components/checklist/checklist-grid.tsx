'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ArrowLeftIcon, Upload } from "lucide-react"
import { SubjectChecklist } from "@/components/SubjectChecklist"
import { SubjectData } from '@/lib/types'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useSubjects } from "@/lib/hooks/use-subjects"
import { SubjectForm } from "@/components/SubjectForm"
import { FileUpload } from "@/components/FileUpload"

interface ChecklistGridProps {
  subjects: Record<string, SubjectData>
  updateSubject: (subjectId: string, updates: Partial<SubjectData>) => void
  deleteSubject: (subjectId: string) => void
}

export function ChecklistGrid({ subjects, updateSubject, deleteSubject }: ChecklistGridProps) {
  const [isCompactView, setIsCompactView] = useState(false)
  const [subjectOrder, setSubjectOrder] = useState(Object.keys(subjects))

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newOrder = Array.from(subjectOrder)
    const [reorderedItem] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, reorderedItem)

    setSubjectOrder(newOrder)
  }

  const handleDeleteSubject = (subjectId: string) => {
    deleteSubject(subjectId)
    setSubjectOrder(prevOrder => prevOrder.filter(id => id !== subjectId))
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Checklists</h2>
        <Button onClick={() => setIsCompactView(!isCompactView)}>
          {isCompactView ? "Expand View" : "Compact View"}
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="checklists">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectOrder.map((subjectId, index) => (
                <Draggable key={subjectId} draggableId={subjectId} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <SubjectChecklist
                        subject={subjects[subjectId]}
                        onTopicToggle={(topicIndex, checked) => {
                          const updatedTopics = [...subjects[subjectId].topics]
                          updatedTopics[topicIndex].checked = checked
                          updateSubject(subjectId, { topics: updatedTopics })
                        }}
                        onDelete={() => handleDeleteSubject(subjectId)}
                        isCompactView={isCompactView}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

function ChecklistsPage() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects()

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" className="mb-4">
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
      </Button>
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

export default ChecklistsPage