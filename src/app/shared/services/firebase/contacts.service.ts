import { inject, Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, limit, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { IfStmt } from '@angular/compiler';

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
      "firstName": "Laura",
      "lastName": "Müller",
      "nameShortcut": "LM",
      "nameShortcutColorCode": 1,
      "email": "laura.mueller@gmail.de",
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
      "firstName": "Benjamin",
      "lastName": "Fischer",
      "nameShortcut": "BF",
      "nameShortcutColorCode": 3,
      "email": "benjamin.fischer@gmail.de",
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
      "firstName": "Daniel",
      "lastName": "Becker",
      "nameShortcut": "DB",
      "nameShortcutColorCode": 5,
      "email": "daniel.becker@gmail.de",
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
      "firstName": "Franziska",
      "lastName": "Schäfer",
      "nameShortcut": "FS",
      "nameShortcutColorCode": 7,
      "email": "franziska.schaefer@gmail.de",
      "phone": "+4915778901234",
      "img": ""
    },
    {
      "firstName": "Hanna",
      "lastName": "Koch",
      "nameShortcut": "HK",
      "nameShortcutColorCode": 8,
      "email": "hanna.koch@gmail.de",
      "phone": "+4915889012345",
      "img": ""
    },
    {
      "firstName": "Hans",
      "lastName": "Bauer",
      "nameShortcut": "HB",
      "nameShortcutColorCode": 9,
      "email": "hans.bauer@gmail.de",
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
      "firstName": "Jana",
      "lastName": "Schröder",
      "nameShortcut": "JS",
      "nameShortcutColorCode": 11,
      "email": "jana.schroeder@gmail.de",
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
      "firstName": "Lara",
      "lastName": "Klein",
      "nameShortcut": "LK",
      "nameShortcutColorCode": 13,
      "email": "lara.klein@gmail.de",
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
      "firstName": "Nina",
      "lastName": "Neumann",
      "nameShortcut": "NN",
      "nameShortcutColorCode": 0,
      "email": "nina.neumann@gmail.de",
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
      "firstName": "Patrick",
      "lastName": "Hartmann",
      "nameShortcut": "PH",
      "nameShortcutColorCode": 2,
      "email": "patrick.hartmann@gmail.de",
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
      "firstName": "Robert",
      "lastName": "Weber",
      "nameShortcut": "RW",
      "nameShortcutColorCode": 4,
      "email": "robert.weber@gmail.de",
      "phone": "+4915090123456",
      "img": ""
    },
    {
      "firstName": "Thomas",
      "lastName": "Lange",
      "nameShortcut": "TL",
      "nameShortcutColorCode": 5,
      "email": "thomas.lange@gmail.de",
      "phone": "+4915201234567",
      "img": ""
    },
    {
      "firstName": "Tina",
      "lastName": "Schulz",
      "nameShortcut": "TS",
      "nameShortcutColorCode": 6,
      "email": "tina.schulz@gmail.de",
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
      "firstName": "Vincent",
      "lastName": "Richter",
      "nameShortcut": "VR",
      "nameShortcutColorCode": 8,
      "email": "vincent.richter@gmail.de",
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

  //TODO: kann das nicht auch einfach durch getAllContacts ersetzt werden?
  async getAllContactsAsArray(): Promise<Contact[]> {
    let copyAllContacts: Contact[] = [];

    const querySnapshot = await getDocs(this.getContactsRef());
    querySnapshot.forEach((doc) => {
      copyAllContacts.push(this.setContactObjectWithoutExtraId(doc.data()));
      console.log(doc.id, " => ", doc.data());
    });
    return copyAllContacts;
  }

  getAllContacts() {
    console.log('call getAllContacts: ', this.contacts);
    return this.contacts;
  }

  getAllContactsByLetter(letter: string): Contact[] {
    return this.contacts.filter(
      (contact) => contact.firstName && contact.firstName[0].toLocaleUpperCase() === letter
    )
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  getAllLettersWhereContacsOccour() {
    let letters: string[] = [];

    this.getAllContacts().forEach(contact => {
      if (!letters.includes(contact.firstName[0].toLocaleUpperCase())) {
        letters.push(contact.firstName[0].toUpperCase());
      }
    });
    return letters;
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

  // ##################################################### 
  // Contact color code
  // #####################################################
  setNextColorCodeTO(x: number) {
    //TODO: tbd.
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
