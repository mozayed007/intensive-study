'use client'

import { Draggable } from 'react-beautiful-dnd'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TaskItem } from './task-item'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { SubjectData } from '@/lib/types'
import { cn } from "@/lib/utils"

interface ChecklistCardProps {
  subject: SubjectData
  index: number
  isCompactView: boolean
  updateSubject: (subjectId: string, updates: Partial<SubjectData>) => void
  deleteSubject: (subjectId: string) => void
}

export function ChecklistCard({ subject, index, isCompactView, updateSubject, deleteSubject }: ChecklistCardProps) {
  const progress = subject.topics.filter(topic => topic.checked).length / subject.topics.length * 100

  const handleTopicToggle = (topicIndex: number, checked: boolean) => {
    const updatedTopics = [...subject.topics]
    updatedTopics[topicIndex].checked = checked
    updateSubject(subject.id, { topics: updatedTopics })
  }

  return (
    <Draggable draggableId={subject.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "mb-4 overflow-hidden transition-all duration-300",
            isCompactView ? "h-auto" : "h-full"
          )}
        >
          <CardHeader>
            <CardTitle>{subject.subject}</CardTitle>
          </CardHeader>
          <CardContent>
            {subject.topics.map((topic, index) => (
              <TaskItem
                key={index}
                task={topic}
                onUpdate={(checked) => handleTopicToggle(index, checked)}
                isCompactView={isCompactView}
              />
            ))}
            <Progress value={progress} className="mt-4" />
            <Button onClick={() => deleteSubject(subject.id)} variant="ghost" className="mt-2">
              Delete Checklist
            </Button>
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}