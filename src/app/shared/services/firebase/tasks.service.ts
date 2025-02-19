import { inject, Injectable } from '@angular/core';
import { Task } from '../../interfaces/task';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, limit, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  DUMMYTASKS: Task[] = [{
    "title": "Create JSDoc",
    "description": "Create a JSDoc description for each method",
    "assignedTo": [],
    "dueDate": "22/05/2025",
    "prio": 'Urgent',
    "category": 'Technical Task',
    "subTasks": ['Component Contactdetails', 'Component Contactlist']
  }];

  firestore: Firestore = inject(Firestore);
  tasks: Task[] = [];
  unsubTasks;

  currentlySelectedTask: Task = {
    "title": "Create JSDoc",
    "description": "Create a JSDoc description for each method",
    "assignedTo": [],
    "dueDate": "22/05/2025",
    "prio": 'Urgent',
    "category": 'Technical Task',
    "subTasks": ['Component Contactdetails', 'Component Contactlist']
  };

  currentTaskToBeUpdated: Task = {
    "title": "Create JSDoc",
    "description": "Create a JSDoc description for each method",
    "assignedTo": [],
    "dueDate": "22/05/2025",
    "prio": 'Urgent',
    "category": 'Technical Task',
    "subTasks": ['Component Contactdetails', 'Component Contactlist']
  };

  constructor() {
    this.unsubTasks = this.subContactsList();
  }

  // ##################################################### 
  // Connection
  // #####################################################
  subContactsList() {
    const q = query(this.getContactsRef(), orderBy("title"));
    return onSnapshot(q, (list) => {
      this.tasks = [];
      list.forEach(task => {
        this.tasks.push(this.setTaskObjectWithExtraId(task.data(), task.id));
      });
    });
  }

  getContactsRef() {
    return collection(this.firestore, "tasks");
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  getAllTasks() {
    return this.tasks;
  }

  setTaskObjectWithExtraId(obj: any, id: string): Task {
    return {
      title: id,
      description: obj.description || '',
      assignedTo: obj.assignedTo || [],
      dueDate: obj.dueDate || '',
      prio: obj.prio || '',
      category: obj.category || [],
      subTasks: obj.subTasks || '',
    }
  }

  ngonDestroy() {
    this.unsubTasks();
  }

}
