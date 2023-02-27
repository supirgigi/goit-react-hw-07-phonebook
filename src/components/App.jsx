import { useSelector, useDispatch } from 'react-redux';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import {
  getContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

import { Container, MainTitle, ContactsTitle } from './App.styled';

const App = () => {
  const contacts = useSelector(getContacts);
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

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
