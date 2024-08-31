export interface SubjectData {
    id: string;
    subject: string;
    topics: {
        name: string;
        checked: boolean;
        number: string;
    }[];
}
