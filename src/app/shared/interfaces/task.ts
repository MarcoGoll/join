import { Contact } from "./contact";

export interface Task {
    id?: string; // ? optional
    title: string;
    description: string;
    assignedTo: Contact[];
    status: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done';
    dueDate: string;
    prio: 'Urgent' | 'Medium' | 'Low';
    category: 'Technical Task' | 'User Story';
    subTasks: string[];
}
