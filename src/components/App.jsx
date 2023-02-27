import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from 'redux/contacts/contacts-operations';
import { setFilter } from 'redux/filter/filter-slice';

import {
  selectContacts,
  selectFilteredContacts,
} from 'redux/contacts/contacts-selectors';
import { selectFilter } from 'redux/filter/filter-selectors';

import { Container, MainTitle, ContactsTitle } from './App.styled';

const App = () => {
  const contacts = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = contact => {
    const { name } = contact;

    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }

    dispatch(addContact(contact));
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = e => dispatch(setFilter(e.target.value));

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={handleSubmit} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter value={filter} onChange={handleFilter} />
      {contacts.length > 0 && (
        <ContactList contacts={filteredContacts} onDelete={handleDelete} />
      )}
    </Container>
  );
};

export default App;
