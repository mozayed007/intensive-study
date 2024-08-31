import { SubjectData } from './types';

const STORAGE_KEY = 'subjects';

export async function saveSubjects(subjects: SubjectData[]): Promise<void> {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    }
}

export async function loadSubjects(): Promise<Record<string, SubjectData>> {
    if (typeof window !== 'undefined') {
        const savedSubjects = localStorage.getItem(STORAGE_KEY);
        if (savedSubjects) {
            const subjectsArray = JSON.parse(savedSubjects) as SubjectData[];
            return subjectsArray.reduce((acc, subject) => {
                acc[subject.id] = subject;
                return acc;
            }, {} as Record<string, SubjectData>);
        }
    }
    return {};
}