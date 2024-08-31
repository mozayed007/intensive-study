'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface TaskItemProps {
  task: { name: string; checked: boolean; number: string }
  onUpdate: (checked: boolean) => void
  isCompactView: boolean
}

export function TaskItem({ task, onUpdate, isCompactView }: TaskItemProps) {
  const [mainTopic, subtopics] = task.name.split(':')

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={task.name}
        checked={task.checked}
        onCheckedChange={(checked) => onUpdate(checked as boolean)}
      />
      <Label htmlFor={task.name} className="flex-grow cursor-pointer">
        <span className={`font-semibold ${isCompactView ? 'text-xs' : ''}`}>{task.number}. {mainTopic}</span>
        {subtopics && !isCompactView && <span className="text-sm text-gray-500">: {subtopics}</span>}
      </Label>
    </div>
  )
}