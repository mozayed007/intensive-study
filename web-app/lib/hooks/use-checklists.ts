'use client'

import { useState, useCallback } from 'react'
import { Checklist } from '@/types/checklist'
import { v4 as uuidv4 } from 'uuid'

export function useChecklists() {
  const [checklists, setChecklists] = useState<Checklist[]>([])

  const addChecklist = useCallback(() => {
    const newChecklist: Checklist = {
      id: uuidv4(),
      title: 'New Checklist',
      color: '#ffffff',
      tasks: []
    }
    setChecklists((prev) => [...prev, newChecklist])
  }, [])

  const reorderChecklists = useCallback((startIndex: number, endIndex: number) => {
    setChecklists((prev) => {
      const result = Array.from(prev)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    })
  }, [])

  return { checklists, addChecklist, reorderChecklists }
}