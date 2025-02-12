import { inject, Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, limit, onSnapshot, query, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  DUMMYCONTACTS: Contact[] = [
    {
      "firstName": "Lukas",
      "lastName": "Schmidt",
      "nameShortcut": "LS",
      "email": "lukas.schmidt@gmail.de",
      "phone": "+4915234567890",
      "img": ""
    },
    {
      "firstName": "Sophie",
      "lastName": "Bauer",
      "nameShortcut": "SB",
      "email": "sophie.bauer@yahoo.de",
      "phone": "+4915156781234",
      "img": ""
    },
    {
      "firstName": "Jan",
      "lastName": "Weber",
      "nameShortcut": "JW",
      "email": "jan.weber@hotmail.de",
      "phone": "+4915223456789",
      "img": ""
    },
    {
      "firstName": "Mia",
      "lastName": "Hoffmann",
      "nameShortcut": "MH",
      "email": "mia.hoffmann@gmail.de",
      "phone": "+4915178902345",
      "img": ""
    },
    {
      "firstName": "Leon",
      "lastName": "Fischer",
      "nameShortcut": "LF",
      "email": "leon.fischer@web.de",
      "phone": "+4915123456789",
      "img": ""
    },
    {
      "firstName": "Hannah",
      "lastName": "Wagner",
      "nameShortcut": "HW",
      "email": "hannah.wagner@gmail.com",
      "phone": "+4915234987612",
      "img": ""
    },
    {
      "firstName": "Paul",
      "lastName": "Meyer",
      "nameShortcut": "PM",
      "email": "paul.meyer@gmx.de",
      "phone": "+4915123984756",
      "img": ""
    },
    {
      "firstName": "Emily",
      "lastName": "Schulz",
      "nameShortcut": "ES",
      "email": "emily.schulz@yahoo.de",
      "phone": "+4915198765432",
      "img": ""
    },
    {
      "firstName": "Niklas",
      "lastName": "Becker",
      "nameShortcut": "NB",
      "email": "niklas.becker@t-online.de",
      "phone": "+4915176458392",
      "img": ""
    },
    {
      "firstName": "Lena",
      "lastName": "Schneider",
      "nameShortcut": "LS",
      "email": "lena.schneider@gmail.de",
      "phone": "+4915256789012",
      "img": ""
    },
    {
      "firstName": "Felix",
      "lastName": "Braun",
      "nameShortcut": "FB",
      "email": "felix.braun@web.de",
      "phone": "+4915167890123",
      "img": ""
    },
    {
      "firstName": "Clara",
      "lastName": "Richter",
      "nameShortcut": "CR",
      "email": "clara.richter@gmx.de",
      "phone": "+4915234578961",
      "img": ""
    },
    {
      "firstName": "Max",
      "lastName": "Neumann",
      "nameShortcut": "MN",
      "email": "max.neumann@gmail.com",
      "phone": "+4915212345678",
      "img": ""
    },
    {
      "firstName": "Laura",
      "lastName": "Krüger",
      "nameShortcut": "LK",
      "email": "laura.krueger@outlook.de",
      "phone": "+4915287654321",
      "img": ""
    },
    {
      "firstName": "Jonas",
      "lastName": "Wolf",
      "nameShortcut": "JW",
      "email": "jonas.wolf@yahoo.de",
      "phone": "+4915145678901",
      "img": ""
    },
    {
      "firstName": "Marie",
      "lastName": "Schröder",
      "nameShortcut": "MS",
      "email": "marie.schroeder@web.de",
      "phone": "+4915267895432",
      "img": ""
    },
    {
      "firstName": "Tim",
      "lastName": "Lehmann",
      "nameShortcut": "TL",
      "email": "tim.lehmann@gmail.de",
      "phone": "+4915289076543",
      "img": ""
    },
    {
      "firstName": "Julia",
      "lastName": "Zimmermann",
      "nameShortcut": "JZ",
      "email": "julia.zimmermann@t-online.de",
      "phone": "+4915298732104",
      "img": ""
    },
    {
      "firstName": "Daniel",
      "lastName": "König",
      "nameShortcut": "DK",
      "email": "daniel.koenig@hotmail.de",
      "phone": "+4915213456789",
      "img": ""
    },
    {
      "firstName": "Anna",
      "lastName": "Maier",
      "nameShortcut": "AM",
      "email": "anna.maier@yahoo.de",
      "phone": "+4915238907654",
      "img": ""
    },
    {
      "firstName": "Sebastian",
      "lastName": "Fuchs",
      "nameShortcut": "SF",
      "email": "sebastian.fuchs@gmx.de",
      "phone": "+4915267348190",
      "img": ""
    },
    {
      "firstName": "Vanessa",
      "lastName": "Krause",
      "nameShortcut": "VK",
      "email": "vanessa.krause@web.de",
      "phone": "+4915278391023",
      "img": ""
    },
    {
      "firstName": "David",
      "lastName": "Schmid",
      "nameShortcut": "DS",
      "email": "david.schmid@gmail.com",
      "phone": "+4915284567891",
      "img": ""
    },
    {
      "firstName": "Sarah",
      "lastName": "Klein",
      "nameShortcut": "SK",
      "email": "sarah.klein@outlook.de",
      "phone": "+4915290876543",
      "img": ""
    },
    {
      "firstName": "Tobias",
      "lastName": "Lang",
      "nameShortcut": "TL",
      "email": "tobias.lang@t-online.de",
      "phone": "+4915256784321",
      "img": ""
    }
  ];
  firestore: Firestore = inject(Firestore);

  contacts: Contact[] = [];

  unsubContacts;
  currentlySelectedUser: Contact = {
    "firstName": "Lukas",
    "lastName": "Schmidt",
    "nameShortcut": "LS",
    "email": "lukas.schmidt@gmail.de",
    "phone": "+4915234567890",
    "img": ""
  };


  constructor() {
    this.unsubContacts = this.subContactsList();
  }

  // ##################################################### 
  // Connection
  // #####################################################
  subContactsList() {
    const q = query(this.getContactsRef(), limit(100));
    return onSnapshot(q, (list) => {
      this.contacts = [];
      list.forEach(contact => {
        this.contacts.push(this.setContactObject(contact.data(), contact.id));
        console.log(this.contacts);
      });
    });
  }

  getContactsRef() {
    return collection(this.firestore, "contacts");
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  async getAllDocRef(colId: string) {
    let copyAllContacts: Contact[] = [];

    const querySnapshot = await getDocs(this.getContactsRef());
    querySnapshot.forEach((doc) => {
      // TODO: Use this and set attributes to an object return this object => this.getSingleDocRef('contacts', doc.id).id
      //TODO: use returend object in push
      copyAllContacts.push()
      console.log(doc.id, " => ", doc.data());
    });
    return copyAllContacts;
  }

  setContactObject(obj: any, id: string): Contact {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      nameShortcut: obj.nameShortcut || '',
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
    if (contact.id) this.currentlySelectedUser = contact;
    console.log(this.currentlySelectedUser);
  }

  // ##################################################### 
  // Reset DB
  // #####################################################

  resetDatabase() {
    //DELETE ALL EXISTING DOCUMENTS
    this.getAllDocRef('contacs');

    //ADD DUMMYDATA
    // this.DUMMYCONTACTS.forEach(dummyContact => {
    //   this.addContact(dummyContact)
    // });
  }
}
