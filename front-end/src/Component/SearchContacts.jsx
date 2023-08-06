// SearchContacts.js
import React, { useEffect, useState } from 'react';
import '../App.css';
import ContactCard from './ContactCard';

const API_URL = "http://127.0.0.1:8000/api/get_contacts/";

const SearchContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
      setContacts(data.contacts)
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };


  useEffect(() => {
    searchContacts();
  }, []);


  return (

    <div className='container'>
      {contacts &&
        contacts.length > 0 &&
        contacts.map((contact) => (
          <ContactCard key={contact.id} contactinfo={contact} /> // Add 'key' prop to the mapped elements
        ))}
    </div>
  );
};

export default SearchContacts;
