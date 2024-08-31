'use client'

import { useState, useCallback, useMemo } from 'react'
import { Task, Checklist } from '@/types/checklist'
import { v4 as uuidv4 } from 'uuid'

export function useChecklist(checklistId: string) {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = useCallback(() => {
    const newTask: Task = {
      id: uuidv4(),
      title: 'New Task',
      completed: false
    }
    setTasks((prev) => [...prev, newTask])
  }, [])

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    )
  }, [])

  const progress = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.completed).length
    return tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0
  }, [tasks])

  return { tasks, addTask, updateTask, progress }
}