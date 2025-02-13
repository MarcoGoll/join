import { inject, Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, limit, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  DUMMYCONTACTS: Contact[] = [
    {
      "firstName": "Lukas",
      "lastName": "Schmidt",
      "nameShortcut": "LS",
      "nameShortcutColorCode": 0,
      "email": "lukas.schmidt@gmail.de",
      "phone": "+4915234567890",
      "img": ""
    },
    {
      "firstName": "Anna",
      "lastName": "Müller",
      "nameShortcut": "AM",
      "nameShortcutColorCode": 1,
      "email": "anna.mueller@gmail.de",
      "phone": "+4915112345678",
      "img": ""
    },
    {
      "firstName": "Ben",
      "lastName": "Schneider",
      "nameShortcut": "BS",
      "nameShortcutColorCode": 2,
      "email": "ben.schneider@gmail.de",
      "phone": "+4915223456789",
      "img": ""
    },
    {
      "firstName": "Clara",
      "lastName": "Fischer",
      "nameShortcut": "CF",
      "nameShortcutColorCode": 3,
      "email": "clara.fischer@gmail.de",
      "phone": "+4915334567890",
      "img": ""
    },
    {
      "firstName": "David",
      "lastName": "Wagner",
      "nameShortcut": "DW",
      "nameShortcutColorCode": 4,
      "email": "david.wagner@gmail.de",
      "phone": "+4915445678901",
      "img": ""
    },
    {
      "firstName": "Emily",
      "lastName": "Becker",
      "nameShortcut": "EB",
      "nameShortcutColorCode": 5,
      "email": "emily.becker@gmail.de",
      "phone": "+4915556789012",
      "img": ""
    },
    {
      "firstName": "Felix",
      "lastName": "Hoffmann",
      "nameShortcut": "FH",
      "nameShortcutColorCode": 6,
      "email": "felix.hoffmann@gmail.de",
      "phone": "+4915667890123",
      "img": ""
    },
    {
      "firstName": "Greta",
      "lastName": "Schäfer",
      "nameShortcut": "GS",
      "nameShortcutColorCode": 7,
      "email": "greta.schaefer@gmail.de",
      "phone": "+4915778901234",
      "img": ""
    },
    {
      "firstName": "Hans",
      "lastName": "Koch",
      "nameShortcut": "HK",
      "nameShortcutColorCode": 8,
      "email": "hans.koch@gmail.de",
      "phone": "+4915889012345",
      "img": ""
    },
    {
      "firstName": "Isabel",
      "lastName": "Bauer",
      "nameShortcut": "IB",
      "nameShortcutColorCode": 9,
      "email": "isabel.bauer@gmail.de",
      "phone": "+4915990123456",
      "img": ""
    },
    {
      "firstName": "Jonas",
      "lastName": "Lehmann",
      "nameShortcut": "JL",
      "nameShortcutColorCode": 10,
      "email": "jonas.lehmann@gmail.de",
      "phone": "+4915101234567",
      "img": ""
    },
    {
      "firstName": "Kathrin",
      "lastName": "Schröder",
      "nameShortcut": "KS",
      "nameShortcutColorCode": 11,
      "email": "kathrin.schroeder@gmail.de",
      "phone": "+4915212345678",
      "img": ""
    },
    {
      "firstName": "Leon",
      "lastName": "Meier",
      "nameShortcut": "LM",
      "nameShortcutColorCode": 12,
      "email": "leon.meier@gmail.de",
      "phone": "+4915323456789",
      "img": ""
    },
    {
      "firstName": "Marie",
      "lastName": "Klein",
      "nameShortcut": "MK",
      "nameShortcutColorCode": 13,
      "email": "marie.klein@gmail.de",
      "phone": "+4915434567890",
      "img": ""
    },
    {
      "firstName": "Niklas",
      "lastName": "Wolf",
      "nameShortcut": "NW",
      "nameShortcutColorCode": 14,
      "email": "niklas.wolf@gmail.de",
      "phone": "+4915545678901",
      "img": ""
    },
    {
      "firstName": "Olivia",
      "lastName": "Neumann",
      "nameShortcut": "ON",
      "nameShortcutColorCode": 0,
      "email": "olivia.neumann@gmail.de",
      "phone": "+4915656789012",
      "img": ""
    },
    {
      "firstName": "Paul",
      "lastName": "Zimmermann",
      "nameShortcut": "PZ",
      "nameShortcutColorCode": 1,
      "email": "paul.zimmermann@gmail.de",
      "phone": "+4915767890123",
      "img": ""
    },
    {
      "firstName": "Quentin",
      "lastName": "Hartmann",
      "nameShortcut": "QH",
      "nameShortcutColorCode": 2,
      "email": "quentin.hartmann@gmail.de",
      "phone": "+4915878901234",
      "img": ""
    },
    {
      "firstName": "Rebecca",
      "lastName": "Krüger",
      "nameShortcut": "RK",
      "nameShortcutColorCode": 3,
      "email": "rebecca.krueger@gmail.de",
      "phone": "+4915989012345",
      "img": ""
    },
    {
      "firstName": "Simon",
      "lastName": "Weber",
      "nameShortcut": "SW",
      "nameShortcutColorCode": 4,
      "email": "simon.weber@gmail.de",
      "phone": "+4915090123456",
      "img": ""
    },
    {
      "firstName": "Theresa",
      "lastName": "Lange",
      "nameShortcut": "TL",
      "nameShortcutColorCode": 5,
      "email": "theresa.lange@gmail.de",
      "phone": "+4915201234567",
      "img": ""
    },
    {
      "firstName": "Ulf",
      "lastName": "Schulz",
      "nameShortcut": "US",
      "nameShortcutColorCode": 6,
      "email": "ulf.schulz@gmail.de",
      "phone": "+4915312345678",
      "img": ""
    },
    {
      "firstName": "Vanessa",
      "lastName": "Bergmann",
      "nameShortcut": "VB",
      "nameShortcutColorCode": 7,
      "email": "vanessa.bergmann@gmail.de",
      "phone": "+4915423456789",
      "img": ""
    },
    {
      "firstName": "Walter",
      "lastName": "Richter",
      "nameShortcut": "WR",
      "nameShortcutColorCode": 8,
      "email": "walter.richter@gmail.de",
      "phone": "+4915534567890",
      "img": ""
    },
    {
      "firstName": "Xenia",
      "lastName": "Schuster",
      "nameShortcut": "XS",
      "nameShortcutColorCode": 9,
      "email": "xenia.schuster@gmail.de",
      "phone": "+4915645678901",
      "img": ""
    },
    {
      "firstName": "Yannik",
      "lastName": "Brandt",
      "nameShortcut": "YB",
      "nameShortcutColorCode": 10,
      "email": "yannik.brandt@gmail.de",
      "phone": "+4915756789012",
      "img": ""
    }
  ]
    ;
  firestore: Firestore = inject(Firestore);

  contacts: Contact[] = [];

  unsubContacts;
  currentlySelectedContact: Contact = {
    "firstName": "Lukas",
    "lastName": "Schmidt",
    "nameShortcut": "LS",
    "nameShortcutColorCode": 1,
    "email": "lukas.schmidt@gmail.de",
    "phone": "+4915234567890",
    "img": ""
  };
  nextColorCode = -1;


  constructor() {
    this.unsubContacts = this.subContactsList();
  }

  // ##################################################### 
  // Connection
  // #####################################################
  subContactsList() {
    const q = query(this.getContactsRef(), orderBy("firstName"));
    return onSnapshot(q, (list) => {
      this.contacts = [];
      list.forEach(contact => {
        this.contacts.push(this.setContactObjectWithExtraId(contact.data(), contact.id));
      });
    });
  }

  getContactsRef() {
    return collection(this.firestore, "contacts");
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  async getAllContactsAsArray() {
    let copyAllContacts: Contact[] = [];

    const querySnapshot = await getDocs(this.getContactsRef());
    querySnapshot.forEach((doc) => {
      copyAllContacts.push(this.setContactObjectWithoutExtraId(doc.data()));
      console.log(doc.id, " => ", doc.data());
    });
    return copyAllContacts;
  }

  setContactObjectWithExtraId(obj: any, id: string): Contact {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      nameShortcut: obj.nameShortcut || '',
      nameShortcutColorCode: obj.nameShortcutColorCode || '',
      email: obj.email || '',
      phone: obj.phone || '',
      img: obj.img || ''
    }
  }

  setContactObjectWithoutExtraId(obj: any): Contact {
    return {
      id: obj.id || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      nameShortcut: obj.nameShortcut || '',
      nameShortcutColorCode: obj.nameShortcutColorCode || '',
      email: obj.email || '',
      phone: obj.phone || '',
      img: obj.img || ''
    }
  }

  ngonDestroy() {
    this.unsubContacts();
  }

  //#####################################################
  //  CRUD
  //  #####################################################
  async addContact(contact: Contact) {
    await addDoc(this.getContactsRef(), contact)
      .catch((err) => {
        console.error(err);
      }).then((docRef) => {
        contact.id = docRef?.id;
        this.updateContact(contact);
      })
  }

  async deleteContact(contact: Contact) {
    let colId: string = 'contacts';
    let docId: string | undefined = contact.id;

    if (docId) {
      await deleteDoc(this.getSingleDocRef(colId, docId))
        .catch(
          (err) => { console.log(err) }
        ).then(
        //TODO: tbd.
      );
    }
  }

  async updateContact(contact: Contact) {
    if (contact.id) {
      let docRef = this.getSingleDocRef('contacts', contact.id);
      await updateDoc(docRef, this.getCleanJson(contact))  //Wir können hier nicht einfach note selbst nehmen da dies eine "starke typisierung ist" und wir ein "standard" brauchen? @Freddy was heißt das | 
        //direkt note geht nicht, weil es eine ID haben könnte. Unsere Struktur in der Datenbank hat aber kein Feld ID. Die id gehört zum Dokument ist aber kein Feld. Wir müssen hier also ein JSON ohne ID erzeugen, daher getCleanJson()
        .catch((err) => {
          console.error(err);
        }).then(() => {
          console.log("Update hat geklappt: ", contact);
        })
    }
  }

  getCleanJson(contact: Contact): {} {
    return {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      nameShortcut: contact.nameShortcut,
      email: contact.email,
      phone: contact.phone,
      img: contact.img,
    }
  }
  // ##################################################### 
  // Current Selected User
  // #####################################################
  setCurrentlySelectedContact(contact: Contact) {
    if (contact.id) this.currentlySelectedContact = contact;
    console.log("set current user to: ", this.currentlySelectedContact);
  }

  getCurrentlySelectedContact() {
    return this.currentlySelectedContact;
  }

  // ##################################################### 
  // Contact color code
  // #####################################################
  setNextColorCodeTO(x: number) {

  }

  getNextColorCode() { }

  // ##################################################### 
  // Reset DB
  // #####################################################

  async resetDatabase() {
    //DELETE ALL EXISTING DOCUMENTS
    let allContactsToDelete: Contact[] = await this.getAllContactsAsArray();
    allContactsToDelete.forEach(contactToDelete => {
      this.deleteContact(contactToDelete);
    });

    //ADD DUMMYDATA
    this.DUMMYCONTACTS.forEach(dummyContact => {
      this.addContact(dummyContact)
    });
  }
}
