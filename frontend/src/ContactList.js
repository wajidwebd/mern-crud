// frontend/src/ContactList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async () => {
    const response = await axios.get('http://localhost:5000/api/contacts');
    setContacts(response.data);
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    fetchContacts();
  };

  const editContact = (contact) => {
    setSelectedContact(contact);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <ContactForm contact={selectedContact} onSave={() => { setSelectedContact(null); fetchContacts(); }} />
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phoneNumber}
            <button onClick={() => editContact(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
