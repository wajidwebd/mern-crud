import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ contact, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Male'); 
  const [category, setCategory] = useState('Friend');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhoneNumber(contact.phoneNumber);
      setGender(contact.gender);
      setCategory(contact.category);
    } else {
      setName('');
      setEmail('');
      setPhoneNumber('');
      setGender('Male');
      setCategory('Friend');
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { name, email, phoneNumber, gender, category };

    try {
      if (contact) {
        // Update existing contact
        await axios.put(`http://localhost:5000/api/contacts/${contact._id}`, newContact);
      } else {
        // Create new contact
        await axios.post('http://localhost:5000/api/contacts', newContact);
      }
      // Call onSave to reload the contact list and reset form
      onSave();
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

      <div>
        <label>
          <input
            type="radio"
            value="Male"
            checked={gender === 'Male'}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="Female"
            checked={gender === 'Female'}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            value="Other"
            checked={gender === 'Other'}
            onChange={(e) => setGender(e.target.value)}
          />
          Other
        </label>
      </div>


      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Friend">Friend</option>
          <option value="Family">Family</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit">{contact ? 'Update' : 'Save'}</button>
    </form>
  );
};

export default ContactForm;
