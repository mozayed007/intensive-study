"use client"
import React from 'react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Subject Study Planner</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="home" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-5 rounded-full bg-muted p-1">
          <TabsTrigger value="home" asChild className="rounded-full">
            <Link href="/" className="w-full rounded-full data-[state=active]:text-foreground">Home</Link>
          </TabsTrigger>
          <TabsTrigger value="checklists" asChild className="rounded-full">
            <Link href="/checklists" className="w-full rounded-full data-[state=active]:text-foreground">Checklists</Link>
          </TabsTrigger>
          <TabsTrigger value="calendar" asChild className="rounded-full">
            <Link href="/calendar" className="w-full rounded-full data-[state=active]:text-foreground">Calendar</Link>
          </TabsTrigger>
          <TabsTrigger value="timetable" asChild className="rounded-full">
            <Link href="/timetable" className="w-full rounded-full data-[state=active]:text-foreground">Timetable</Link>
          </TabsTrigger>
          <TabsTrigger value="planner" asChild className="rounded-full">
            <Link href="/planner" className="w-full rounded-full data-[state=active]:text-foreground">Planner</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Checklists</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your study topics and track your progress.</p>
          </CardContent>
          <CardFooter>
            <Link href="/checklists">
              <Button>Go to Checklists</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Plan your study schedule and view upcoming tasks.</p>
          </CardContent>
          <CardFooter>
            <Link href="/calendar">
              <Button>Open Calendar</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Organize your daily study routine.</p>
          </CardContent>
          <CardFooter>
            <Link href="/timetable">
              <Button>View Timetable</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Planner & Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Plan your day and take study notes.</p>
          </CardContent>
          <CardFooter>
            <Link href="/planner">
              <Button>Open Planner</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pomodoro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Use the Pomodoro technique for focused study sessions.</p>
          </CardContent>
          <CardFooter>
            <Link href="/pomodoro">
              <Button>Start Pomodoro</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}