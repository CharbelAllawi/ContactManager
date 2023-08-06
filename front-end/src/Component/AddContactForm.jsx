// AddContactForm.js
import React, { useState } from "react";
import '../App.css';

const AddContactForm = ({ onAdd }) => {
  const [newContact, setNewContact] = useState({
    username: "",
    phonenumber: "",
    address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });
  };
  function onAdd(newContact) {
    console.log(newContact)
    let formdata = new FormData();

    formdata.append("username", newContact.username);
    formdata.append("phonenumber", newContact.phonenumber);
    formdata.append("address", newContact.address);
    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/api/add_update_contact/", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    window.location.reload(false)

  }
  const handleAdd = () => {
    // Validate the form fields if needed before adding
    onAdd(newContact);
    setNewContact({
      username: "",
      phonenumber: "",
      address: "",
    });
  };

  return (
    <div className="add-contact-form">
      <input
        type="text"
        name="username"
        value={newContact.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="text"
        name="phonenumber"
        value={newContact.phonenumber}
        onChange={handleInputChange}
        placeholder="Phone Number"
      />
      <input
        type="text"
        name="address"
        value={newContact.address}
        onChange={handleInputChange}
        placeholder="Address"
      />
      <button onClick={handleAdd}>Add Contact</button>
    </div>
  );
};

export default AddContactForm;
