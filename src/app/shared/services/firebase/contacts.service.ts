import { HostListener, inject, Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, limit, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ContactsService { 

  isContactSelected: boolean = false;
  isContactListViewed: boolean = true;
  isContactDetailsViewed: boolean = false; 
  isAddContactViewed: boolean = false;
  isEditContactViewed: boolean = false;

  DUMMYCONTACTS: Contact[] = [
    {
      "firstName": "Lukas",
      "lastName": "Meier",
      "fullName": "Lukas Meier",
      "nameShortcut": "LM",
      "nameShortcutColorCode": 1,
      "email": "lukas.meier@gmail.de",
      "phone": "+4915234567890",
      "img": ""
    },
    {
      "firstName": "Nina",
      "lastName": "Fischer",
      "fullName": "Nina Fischer",
      "nameShortcut": "NF",
      "nameShortcutColorCode": 2,
      "email": "nina.fischer@gmail.de",
      "phone": "+4915234567891",
      "img": ""
    },
    {
      "firstName": "Oliver",
      "lastName": "Becker",
      "fullName": "Oliver Becker",
      "nameShortcut": "OB",
      "nameShortcutColorCode": 3,
      "email": "oliver.becker@gmail.de",
      "phone": "+4915234567892",
      "img": ""
    },
    {
      "firstName": "Paula",
      "lastName": "Keller",
      "fullName": "Paula Keller",
      "nameShortcut": "PK",
      "nameShortcutColorCode": 4,
      "email": "paula.keller@gmail.de",
      "phone": "+4915234567893",
      "img": ""
    },
    {
      "firstName": "Quentin",
      "lastName": "Schneider",
      "fullName": "Quentin Schneider",
      "nameShortcut": "QS",
      "nameShortcutColorCode": 5,
      "email": "quentin.schneider@gmail.de",
      "phone": "+4915234567894",
      "img": ""
    },
    {
      "firstName": "Robin",
      "lastName": "Hoffmann",
      "fullName": "Robin Hoffmann",
      "nameShortcut": "RH",
      "nameShortcutColorCode": 6,
      "email": "robin.hoffmann@gmail.de",
      "phone": "+4915234567895",
      "img": ""
    },
    {
      "firstName": "Sophia",
      "lastName": "Gruber",
      "fullName": "Sophia Gruber",
      "nameShortcut": "SG",
      "nameShortcutColorCode": 7,
      "email": "sophia.gruber@gmail.de",
      "phone": "+4915234567896",
      "img": ""
    },
    {
      "firstName": "Tim",
      "lastName": "Fuchs",
      "fullName": "Tim Fuchs",
      "nameShortcut": "TF",
      "nameShortcutColorCode": 8,
      "email": "tim.fuchs@gmail.de",
      "phone": "+4915234567897",
      "img": ""
    },
    {
      "firstName": "Ulrike",
      "lastName": "Berger",
      "fullName": "Ulrike Berger",
      "nameShortcut": "UB",
      "nameShortcutColorCode": 9,
      "email": "ulrike.berger@gmail.de",
      "phone": "+4915234567898",
      "img": ""
    },
    {
      "firstName": "Victor",
      "lastName": "Koch",
      "fullName": "Victor Koch",
      "nameShortcut": "VK",
      "nameShortcutColorCode": 10,
      "email": "victor.koch@gmail.de",
      "phone": "+4915234567899",
      "img": ""
    },
    {
      "firstName": "Walter",
      "lastName": "Neumann",
      "fullName": "Walter Neumann",
      "nameShortcut": "WN",
      "nameShortcutColorCode": 11,
      "email": "walter.neumann@gmail.de",
      "phone": "+4915234567900",
      "img": ""
    },
    {
      "firstName": "Xenia",
      "lastName": "Krüger",
      "fullName": "Xenia Krüger",
      "nameShortcut": "XK",
      "nameShortcutColorCode": 12,
      "email": "xenia.krueger@gmail.de",
      "phone": "+4915234567901",
      "img": ""
    },
    {
      "firstName": "Bärbel",
      "lastName": "Schmidt",
      "fullName": "Bärbel Schmidt",
      "nameShortcut": "BS",
      "nameShortcutColorCode": 13,
      "email": "baerbel.schmidt@web.de",
      "phone": "+4915234567902",
      "img": ""
    },
    {
      "firstName": "Bernd",
      "lastName": "Müller",
      "fullName": "Bernd Müller",
      "nameShortcut": "BM",
      "nameShortcutColorCode": 14,
      "email": "bernd.mueller@outlook.de",
      "phone": "+4915521369903",
      "img": ""
    },
    {
      "firstName": "Lena",
      "lastName": "Schulz",
      "fullName": "Lena Schulz",
      "nameShortcut": "LS",
      "nameShortcutColorCode": 15,
      "email": "lena.schulz@gmail.de",
      "phone": "+4915234567904",
      "img": ""
    },
    {
      "firstName": "Nico",
      "lastName": "Braun",
      "fullName": "Nico Braun",
      "nameShortcut": "NB",
      "nameShortcutColorCode": 1,
      "email": "nico.braun@gmail.de",
      "phone": "+4915234567905",
      "img": ""
    },
    {
      "firstName": "Olivia",
      "lastName": "Lehmann",
      "fullName": "Olivia Lehmann",
      "nameShortcut": "OL",
      "nameShortcutColorCode": 2,
      "email": "olivia.lehmann@gmail.de",
      "phone": "+4915255689914",
      "img": ""
    },
    {
      "firstName": "Hannes",
      "lastName": "Traubel",
      "fullName": "Hannes Traubel",
      "nameShortcut": "HL",
      "nameShortcutColorCode": 3,
      "email": "hannes.traubel@gmail.de",
      "phone": "+4915234565482",
      "img": ""
    },
    {
      "firstName": "Herbert",
      "lastName": "Vogel",
      "fullName": "Herbert Vogel",
      "nameShortcut": "HV",
      "nameShortcutColorCode": 4,
      "email": "herbertvogel@gmx.de",
      "phone": "+4915385462582",
      "img": ""
    },
    {
      "firstName": "Hannelore",
      "lastName": "Degenhart",
      "fullName": "Hannelore Degenhart",
      "nameShortcut": "HV",
      "nameShortcutColorCode": 5,
      "email": "Hanneloredegenhart@web.de",
      "phone": "+4915385462582",
      "img": ""
    }
  ]
    ;

  firestore: Firestore = inject(Firestore);

  contacts: Contact[] = [];

  unsubContacts;
  currentlySelectedContact: Contact = {
    "firstName": "i_firstName",
    "lastName": "i_lastName",
    "fullName": "i_fullName",
    "nameShortcut": "II",
    "nameShortcutColorCode": 1,
    "email": "initialSelectedContact@gmail.de",
    "phone": "+4915234567890",
    "img": ""
  };

  currentContactToBeUpdated: Contact = {
    "firstName": "u_firstName",
    "lastName": "u_lastName",
    "fullName": "u_fullName",
    "nameShortcut": "UU",
    "nameShortcutColorCode": 1,
    "email": "updateContact@gmail.de",
    "phone": "+4915234567890",
    "img": ""
  };

  currentColorCode = 0;

  /**
    * Initializes the class instance and subscribes to the contacts list.
    * The subscription is stored in `unsubContacts` to allow later unsubscription.
    */
  constructor() {
    this.unsubContacts = this.subContactsList();
  }


  // ##########################################################################################################
  // DB-Connection
  // ##########################################################################################################
  /**
  * Subscribes to the contacts list from the database, ordering by first name.
  * Updates the `contacts` array with the fetched data.
  *
  * @returns {Function} Unsubscribe function to stop listening for updates.
  */
  subContactsList() {
    const q = query(this.getContactsRef(), orderBy("firstName"));
    return onSnapshot(q, (list) => {
      this.contacts = [];
      list.forEach(contact => {
        this.contacts.push(this.setContactObjectWithExtraId(contact.data(), contact.id));
      });
    });
  }

  /**
   * Retrieves a reference to the "contacts" collection in Firestore.
   *
   * @returns {CollectionReference} Reference to the "contacts" collection.
   */
  getContactsRef() {
    return collection(this.firestore, "contacts");
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
  * Retrieves the list of all contacts.
  *
  * @returns {Array} An array containing all contacts.
  */
  getAllContacts() {
    return this.contacts;
  }

  /**
 * Retrieves all contacts whose first name starts with a specified letter.
 * The results are sorted alphabetically by first name.
 *
 * @param {string} letter - The uppercase letter to filter contacts by.
 * @returns {Contact[]} An array of contacts that match the given letter.
 */
  getAllContactsByLetter(letter: string): Contact[] {
    return this.contacts.filter(
      (contact) => contact.firstName && contact.firstName[0].toLocaleUpperCase() === letter
    )
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  /**
 * Retrieves a sorted list of unique uppercase letters that represent 
 * the first letter of the first names of all contacts.
 *
 * @returns {string[]} An array of unique uppercase letters where contacts exist.
 */
  getAllLettersWhereContacsOccour() {
    let letters: string[] = [];

    this.getAllContacts().forEach(contact => {
      if (!letters.includes(contact.firstName[0].toLocaleUpperCase())) {
        letters.push(contact.firstName[0].toUpperCase());
      }
    });
    return letters.sort();
  }

  /**
 * Creates a Contact object from the given data, ensuring all fields have default values. With an specific ID.
 *
 * @param {any} obj - The source object containing contact details.
 * @param {string} id - The unique identifier for the contact.
 * @returns {Contact} A contact object with the provided ID and default values for missing properties.
 */
  setContactObjectWithExtraId(obj: any, id: string): Contact {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      fullName: obj.fullName || '',
      nameShortcut: obj.nameShortcut || '',
      nameShortcutColorCode: obj.nameShortcutColorCode || '',
      email: obj.email || '',
      phone: obj.phone || '',
      img: obj.img || ''
    }
  }

  /**
 * Creates a Contact object from the given data, ensuring all fields have default values. Without an specific ID.
 *
 * @param {any} obj - The source object containing contact details.
 * @returns {Contact} A contact object with default values for missing properties.
 */
  setContactObjectWithoutExtraId(obj: any): Contact {
    return {
      id: obj.id || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      fullName: obj.fullName || '',
      nameShortcut: obj.nameShortcut || '',
      nameShortcutColorCode: obj.nameShortcutColorCode || '',
      email: obj.email || '',
      phone: obj.phone || '',
      img: obj.img || ''
    }
  }

  /**
 * Lifecycle hook that is called when the component is destroyed.
 * Unsubscribes from the contacts list to prevent memory leaks.
 */
  ngonDestroy() {
    this.unsubContacts();
  }

  // ##########################################################################################################
  // CRUD
  // ##########################################################################################################
  /**
  * Adds a new contact to the Firestore database.
  * After successfully adding the contact, it updates the contact and cycles the color code.
  *
  * @param {Contact} contact - The contact object to be added to the database.
  * @returns {Promise<void>} A promise that resolves when the contact has been added and processed.
  */
  async addContact(contact: Contact) {
    await addDoc(this.getContactsRef(), contact)
      .catch((err) => {
        console.error(err);
      }).then((docRef) => {
        contact.id = docRef?.id;
        this.updateContact(contact);
        this.currentColorCode++;
        if (this.currentColorCode >= 16) {
          this.currentColorCode = 1;
        }
      })
  }

  /**
  * Deletes a contact from the Firestore database.t.
  *
  * @param {Contact} contact - The contact object to be deleted.
  * @returns {Promise<void>} A promise that resolves once the contact has been deleted and the selection state is updated.
  */
  async deleteContact(contact: Contact) {
    let colId: string = 'contacts';
    let docId: string | undefined = contact.id;

    if (docId) {
      await deleteDoc(this.getSingleDocRef(colId, docId))
        .catch(
          (err) => { console.log(err) }
        ).then(() => {
          this.isContactSelected = false;
        }
        );
    }
  }

  /**
   * Updates an existing contact in the Firestore database based.
   * The contact object is cleaned to exclude the ID field before updating.
   * 
   * @param {Contact} contact - The contact object to be updated in the database.
   * @returns {Promise<void>} A promise that resolves once the contact has been updated.
   * 
   * @remarks 
   * This method uses `getCleanJson()` to remove the ID from the contact object before updating,
   * as the Firestore document ID is not part of the document fields but belongs to the document itself.
   */
  async updateContact(contact: Contact) {
    if (contact.id) {
      let docRef = this.getSingleDocRef('contacts', contact.id);
      await updateDoc(docRef, this.getCleanJson(contact))
        .catch((err) => {
          console.error(err);
        }).then(() => {
        })
    }
  }

  /**
 * Creates a clean JSON representation of a contact object, 
 * preserving only its relevant fields.
 * 
 * @param {Contact} contact - The contact object to be cleaned.
 * @returns {Object} A new object containing the contact data without extra properties.
 */
  getCleanJson(contact: Contact): {} {
    return {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      fullName: contact.fullName,
      nameShortcut: contact.nameShortcut,
      email: contact.email,
      phone: contact.phone,
      img: contact.img,
    }
  }

  // ########################################################################################################## 
  // Current Contacts
  // ##########################################################################################################
  /**
 * Sets the currently selected contact and prepares it for updates.
 *
 * @param {Contact} contact - The contact object to set as the current contact.
 */
  setCurrentContacts(contact: Contact) {
    if (contact.id) {
      this.currentlySelectedContact = { ...contact };
      this.currentContactToBeUpdated = { ...contact };
      this.isContactSelected = true;
    }
  }

  // ########################################################################################################## 
  // Automated Data for addContact
  // ##########################################################################################################
  /**
   * Generates a name shortcut from the given first and last name.
   *
   * @param {string} firstName - The first name of the contact.
   * @param {string} lastName - The last name of the contact.
   * @returns {string} The generated name shortcut in uppercase.
   */
  getNameShortcut(firstName: string, lastName: string) {
    if (lastName == "") {
      return firstName[0].toLocaleUpperCase();
    } else {
      return firstName[0].toLocaleUpperCase() + lastName[0].toLocaleUpperCase();
    }
  }

  /**
   * Returns the next color code in a cyclic sequence from 1 to 15.
   * If the current color code is 15, it resets to 1.
   *
   * @returns {number} The next color code in the sequence.
   */
  getNextColorCode() {
    if (this.currentColorCode === 15) {
      return 1;
    } else {
      return this.currentColorCode + 1;
    }
  }

  // ########################################################################################################## 
  // Reset DB
  // ##########################################################################################################
  /**
   * Resets the Firestore database by deleting all existing contacts 
   * and replacing them with predefined dummy contacts.
   * 
   * @returns {Promise<void>} A promise that resolves once the reset is complete.
   */
  async resetDatabase() {
    //DELETE ALL EXISTING DOCUMENTS
    let allContactsToDelete: Contact[] = this.getAllContacts();
    allContactsToDelete.forEach(contactToDelete => {
      this.deleteContact(contactToDelete);
    });

    //ADD DUMMYDATA
    this.DUMMYCONTACTS.forEach(dummyContact => {
      this.addContact(dummyContact)
    });
  }

  // ########################################################################################################## 
  // Mobile Views
  // ##########################################################################################################
  /**
  * Toggles the mobile contact view between the contact list and contact details.
  * 
  * @param {boolean} isMobileView - Indicates whether the application is in mobile view.
  */
  changeMobileContactView(isMobileView: boolean) {
    if (isMobileView) {
      if (this.isContactListViewed) {
        this.isContactListViewed = false;
        this.isContactDetailsViewed = true;
      }
      else {
        this.isContactListViewed = true;
        this.isContactDetailsViewed = false;
        this.isContactSelected = false;
      }
    }
  }
}
