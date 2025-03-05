import { inject, Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private masterPW = '!superAdmin!';
  isLoginDisplayed: boolean = true;
  isSignupDisplayed: boolean = false;
  isMainContentDisplayed: boolean = false;

  DUMMYUSERS: User[] = [
    {
      firstName: 'Maxi',
      lastName: 'Musterfrau',
      fullName: 'Maxi Musterfrau',
      email: 'maxi.musterfrau@gmail.de',
      pw: '12345Aa!',
    },
  ];

  guestUser: User = {
    firstName: 'Guest',
    lastName: 'User',
    fullName: 'Guest User',
    email: 'guest.user.de',
    pw: this.masterPW,
  };

  firestore: Firestore = inject(Firestore);
  users: User[] = [];
  unsubUsers;

  /**
   * Initializes the class instance and subscribes to the users list.
   * The subscription is stored in `unsubUsers` to allow later unsubscription.
   */
  constructor() {
    this.unsubUsers = this.subUsersList();
  }

  // ##########################################################################################################
  // DB-Connection
  // ##########################################################################################################
  /**
   * Subscribes to the users list from the database, ordering by first name.
   * Updates the `users` array with the fetched data.
   *
   * @returns {Function} Unsubscribe function to stop listening for updates.
   */
  subUsersList() {
    const q = query(this.getUsersRef(), orderBy('firstName'));
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach((user) => {
        this.users.push(this.setUserObjectWithExtraId(user.data(), user.id));
      });
    });
  }

  /**
   * Retrieves a reference to the "users" collection in Firestore.
   *
   * @returns {CollectionReference} Reference to the "users" collection.
   */
  getUsersRef() {
    return collection(this.firestore, 'users');
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
   * Retrieves the list of all users.
   *
   * @returns {Array} An array containing all users.
   */
  getAllUsers() {
    return this.users;
  }

  /**
   * Creates a user object from the given data, ensuring all fields have default values. With an specific ID.
   *
   * @param {any} obj - The source object containing user details.
   * @param {string} id - The unique identifier for the user.
   * @returns {User} A user object with the provided ID and default values for missing properties.
   */
  setUserObjectWithExtraId(obj: any, id: string): User {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      fullName: obj.fullName || '',
      email: obj.email || '',
      pw: obj.pw || '',
    };
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the users list to prevent memory leaks.
   */
  ngonDestroy() {
    this.unsubUsers();
  }

  // ##########################################################################################################
  // CRUD
  // ##########################################################################################################
  /**
   * Adds a new user to the Firestore database.
   * After successfully adding the user, it updates the user and cycles the color code.
   *
   * @param {User} user - The user object to be added to the database.
   * @returns {Promise<void>} A promise that resolves when the user has been added and processed.
   */
  async addUser(user: User) {
    await addDoc(this.getUsersRef(), user)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        user.id = docRef?.id;
        this.updateUser(user);
      });
  }

  /**
   * Deletes a user from the Firestore database.t.
   *
   * @param {User} user - The user object to be deleted.
   * @returns {Promise<void>} A promise that resolves once the user has been deleted and the selection state is updated.
   */
  async deleteUser(user: User) {
    let colId: string = 'users';
    let docId: string | undefined = user.id;

    if (docId) {
      await deleteDoc(this.getSingleDocRef(colId, docId))
        .catch((err) => {
          console.log(err);
        })
        .then(() => {});
    }
  }

  /**
   * Updates an existing user in the Firestore database based.
   * The user object is cleaned to exclude the ID field before updating.
   *
   * @param {User} user - The user object to be updated in the database.
   * @returns {Promise<void>} A promise that resolves once the user has been updated.
   *
   * @remarks
   * This method uses `getCleanJson()` to remove the ID from the user object before updating,
   * as the Firestore document ID is not part of the document fields but belongs to the document itself.
   */
  async updateUser(user: User) {
    if (user.id) {
      let docRef = this.getSingleDocRef('users', user.id);
      await updateDoc(docRef, this.getCleanJson(user))
        .catch((err) => {
          console.error(err);
        })
        .then(() => {});
    }
  }

  /**
   * Creates a clean JSON representation of a user object,
   * preserving only its relevant fields.
   *
   * @param {User} user - The user object to be cleaned.
   * @returns {Object} A new object containing the user data without extra properties.
   */
  getCleanJson(user: User): {} {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      pw: user.pw,
    };
  }

  // ##########################################################################################################
  // Reset DB
  // ##########################################################################################################
  /**
   * Resets the Firestore database by deleting all existing users
   * and replacing them with predefined dummy users.
   *
   * @returns {Promise<void>} A promise that resolves once the reset is complete.
   */
  async resetDatabase() {
    //DELETE ALL EXISTING DOCUMENTS
    let allUsersToDelete: User[] = this.getAllUsers();
    allUsersToDelete.forEach((userToDelete) => {
      this.deleteUser(userToDelete);
    });

    //ADD DUMMYDATA
    this.DUMMYUSERS.forEach((dummyUser) => {
      this.addUser(dummyUser);
    });
  }
}
