import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SubjectData } from '@/lib/types';
import { Button } from "@/components/ui/button"
import { Minimize2, Maximize2, X } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SubjectChecklistProps {
    subject: SubjectData;
    onTopicToggle: (topicIndex: number, checked: boolean) => void;
    onDelete: () => void;
    isCompactView: boolean;
}

export function SubjectChecklist({ subject, onTopicToggle, onDelete, isCompactView }: SubjectChecklistProps) {
    const [isMinimized, setIsMinimized] = useState(false);

    const completedTopics = subject.topics.filter(topic => topic.checked).length;
    const progress = (completedTopics / subject.topics.length) * 100;

    const renderTopic = (topic: { name: string; checked: boolean; number: string }, index: number) => {
        const [mainTopic, subtopics] = topic.name.split(':');
        return (
            <li key={index} className="flex items-center flex-1">
                <div className="flex items-center space-x-2 flex-1">
                    <Checkbox 
                        id={`${subject.subject}-${index}`}
                        checked={topic.checked}
                        onCheckedChange={(checked) => onTopicToggle(index, checked as boolean)}
                    />
                    <Label htmlFor={`${subject.subject}-${index}`} className="flex-grow cursor-pointer">
                        <span className={`font-semibold ${isCompactView ? 'text-xs' : ''}`}>{topic.number}. {mainTopic}</span>
                        {subtopics && !isCompactView && <span className="text-sm text-gray-500"> - {subtopics}</span>}
                    </Label>
                </div>
            </li>
        );
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{subject.subject}</CardTitle>
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)}>
                        {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onDelete}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Progress value={progress} className="w-full mb-2" />
                {!isMinimized && (
                    <ol className={`list-none pl-0 ${isCompactView ? 'space-y-1' : 'space-y-2'}`}>
                        {subject.topics.map((topic, index) => renderTopic(topic, index))}
                    </ol>
                )}
            </CardContent>
        </Card>
    );
}
