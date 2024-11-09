// frontend/src/ContactForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ contact, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhoneNumber(contact.phoneNumber);
    } else {
      setName('');
      setEmail('');
      setPhoneNumber('');
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { name, email, phoneNumber };

    try {
      if (contact) {
        // Update existing contact
        await axios.put(`http://localhost:5000/api/contacts/${contact._id}`, newContact);
      } else {
        // Create new contact
        await axios.post('http://localhost:5000/api/contacts', newContact);
      }
      onSave(); // Call onSave to reload the contact list and reset form
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      <button type="submit">{contact ? 'Update' : 'Save'}</button>
    </form>
  );
};

export default ContactForm;
