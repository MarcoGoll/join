import { inject, Injectable } from '@angular/core';
import { Task } from '../../interfaces/task';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  DUMMYTASKS: Task[] = [
    {
      title: 'Refactor API Calls',
      description: 'Optimize API calls to reduce load time',
      assignedTo: [],
      status: 'done',
      dueDate: '2025-06-10',
      prio: 'Urgent',
      category: 'Technical Task',
      subTasks: [
        { checked: true, description: 'Refactor fetchUserData' },
        { checked: true, description: 'Refactor fetchOrders' },
        { checked: true, description: 'Optimize caching' },
      ],
    },
    {
      title: 'Implement Dark Mode',
      description: 'Add a dark mode toggle for the application',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-06-15',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [],
    },
    {
      title: 'Fix Login Bug',
      description: 'Users cannot log in under certain conditions',
      assignedTo: [],
      status: 'awaitFeedback',
      dueDate: '2025-05-30',
      prio: 'Urgent',
      category: 'Technical Task',
      subTasks: [{ checked: false, description: 'Investigate error logs' }],
    },
    {
      title: 'Update Documentation',
      description: 'Ensure all API endpoints are documented',
      assignedTo: [],
      status: 'done',
      dueDate: '2025-04-20',
      prio: 'Low',
      category: 'Technical Task',
      subTasks: [
        { checked: true, description: 'Review current documentation' },
        { checked: true, description: 'Add missing endpoints' },
        { checked: true, description: 'Standardize format' },
      ],
    },
    {
      title: 'Improve Mobile Responsiveness',
      description: 'Fix layout issues on mobile devices',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-07-01',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [
        { checked: true, description: 'Test on iOS' },
        { checked: false, description: 'Test on Android' },
        { checked: false, description: 'Fix flex/grid issues' },
        { checked: false, description: 'Improve touch interactions' },
      ],
    },
    {
      title: 'Redesign Dashboard',
      description: 'Enhance UI for better usability',
      assignedTo: [],
      status: 'inProgress',
      dueDate: '2025-06-20',
      prio: 'Urgent',
      category: 'User Story',
      subTasks: [
        { checked: true, description: 'Gather user feedback' },
        { checked: false, description: 'Update UI components' },
        { checked: false, description: 'Improve contrast' },
        { checked: false, description: 'Adjust font sizes' },
      ],
    },
    {
      title: 'Redesign Dashboard',
      description: 'Enhance UI for better usability',
      assignedTo: [],
      status: 'inProgress',
      dueDate: '2025-06-20',
      prio: 'Urgent',
      category: 'User Story',
      subTasks: [
        { checked: false, description: 'Gather user feedback' },
        { checked: false, description: 'Update UI components' },
        { checked: false, description: 'Improve contrast' },
        { checked: true, description: 'Adjust font sizes' },
      ],
    },
    {
      title: 'Migrate Database',
      description: 'Move from MySQL to PostgreSQL',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-08-01',
      prio: 'Urgent',
      category: 'Technical Task',
      subTasks: [
        { checked: true, description: 'Export MySQL data' },
        { checked: false, description: 'Import into PostgreSQL' },
        { checked: false, description: 'Update ORM models' },
        { checked: false, description: 'Test migrations' },
      ],
    },
    {
      title: 'Optimize Images',
      description: 'Reduce image sizes without losing quality',
      assignedTo: [],
      status: 'done',
      dueDate: '2025-06-05',
      prio: 'Medium',
      category: 'Technical Task',
      subTasks: [],
    },
    {
      title: 'Enhance Search Functionality',
      description: 'Implement autocomplete and filters',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-06-25',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [
        { checked: true, description: 'Add autocomplete' },
        { checked: true, description: 'Implement search filters' },
        { checked: true, description: 'Optimize search speed' },
        { checked: false, description: 'Support fuzzy search' },
      ],
    },
    {
      title: 'Set Up CI/CD',
      description: 'Automate testing and deployment process',
      assignedTo: [],
      status: 'inProgress',
      dueDate: '2025-06-12',
      prio: 'Urgent',
      category: 'Technical Task',
      subTasks: [
        { checked: false, description: 'Configure GitHub Actions' },
        { checked: false, description: 'Add automated tests' },
        { checked: true, description: 'Deploy staging environment' },
        { checked: false, description: 'Setup rollback strategy' },
      ],
    },
    {
      title: 'Implement Role-Based Access Control',
      description: 'Restrict actions based on user roles',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-06-30',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [
        { checked: false, description: 'Define roles' },
        { checked: false, description: 'Implement permission checks' },
      ],
    },
    {
      title: 'Fix UI Bugs',
      description: 'Resolve minor UI inconsistencies',
      assignedTo: [],
      status: 'done',
      dueDate: '2025-06-08',
      prio: 'Low',
      category: 'Technical Task',
      subTasks: [],
    },
    {
      title: 'Improve Performance',
      description: 'Optimize app speed and responsiveness',
      assignedTo: [],
      status: 'inProgress',
      dueDate: '2025-07-10',
      prio: 'Urgent',
      category: 'Technical Task',
      subTasks: [
        { checked: true, description: 'Minimize JS bundle size' },
        { checked: false, description: 'Optimize database queries' },
      ],
    },
    {
      title: 'Develop User Profile Page',
      description: 'Create a customizable user profile section',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-07-05',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [{ checked: false, description: 'Add profile picture upload' }],
    },
    {
      title: 'Security Audit',
      description: 'Review system security vulnerabilities',
      assignedTo: [],
      status: 'done',
      dueDate: '2025-05-15',
      prio: 'Urgent',
      category: 'Technical Task',
      subTasks: [
        { checked: true, description: 'Run penetration test' },
        { checked: true, description: 'Fix identified issues' },
        { checked: true, description: 'Review access controls' },
      ],
    },
    {
      title: 'Email Notifications',
      description: 'Implement automated email alerts',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-06-18',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [],
    },
    {
      title: 'User Feedback System',
      description: 'Collect and display user feedback',
      assignedTo: [],
      status: 'inProgress',
      dueDate: '2025-07-15',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [
        { checked: false, description: 'Create feedback form' },
        { checked: false, description: 'Display user reviews' },
        { checked: false, description: 'Analyze feedback' },
      ],
    },
    {
      title: 'Test Automation',
      description: 'Increase test coverage with automated tests',
      assignedTo: [],
      status: 'awaitFeedback',
      dueDate: '2025-06-28',
      prio: 'Urgent',
      category: 'Technical Task',
      subTasks: [],
    },
    {
      title: 'Accessibility Improvements',
      description: 'Make the app more accessible for all users',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-07-20',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [
        { checked: false, description: 'Add ARIA attributes' },
        { checked: false, description: 'Improve keyboard navigation' },
        { checked: false, description: 'Increase contrast' },
      ],
    },
    {
      title: 'Analytics Dashboard',
      description: 'Create a dashboard for tracking user activity',
      assignedTo: [],
      status: 'inProgress',
      dueDate: '2025-07-10',
      prio: 'Medium',
      category: 'User Story',
      subTasks: [{ checked: false, description: 'Set up tracking events' }],
    },
    {
      title: 'Migrate Frontend to React 18',
      description: 'Upgrade frontend framework to latest version',
      assignedTo: [],
      status: 'toDo',
      dueDate: '2025-08-05',
      prio: 'Urgent',
      category: 'Technical Task',
      subTasks: [
        { checked: false, description: 'Update dependencies' },
        { checked: false, description: 'Test all components' },
        { checked: false, description: 'Fix deprecated methods' },
      ],
    },
  ];

  firestore: Firestore = inject(Firestore);
  tasksAll: Task[] = [];
  tasksToDo: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksAwaitFeedback: Task[] = [];
  tasksDone: Task[] = [];
  isAddTaskOverlayDisplayed: boolean = false;
  isTaskOverlayDisplayed: boolean = false;
  isTaskinEditMode: boolean = false;
  isAssignedToOpen: boolean = false;
  statusToBeUsed: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done' = 'toDo';
  subtasksToAdd: {
    inEditMode: boolean;
    checked: boolean;
    description: string;
  }[] = [];
  
  unsubTasks;

  currentlySelectedTask: Task = {
    title: 'Create JSDoc',
    description: 'Create a JSDoc description for each method',
    assignedTo: ['5AWBsiFYfWsiYst9Aw3A'],
    status: 'toDo',
    dueDate: '2025-05-22',
    prio: 'Low',
    category: 'Technical Task',
    subTasks: [
      { checked: true, description: 'Component Contactdetails' },
      { checked: false, description: 'Component Contactlist' },
    ],
  };

  currentTaskToBeUpdated: Task = {
    title: 'Create JSDoc',
    description: 'Create a JSDoc description for each method',
    assignedTo: ['5AWBsiFYfWsiYst9Aw3A'],
    status: 'toDo',
    dueDate: '2025-05-22',
    prio: 'Low',
    category: 'Technical Task',
    subTasks: [
      { checked: true, description: 'Component Contactdetails' },
      { checked: false, description: 'Component Contactlist' },
    ],
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
    const q = query(this.getTasksRef(), orderBy('title'));
    return onSnapshot(q, (list) => {
      this.tasksAll = [];
      this.tasksToDo = [];
      this.tasksInProgress = [];
      this.tasksAwaitFeedback = [];
      this.tasksDone = [];
      list.forEach((task) => {
        let myTask = this.setTaskObjectWithExtraId(task.data(), task.id);
        this.tasksAll.push(myTask);
        switch (myTask.status) {
          case 'toDo':
            this.tasksToDo.push(myTask);
            break;
          case 'inProgress':
            this.tasksInProgress.push(myTask);
            break;
          case 'awaitFeedback':
            this.tasksAwaitFeedback.push(myTask);
            break;
          case 'done':
            this.tasksDone.push(myTask);
            break;
          default:
            console.error('Status of ', task, ' is not known');
        }
      });
    });
  }

  /**
   * Retrieves a reference to the "tasks" collection in Firestore.
   *
   * @returns {CollectionReference} Reference to the "tasks" collection.
   */
  getTasksRef() {
    return collection(this.firestore, 'tasks');
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
      status: obj.status || '',
      dueDate: obj.dueDate || '',
      prio: obj.prio || '',
      category: obj.category || [],
      subTasks: obj.subTasks || '',
    };
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
  // GET TASK INFOS
  // ##########################################################################################################
  /**
   * Retrieves the list of all tasks.
   *
   * @returns {Array} An array containing all tasks.
   */
  getAllTasks() {
    return this.tasksAll;
  }

  /**
   * Returns the number of tasks with a specific status.
   * This function filters through all tasks and counts how many match the given status.
   *
   * @param {'toDo' | 'inProgress' | 'awaitFeedback' | 'done'} status - The status of the tasks to count.
   * @returns {number} The number of tasks that match the specified status.
   */
  getAmountOfTasksByStatus(
    status: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done'
  ) {
    let amount = 0;
    this.getAllTasks().forEach((task) => {
      if (task.status === status) {
        amount++;
      }
    });
    return amount;
  }

  /**
   * Returns the number of tasks with the priority set to 'Urgent'.
   * This function filters through all tasks and counts how many have the 'Urgent' priority.
   *
   * @returns {number} The number of tasks that have the 'Urgent' priority.
   */
  getAmountOfTasksByPrio() {
    let amount = 0;
    this.getAllTasks().forEach((task) => {
      if (task.prio === 'Urgent') {
        amount++;
      }
    });
    return amount;
  }

  /**
   * Returns the total number of tasks.
   * This function counts all tasks retrieved by the `getAllTasks()` method.
   *
   * @returns {number} The total number of tasks.
   */
  getAmountOfAllTasks() {
    return this.getAllTasks().length;
  }

  /**
   * Returns the upcoming deadline date for the urgent tasks.
   * This function finds the earliest due date from all urgent tasks and formats it into a human-readable string.
   *
   * @returns {string} The formatted date of the upcoming deadline in 'en-US' locale (e.g., 'March 13, 2025').
   */
  getUpcomingDeadline() {
    let dates: string[] = this.getAllUrgentTasksDueDates();
    const upcommingDeadline = new Date(
      Math.min(...dates.map((date) => new Date(date).getTime()))
    );
    return upcommingDeadline.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  }

  /**
   * Retrieves the due dates of all tasks with 'Urgent' priority.
   * This function filters through all tasks and returns a list of due dates for those marked as 'Urgent'.
   *
   * @returns {string[]} An array of due dates for all urgent tasks.
   */
  getAllUrgentTasksDueDates() {
    let dueDates: string[] = [];
    this.getAllTasks().forEach((task) => {
      if (task.prio == 'Urgent') {
        dueDates.push(task.dueDate);
      }
    });
    return dueDates;
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
      })
      .then((docRef) => {
        task.id = docRef?.id;
        this.updateTask(task);
      });
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
        .catch((err) => {
          console.log(err);
        })
        .then(() => {});
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
      await updateDoc(docRef, this.getCleanJson(task)) //Wir können hier nicht einfach note selbst nehmen da dies eine "starke typisierung ist" und wir ein "standard" brauchen? @Freddy was heißt das |
        //direkt note geht nicht, weil es eine ID haben könnte. Unsere Struktur in der Datenbank hat aber kein Feld ID. Die id gehört zum Dokument ist aber kein Feld. Wir müssen hier also ein JSON ohne ID erzeugen, daher getCleanJson()
        .catch((err) => {
          console.error(err);
        })
        .then(() => {});
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
      status: task.status,
      dueDate: task.dueDate,
      prio: task.prio,
      category: task.category,
      subTasks: task.subTasks,
    };
  }

  /**
   * Sets the status to be used for tasks.
   * This function updates the status that is to be applied to tasks. The status can be one of: 'toDo', 'inProgress', 'awaitFeedback', or 'done'.
   *
   * @param {'toDo' | 'inProgress' | 'awaitFeedback' | 'done'} status - The status to be set for tasks.
   * @returns {void} This function does not return a value. It simply updates the `statusToBeUsed` property.
   */
  setStatusToBeUsed(status: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done') {
    this.statusToBeUsed = status;
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
      this.currentlySelectedTask = structuredClone(task);
      this.currentTaskToBeUpdated = structuredClone(task);
      this.subtasksToAdd = [];
      this.setSubtasksToAdd(task);
    }
  }

  /**
   * Sets the subtasks to be added for a given task.
   *
   * @param {Task} task - The task object whose subtasks are to be added.
   * @returns {void} This function does not return a value. It updates the `subtasksToAdd` array.
   */
  setSubtasksToAdd(task: Task) {
    task.subTasks.forEach((subtask) => {
      this.subtasksToAdd.push({
        inEditMode: false,
        checked: subtask.checked,
        description: subtask.description,
      });
    });
  }

  // ##########################################################################################################
  // Search Tasks
  // ##########################################################################################################
  /**
   * Searches for tasks based on the provided search string.
   *
   * @param {string} searchString - The string to search for within task titles and descriptions.
   * @returns {Task[]} An array of tasks that match the search criteria.
   */
  searchTasks(searchString: string) {
    let searchResults: Task[] = [];

    if (searchString.length >= 3) {
      this.getAllTasks().forEach((task) => {
        //Title
        if (task.title.toLowerCase().includes(searchString.toLowerCase())) {
          searchResults.push(task);
        } else if (
          task.description.toLowerCase().includes(searchString.toLowerCase())
        ) {
          searchResults.push(task);
        }
      });
    }
    return searchResults;
  }

  // ##########################################################################################################
  // Overlays
  // ##########################################################################################################
  /**
   * Toggles the visibility of the "Add Task" overlay.
   */
  toggleIsAddTaskOverlayDisplayed() {
    this.isAddTaskOverlayDisplayed = !this.isAddTaskOverlayDisplayed;
  }

  /**
   * Toggles the visibility of the "Details Task" overlay.
   */
  toggleIsTaskOverlayDisplayed() {
    this.isTaskOverlayDisplayed = !this.isTaskOverlayDisplayed;
    this.isTaskinEditMode = false;
  }

  /**
   * Toggles the visibility of the "AssignedTo" list.
   */
  toggleIsAssignedToOpen() {
    this.isAssignedToOpen = !this.isAssignedToOpen;
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
    allTasksToDelete.forEach((taskToDelete) => {
      this.deleteTask(taskToDelete);
    });

    //ADD DUMMYDATA
    this.DUMMYTASKS.forEach((dummyTask) => {
      this.addTask(dummyTask);
    });
  }
}
