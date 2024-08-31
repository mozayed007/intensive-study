import { useState, useCallback, useEffect } from 'react'
import { SubjectData } from '@/lib/types'
import { saveSubjects, loadSubjects } from '@/lib/subjectStorage'

export function useSubjects() {
  const [subjects, setSubjects] = useState<Record<string, SubjectData>>({})

  useEffect(() => {
    const loadSavedSubjects = async () => {
      const savedSubjects = await loadSubjects()
      setSubjects(savedSubjects)
    }
    loadSavedSubjects()
  }, [])

  const addSubject = useCallback((newSubject: SubjectData) => {
    setSubjects(prev => ({ ...prev, [newSubject.id]: newSubject }))
  }, [])

  const updateSubject = useCallback((subjectId: string, updates: Partial<SubjectData>) => {
    setSubjects(prev => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], ...updates }
    }))
  }, [])

  const deleteSubject = useCallback((subjectId: string) => {
    setSubjects(prev => {
      const { [subjectId]: _, ...rest } = prev
      return rest
    })
  }, [])

  useEffect(() => {
    saveSubjects(Object.values(subjects))
  }, [subjects])

  return { subjects, addSubject, updateSubject, deleteSubject }
}