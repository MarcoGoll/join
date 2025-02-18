import { HostListener, inject, Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, limit, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  isContactSelected: boolean = false;

  isContactListViewed = true;
  isContactDetailsViewed = false;
  isAddContactViewed = false;
  isEditContactViewed = false;

  DUMMYCONTACTS: Contact[] = [
    {
      "firstName": "Lukas",
      "lastName": "Schmidt",
      "fullName": "Lukas Schmidt",
      "nameShortcut": "LS",
      "nameShortcutColorCode": 1,
      "email": "lukas.schmidt@gmail.de",
      "phone": "+4915234567890",
      "img": ""
    },
    {
      "firstName": "Lara",
      "lastName": "Schneider",
      "fullName": "Lara Schneider",
      "nameShortcut": "LS",
      "nameShortcutColorCode": 2,
      "email": "lara.schneider@gmail.de",
      "phone": "+4915234567891",
      "img": ""
    },
    {
      "firstName": "Leon",
      "lastName": "Schuster",
      "fullName": "Leon Schuster",
      "nameShortcut": "LS",
      "nameShortcutColorCode": 3,
      "email": "leon.schuster@gmail.de",
      "phone": "+4915234567892",
      "img": ""
    },
    {
      "firstName": "Laura",
      "lastName": "Sommer",
      "fullName": "Laura Sommer",
      "nameShortcut": "LS",
      "nameShortcutColorCode": 4,
      "email": "laura.sommer@gmail.de",
      "phone": "+4915234567893",
      "img": ""
    },
    {
      "firstName": "Max",
      "lastName": "Müller",
      "fullName": "Max Müller",
      "nameShortcut": "MM",
      "nameShortcutColorCode": 5,
      "email": "max.mueller@gmail.de",
      "phone": "+4915234567894",
      "img": ""
    },
    {
      "firstName": "Mia",
      "lastName": "Meier",
      "fullName": "Mia Meier",
      "nameShortcut": "MM",
      "nameShortcutColorCode": 6,
      "email": "mia.meier@gmail.de",
      "phone": "+4915234567895",
      "img": ""
    },
    {
      "firstName": "Moritz",
      "lastName": "Maier",
      "fullName": "Moritz Maier",
      "nameShortcut": "MM",
      "nameShortcutColorCode": 7,
      "email": "moritz.maier@gmail.de",
      "phone": "+4915234567896",
      "img": ""
    },
    {
      "firstName": "Marie",
      "lastName": "Mayer",
      "fullName": "Marie Mayer",
      "nameShortcut": "MM",
      "nameShortcutColorCode": 8,
      "email": "marie.mayer@gmail.de",
      "phone": "+4915234567897",
      "img": ""
    },
    {
      "firstName": "Sebastian",
      "lastName": "Schulz",
      "fullName": "Sebastian Schulz",
      "nameShortcut": "SS",
      "nameShortcutColorCode": 9,
      "email": "sebastian.schulz@gmail.de",
      "phone": "+4915234567898",
      "img": ""
    },
    {
      "firstName": "Sarah",
      "lastName": "Schwarz",
      "fullName": "Sarah Schwarz",
      "nameShortcut": "SS",
      "nameShortcutColorCode": 10,
      "email": "sarah.schwarz@gmail.de",
      "phone": "+4915234567899",
      "img": ""
    },
    {
      "firstName": "Stefan",
      "lastName": "Seidel",
      "fullName": "Stefan Seidel",
      "nameShortcut": "SS",
      "nameShortcutColorCode": 11,
      "email": "stefan.seidel@gmail.de",
      "phone": "+4915234567800",
      "img": ""
    },
    {
      "firstName": "Sophie",
      "lastName": "Schuster",
      "fullName": "Sophie Schuster",
      "nameShortcut": "SS",
      "nameShortcutColorCode": 12,
      "email": "sophie.schuster@gmail.de",
      "phone": "+4915234567801",
      "img": ""
    },
    {
      "firstName": "Daniel",
      "lastName": "Dreyer",
      "fullName": "Daniel Dreyer",
      "nameShortcut": "DD",
      "nameShortcutColorCode": 13,
      "email": "daniel.dreyer@gmail.de",
      "phone": "+4915234567802",
      "img": ""
    },
    {
      "firstName": "David",
      "lastName": "Döring",
      "fullName": "David Döring",
      "nameShortcut": "DD",
      "nameShortcutColorCode": 14,
      "email": "david.doering@gmail.de",
      "phone": "+4915234567803",
      "img": ""
    },
    {
      "firstName": "Diana",
      "lastName": "Degenhardt",
      "fullName": "Diana Degenhardt",
      "nameShortcut": "DD",
      "nameShortcutColorCode": 15,
      "email": "diana.degenhardt@gmail.de",
      "phone": "+4915234567804",
      "img": ""
    },
    {
      "firstName": "Dennis",
      "lastName": "Dahlmann",
      "fullName": "Dennis Dahlmann",
      "nameShortcut": "DD",
      "nameShortcutColorCode": 1,
      "email": "dennis.dahlmann@gmail.de",
      "phone": "+4915234567805",
      "img": ""
    },
    {
      "firstName": "Tobias",
      "lastName": "Thiele",
      "fullName": "Tobias Thiele",
      "nameShortcut": "TT",
      "nameShortcutColorCode": 2,
      "email": "tobias.thiele@gmail.de",
      "phone": "+4915234567806",
      "img": ""
    },
    {
      "firstName": "Thomas",
      "lastName": "Timmermann",
      "fullName": "Thomas Timmermann",
      "nameShortcut": "TT",
      "nameShortcutColorCode": 3,
      "email": "thomas.timmermann@gmail.de",
      "phone": "+4915234567807",
      "img": ""
    },
    {
      "firstName": "Tanja",
      "lastName": "Teschner",
      "fullName": "Tanja Teschner",
      "nameShortcut": "TT",
      "nameShortcutColorCode": 4,
      "email": "tanja.teschner@gmail.de",
      "phone": "+4915234567808",
      "img": ""
    },
    {
      "firstName": "Tim",
      "lastName": "Teichert",
      "fullName": "Tim Teichert",
      "nameShortcut": "TT",
      "nameShortcutColorCode": 5,
      "email": "tim.teichert@gmail.de",
      "phone": "+4915234567809",
      "img": ""
    },
    {
      "firstName": "Julia",
      "lastName": "Jäger",
      "fullName": "Julia Jäger",
      "nameShortcut": "JJ",
      "nameShortcutColorCode": 6,
      "email": "julia.jaeger@gmail.de",
      "phone": "+4915234567810",
      "img": ""
    },
    {
      "firstName": "Johannes",
      "lastName": "Jung",
      "fullName": "Johannes Jung",
      "nameShortcut": "JJ",
      "nameShortcutColorCode": 7,
      "email": "johannes.jung@gmail.de",
      "phone": "+4915234567811",
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

  getAllContacts() {
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
    return letters.sort();
  }

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
        this.currentColorCode++;
        if (this.currentColorCode >= 16) {
          this.currentColorCode = 1;
        }
      })
  }

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


  async updateContact(contact: Contact) {
    if (contact.id) {
      let docRef = this.getSingleDocRef('contacts', contact.id);
      console.log("Ich bin der Contact der geupdatet wird:", contact)
      console.log("Ich bin die Ref: ", docRef);
      await updateDoc(docRef, this.getCleanJson(contact))  //Wir können hier nicht einfach note selbst nehmen da dies eine "starke typisierung ist" und wir ein "standard" brauchen? @Freddy was heißt das | 
        //direkt note geht nicht, weil es eine ID haben könnte. Unsere Struktur in der Datenbank hat aber kein Feld ID. Die id gehört zum Dokument ist aber kein Feld. Wir müssen hier also ein JSON ohne ID erzeugen, daher getCleanJson()
        .catch((err) => {
          console.error(err);
        }).then(() => {
          console.log("Update hat geklappt: ", contact);
          console.log("Hier sind alle aktuellen Kontakte nach dem Update:", this.contacts)
        })
    }
  }

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
  // ##################################################### 
  // Current Selected User
  // #####################################################
  setCurrentContacts(contact: Contact) {
    if (contact.id) {
      this.currentlySelectedContact = { ...contact };
      this.currentContactToBeUpdated = { ...contact };
      this.isContactSelected = true;
    }
  }

  // ##################################################### 
  // Automated Data for addContact
  // #####################################################
  getNameShortcut(firstName: string, lastName: string) {
    if (lastName == "") {
      return firstName[0].toLocaleUpperCase();
    } else {
      return firstName[0].toLocaleUpperCase() + lastName[0].toLocaleUpperCase();
    }
  }

  getNextColorCode() {
    if (this.currentColorCode === 15) {
      return 1;
    } else {
      return this.currentColorCode + 1;
    }
  }

  // ##################################################### 
  // Reset DB
  // #####################################################

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

  // ##################################################### 
  // Mobile Views
  // #####################################################
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
