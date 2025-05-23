import { createContext, useState, useEffect } from "react";

//import storeReducer, { initialStore } from "../store"; // Import the reducer and the initial state.
//import { use } from "react";

export const StoreContext = createContext();

const API_URL = "https://playground.4geeks.com/contact/agendas";
const AGENDA_NAME = "Jon";

export function StoreProvider({ children }) {
  const [contactList, setContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAgenda();
  }, []);

  const getAgenda = async () => {
    setIsLoading(true);
    fetch(`${API_URL}/${AGENDA_NAME}`)
      .then((response) => {
        if (!response.ok) {
          createAgenda();
        }
        return response.json();
      })
      .then((data) => {
        setContactList(data.contacts);
        setInterval(() => {
          setIsLoading(false);
        }, 1000); 
      })
      .catch((error) => console.error("Error fetching contact list:", error));
  }

  const createAgenda = async () => {
    const reponse = await fetch(
      "https://playground.4geeks.com/contact/agendas/Jon",
      {
        method: "POST",
      }
    )
      .then((resp) => {
        if (resp.ok) {
          getAgenda();
        }
        return resp.json();
      })
      .catch((err) => console.log(err));
  }

  const newContact = async (contact) => {
    const response = await fetch(`${API_URL}/${AGENDA_NAME}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((resp) => {
        if(resp.ok) {
          const data = resp.json();
          getAgenda();
        }
        return resp.json();
      })
      .catch((err) => console.log(err));
  };
  
  const updateContact = async (contact) => {
    const response = await fetch(`${API_URL}/${AGENDA_NAME}/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((resp) => {
        if(resp.ok) {
          const data = resp.json();
          setContactList((prev) => prev.map(contact => contact.id === contact.id ? data : contact));
          getAgenda();
        }
        return resp.json();
      })
      .catch((err) => console.log(err));
  }

  const deleteContact = async (contactId) => {
    const response = await fetch(`${API_URL}/${AGENDA_NAME}/contacts/${contactId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if(resp.ok) {
          setContactList((prev) => prev.filter(contact => contact.id !== contactId));
        }
        return resp.json();
      })
      .catch((err) => console.log(err));
  }

  return (
    <StoreContext.Provider value={{ contactList, newContact, updateContact, deleteContact, isLoading }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and dispatch function.
/* export default function useGlobalReducer() {
  const { dispatch, store } = useContext(StoreContext);
  return { dispatch, store };
} */