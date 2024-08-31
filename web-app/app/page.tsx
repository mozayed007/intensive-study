  "use client"
  import React, { useState, useEffect } from 'react'
  import { useTheme } from "next-themes"
  import { Button } from "@/components/ui/button"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Switch } from "@/components/ui/switch"
  import { Sun, Moon } from "lucide-react"
  import { SubjectForm } from '@/components/SubjectForm'
  import { FileUpload } from '@/components/FileUpload'
  import { ChecklistGrid } from '@/components/checklist/checklist-grid'
  import { MonthlyCalendar } from '@/components/MonthlyCalendar'
  import { Timetable } from '@/components/Timetable'
  import { DailyPlanner } from '@/components/DailyPlanner'
  import { Pomodoro } from '@/components/Pomodoro'
  import { useSubjects } from '@/lib/hooks/use-subjects'

  export default function Home() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects()

    useEffect(() => {
      setMounted(true)
    }, [])

    if (!mounted) return null

    return (
      <main className="min-h-screen p-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Subject Study Planner</h1>
          <div className="flex items-center space-x-2">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
        </div>
        <Tabs defaultValue="checklists" className="w-full">
          <TabsList>
            <TabsTrigger value="checklists">Checklists</TabsTrigger>
            <TabsTrigger value="add-subject">Add Subject</TabsTrigger>
            <TabsTrigger value="upload-files">Upload Files</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="planner">Daily Planner</TabsTrigger>
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          </TabsList>
          <TabsContent value="checklists">
            <ChecklistGrid subjects={subjects} updateSubject={updateSubject} deleteSubject={deleteSubject} />
          </TabsContent>
          <TabsContent value="add-subject">
            <SubjectForm onSubmit={addSubject} />
          </TabsContent>
          <TabsContent value="upload-files">
            <FileUpload onSubmit={addSubject} />
          </TabsContent>
          <TabsContent value="calendar" className="h-[calc(100vh-120px)]">
            <MonthlyCalendar subjects={subjects} />
          </TabsContent>
          <TabsContent value="timetable">
            <Timetable />
          </TabsContent>
          <TabsContent value="planner">
            <DailyPlanner />
          </TabsContent>
          <TabsContent value="pomodoro">
            <Pomodoro />
          </TabsContent>
        </Tabs>
      </main>
    )
  }