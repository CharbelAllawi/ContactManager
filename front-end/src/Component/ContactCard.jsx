import React, { useState } from "react";
import contactimg from "../images/contact.png";
import AddContactForm from "./AddContactForm";
const ContactCard = ({ contactinfo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContactInfo, setEditedContactInfo] = useState(contactinfo);
  const handleAddContact = (newContact) => {
    // Handle the addition of a new contact here
    // You can send the newContact data to your API endpoint or perform any other actions needed
    console.log("New Contact Info:", newContact);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleDelete = () => {
    let requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/api/delete_contact/" + editedContactInfo.id, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    window.location.reload(false)



  }

  const handleSave = () => {

    console.log("Edited Contact Info:", editedContactInfo);
    setIsEditing(false);
    let formdata = new FormData();
    formdata.append("username", editedContactInfo.username);
    formdata.append("phonenumber", editedContactInfo.phonenumber);
    formdata.append("address", editedContactInfo.address);
    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/api/add_update_contact/" + editedContactInfo.id, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  };