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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedContactInfo({
      ...editedContactInfo,
      [name]: value,
    });
  };

  return (

    <div>

      <div
        className="contact">
        <div>

          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editedContactInfo.username}
              onChange={handleInputChange}
              placeholder="Username"

            />
          ) : (
            <p>{editedContactInfo.username}</p>
          )}

        </div>

        <img src={contactimg} alt={editedContactInfo.username} />

        <div>
          {isEditing ? (
            <input
              type="text"
              name="phonenumber"
              value={editedContactInfo.phonenumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
          ) : (
            <span>{editedContactInfo.phonenumber}</span>
          )}
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editedContactInfo.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
          ) : (
            <h3>{editedContactInfo.address}</h3>
          )}

          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>

  );
};

export default ContactCard;
