import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phoneNumber.includes(searchTerm)
  );

  return (
    <div>
      <h1>Contact List</h1>
      <input
        type="text"
        placeholder="Search by name, email or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ContactForm contact={selectedContact} onSave={() => { setSelectedContact(null); fetchContacts(); }} />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phoneNumber} - {contact.gender} - {contact.category}
            <button onClick={() => editContact(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
