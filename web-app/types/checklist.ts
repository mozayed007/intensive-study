export interface Task {
  id: string
  title: string
  completed: boolean
  subTasks?: Task[]
}

export interface Checklist {
  id: string
  title: string
  color: string
  tasks: Task[]
}