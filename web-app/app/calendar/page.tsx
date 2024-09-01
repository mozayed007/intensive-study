'use client'

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { MonthlyCalendar } from '@/components/MonthlyCalendar'
import { useSubjects } from '@/lib/hooks/use-subjects'
import Link from 'next/link'

export default function CalendarPage() {
  const { subjects } = useSubjects()

  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <div className="h-[calc(100vh-120px)]">
        <MonthlyCalendar subjects={subjects} />
      </div>
    </div>
  )
}