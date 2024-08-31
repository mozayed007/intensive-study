import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Pomodoro() {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [sessionLength, setSessionLength] = useState(25);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && time > 0) {
        interval = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);
        } else if (time === 0) {
        // Play sound here
        setIsActive(false);
        }
        return () => {
        if (interval) clearInterval(interval);
        };
    }, [isActive, time]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setTime(sessionLength * 60);
        setIsActive(false);
    };

    const handleSessionLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLength = parseInt(e.target.value);
        setSessionLength(newLength);
        setTime(newLength * 60);
    };

    return (
        <Card>
        <CardContent>
            <h2 className="text-2xl font-bold mb-4">Pomodoro Timer</h2>
            <div className="text-4xl font-bold mb-4">
            {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </div>
            <div className="space-x-2 mb-4">
            <Button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</Button>
            <Button onClick={resetTimer}>Reset</Button>
            </div>
            <div className="flex items-center space-x-2">
            <label htmlFor="sessionLength">Session Length (minutes):</label>
            <Input
                type="number"
                id="sessionLength"
                value={sessionLength}
                onChange={handleSessionLengthChange}
                min="1"
                max="60"
            />
            </div>
        </CardContent>
        </Card>
    );
}
