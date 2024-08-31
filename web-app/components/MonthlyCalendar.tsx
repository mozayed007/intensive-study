import React, { useState, useMemo, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, isSameDay } from 'date-fns'
import { SubjectData } from '@/lib/types'
import { X } from 'lucide-react'
import { useTheme } from "next-themes"

const subjectColors = [
  'hsl(0, 70%, 50%)',   // Red
  'hsl(120, 70%, 50%)', // Green
  'hsl(240, 70%, 50%)', // Blue
  'hsl(60, 70%, 50%)',  // Yellow
  'hsl(300, 70%, 50%)', // Purple
  'hsl(180, 70%, 50%)', // Cyan
];

function generateThemeAwareColor(subject: string, theme: string | undefined): string {
    const hue = Math.abs(subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 360;
    const saturation = theme === 'dark' ? '60%' : '70%';
    const lightness = theme === 'dark' ? '30%' : '80%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

export function MonthlyCalendar({ subjects }: { subjects: Record<string, SubjectData> }) {
    const { theme } = useTheme()
    const [selectedDates, setSelectedDates] = useState<Date[]>([])
    const [selectedSubject, setSelectedSubject] = useState<string>('')
    const [selectedTopic, setSelectedTopic] = useState<string>('')
    const [tasks, setTasks] = useState<{id: string, subject: string, topic: string, startDate: Date, endDate: Date, color: string}[]>([])

    const handleSelect = (dates: Date[] | undefined) => {
        if (dates) {
            setSelectedDates(dates.sort((a, b) => a.getTime() - b.getTime()));
        }
    }

    const addTask = () => {
        if (selectedDates.length >= 2 && selectedSubject && selectedTopic) {
            const subjectIndex = Object.keys(subjects).indexOf(selectedSubject);
            const color = subjectColors[subjectIndex % subjectColors.length];
            const newTask = {
                id: Date.now().toString(),
                subject: selectedSubject,
                topic: selectedTopic,
                startDate: selectedDates[0],
                endDate: selectedDates[selectedDates.length - 1],
                color: color
            };
            setTasks(prevTasks => [...prevTasks, newTask]);
            setSelectedDates([]);
            setSelectedSubject('');
            setSelectedTopic('');
        }
    }

    const removeTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }

    const modifiers = useMemo(() => {
        return tasks.reduce((acc, task) => {
            acc[`task-${task.id}`] = (date: Date) =>
                date >= task.startDate && date <= task.endDate;
            return acc;
        }, {} as Record<string, (date: Date) => boolean>);
    }, [tasks]);

    const modifiersStyles = useMemo(() => {
        return tasks.reduce((acc, task) => {
            acc[`task-${task.id}`] = {
                backgroundColor: task.color,
                opacity: 0.7,
                borderRadius: '2px',
            };
            return acc;
        }, {} as Record<string, React.CSSProperties>);
    }, [tasks]);

    useEffect(() => {
        setTasks(prevTasks => prevTasks.map(task => ({
            ...task,
            color: generateThemeAwareColor(task.subject, theme)
        })));
    }, [theme]);

    return (
        <Card className="w-full h-full">
            <CardContent className="p-4 flex flex-col lg:flex-row h-full">
                <div className="flex-grow lg:w-3/4 lg:pr-4">
                    <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={handleSelect}
                        className="rounded-md border w-full h-[700px]"
                        numberOfMonths={2}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                        components={{
                            DayContent: ({ date }) => (
                                <div className="relative w-full h-full p-2">
                                    <span className="absolute top-1 left-1">{date.getDate()}</span>
                                    {tasks.map((task) => (
                                        date >= task.startDate && date <= task.endDate && (
                                            <div
                                                key={task.id}
                                                className="absolute left-0 right-0 bottom-0 h-2"
                                                style={{ backgroundColor: task.color }}
                                                title={`${task.subject}: ${task.topic}`}
                                            />
                                        )
                                    ))}
                                </div>
                            ),
                        }}
                    />
                </div>
                <div className="lg:w-1/4 space-y-4 mt-4 lg:mt-0">
                    <Select onValueChange={setSelectedSubject} value={selectedSubject}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(subjects).map((subject) => (
                                <SelectItem key={subject.id} value={subject.subject}>
                                    {subject.subject}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedSubject && (
                        <Select onValueChange={setSelectedTopic} value={selectedTopic}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select topic" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects[selectedSubject].topics.map((topic, index) => (
                                    <SelectItem key={index} value={topic.name}>
                                        {topic.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    <Button onClick={addTask} className="w-full" disabled={!selectedSubject || !selectedTopic || selectedDates.length < 2}>
                        Add Task
                    </Button>
                    <div>
                        <h3 className="font-semibold">Tasks:</h3>
                        <ul className="space-y-2">
                            {tasks.map((task) => (
                                <li key={task.id} className="flex items-center justify-between p-2 rounded-md" style={{ backgroundColor: task.color }}>
                                    <span>{task.subject} - {task.topic}: {format(task.startDate, 'MMM d')} to {format(task.endDate, 'MMM d')}</span>
                                    <Button variant="ghost" size="icon" onClick={() => removeTask(task.id)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
