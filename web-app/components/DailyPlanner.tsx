import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function DailyPlanner() {
  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Daily Study Planner</h2>
        <Textarea placeholder="Enter your study notes here..." className="min-h-[300px]" />
      </CardContent>
    </Card>
  );
}
