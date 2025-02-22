export interface Task {
    id?: string; // ? optional
    title: string;
    description: string;
    assignedTo: string[]; //list of Contact ID's
    status: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done';
    dueDate: string;
    prio: 'Urgent' | 'Medium' | 'Low';
    category: 'Technical Task' | 'User Story';
    subTasks: string[]; 
} 
