import React from 'react';
import './App.css';
import SearchContacts from '../src/Component/SearchContacts';
import AddContactForm from '../src/Component/AddContactForm';
import Header from '../src/Component/Header';
import Map from '../src/Component/Map';

const App = () => {
  return (
    <div>
      <Header></Header>
      <AddContactForm />

      <SearchContacts />
      {/* <AddContactForm /> */}
      <Map></Map>
    </div>
  );
};

export default App;
