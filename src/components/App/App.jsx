import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { TitlePhonebook } from './TitlePhonebook.styled';
import { TitleContacts } from './TitleContacts.styled';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contactExists = duplicationContacts(name);
    if (contactExists) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const findContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const duplicationContacts = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  useEffect(() => {
    const savedStringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(savedStringifiedContacts) ?? [];
    setContacts(contacts);
  }, []);

  useEffect(() => {
    const savedStringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', savedStringifiedContacts);
  }, [contacts]);

  const filteredContacts = findContacts();

  return (
    <div>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm onSubmit={addContact} />
      <TitleContacts>Contacts</TitleContacts>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
