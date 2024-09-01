'use client'

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from 'next/link'
import { DailyPlanner } from '@/components/DailyPlanner'

export default function PlannerPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Daily Planner & Notes</h1>
      <DailyPlanner />
    </div>
  )
}