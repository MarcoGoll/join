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

  /**
  * Initializes the class instance and subscribes to the tasks list.
  * The subscription is stored in `unsubTasks` to allow later unsubscription.
  */
  constructor() {
    this.unsubTasks = this.subTasksList();
  }

  // ##########################################################################################################
  // DB-Connection
  // ##########################################################################################################
  /**
  * Subscribes to the tasks list from the database, ordering by first name.
  * Updates the `tasks` array with the fetched data.
  *
  * @returns {Function} Unsubscribe function to stop listening for updates.
  */
  subTasksList() {
    const q = query(this.getTasksRef(), orderBy("title"));
    return onSnapshot(q, (list) => {
      this.tasks = [];
      list.forEach(task => {
        this.tasks.push(this.setTaskObjectWithExtraId(task.data(), task.id));
      });
      console.log("Alle aktuellen Tasks: ", this.tasks);
    });
  }

  /**
  * Retrieves a reference to the "tasks" collection in Firestore.
  *
  * @returns {CollectionReference} Reference to the "tasks" collection.
  */
  getTasksRef() {
    return collection(this.firestore, "tasks");
  }

  /**
   * Retrieves a reference to a single document within a specified Firestore collection.
   *
   * @param {string} colId - The ID of the Firestore collection.
   * @param {string} docId - The ID of the document within the collection.
   * @returns {DocumentReference} Reference to the specified Firestore document.
   */
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  /**
  * Retrieves the list of all tasks.
  *
  * @returns {Array} An array containing all tasks.
  */
  getAllTasks() {
    return this.tasks;
  }

  /**
  * Creates a Task object from the given data, ensuring all fields have default values. With an specific ID.
  *
  * @param {any} obj - The source object containing task details.
  * @param {string} id - The unique identifier for the task.
  * @returns {Task} A task object with the provided ID and default values for missing properties.
  */
  setTaskObjectWithExtraId(obj: any, id: string): Task {
    return {
      id: id,
      title: obj.title || '',
      description: obj.description || '',
      assignedTo: obj.assignedTo || [],
      dueDate: obj.dueDate || '',
      prio: obj.prio || '',
      category: obj.category || [],
      subTasks: obj.subTasks || '',
    }
  }

  /**
  * Creates a Task object from the given data, ensuring all fields have default values. Without an specific ID.
  *
  * @param {any} obj - The source object containing task details.
  * @returns {Task} A task object with default values for missing properties.
  */
  ngonDestroy() {
    this.unsubTasks();
  }

  // ##########################################################################################################
  // CRUD
  // ##########################################################################################################
  /**
  * Adds a new task to the Firestore database.
  * After successfully adding the task, it updates the task and cycles the color code.
  *
  * @param {Task} task - The task object to be added to the database.
  * @returns {Promise<void>} A promise that resolves when the task has been added and processed.
  */
  async addTask(task: Task) {
    await addDoc(this.getTasksRef(), task)
      .catch((err) => {
        console.error(err);
      }).then((docRef) => {
        task.id = docRef?.id;
        this.updateTask(task);
      })
  }

  /**
 * Deletes a task from the Firestore database.t.
 *
 * @param {Task} task - The task object to be deleted.
 * @returns {Promise<void>} A promise that resolves once the task has been deleted and the selection state is updated.
 */
  async deleteTask(task: Task) {
    let colId: string = 'tasks';
    let docId: string | undefined = task.id;

    if (docId) {
      await deleteDoc(this.getSingleDocRef(colId, docId))
        .catch(
          (err) => { console.log(err) }
        ).then(() => {
        }
        );
    }
  }

  /**
  * Updates an existing task in the Firestore database based.
  * The task object is cleaned to exclude the ID field before updating.
  * 
  * @param {Task} task - The tsak object to be updated in the database.
  * @returns {Promise<void>} A promise that resolves once the task has been updated.
  * 
  * @remarks 
  * This method uses `getCleanJson()` to remove the ID from the task object before updating,
  * as the Firestore document ID is not part of the document fields but belongs to the document itself.
  */
  async updateTask(task: Task) {
    if (task.id) {
      let docRef = this.getSingleDocRef('tasks', task.id);
      await updateDoc(docRef, this.getCleanJson(task))  //Wir können hier nicht einfach note selbst nehmen da dies eine "starke typisierung ist" und wir ein "standard" brauchen? @Freddy was heißt das | 
        //direkt note geht nicht, weil es eine ID haben könnte. Unsere Struktur in der Datenbank hat aber kein Feld ID. Die id gehört zum Dokument ist aber kein Feld. Wir müssen hier also ein JSON ohne ID erzeugen, daher getCleanJson()
        .catch((err) => {
          console.error(err);
        }).then(() => {
        })
    }
  }

  /**
  * Creates a clean JSON representation of a task object, 
  * preserving only its relevant fields.
  * 
  * @param {Task} task - The task object to be cleaned.
  * @returns {Object} A new object containing the task data without extra properties.
  */
  getCleanJson(task: Task): {} {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      prio: task.prio,
      category: task.category,
      subTasks: task.subTasks,
    }
  }

  // ########################################################################################################## 
  // Current Tasks
  // ##########################################################################################################
  /**
  * Sets the currently selected task and prepares it for updates.
  *
  * @param {Task} task - The task object to set as the current task.
  */
  setCurrentTask(task: Task) {
    if (task.id) {
      this.currentlySelectedTask = { ...task };
      this.currentTaskToBeUpdated = { ...task };
    }
  }

  // ########################################################################################################## 
  // Reset DB
  // ##########################################################################################################
  /**
   * Resets the Firestore database by deleting all existing tasks 
   * and replacing them with predefined dummy tasks.
   * 
   * @returns {Promise<void>} A promise that resolves once the reset is complete.
   */

  async resetDatabase() {
    //DELETE ALL EXISTING DOCUMENTS
    let allTasksToDelete: Task[] = this.getAllTasks();
    allTasksToDelete.forEach(taskToDelete => {
      this.deleteTask(taskToDelete);
    });

    //ADD DUMMYDATA
    this.DUMMYTASKS.forEach(dummyTask => {
      this.addTask(dummyTask);
    });
  }
}
