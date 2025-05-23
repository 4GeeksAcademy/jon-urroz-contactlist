import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../hooks/useGlobalReducer";

export const NewContact = () => {

    const { contactList, newContact, updateContact } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const {id} = useParams();
    const navigate = useNavigate();

     useEffect(() => {
    if (id) {
      const contactEdit = contactList.find((contact) => contact.id === parseInt(id));
      if (contactEdit) {
        setFormData(contactEdit);
      }
    }
  },[id, contactList]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    if (id) {
      await updateContact(formData);
    } else {
      await newContact(formData);
    }
    navigate("/");
  }
  

  return (
    <div className="container mt-5">
      <h1>Add a new contact</h1>
        <form>
          <ul className="list-group">
            <label className="form-label">Full name</label>
            <input className="form-control" name="name" type="text" placeholder="Full name" value={formData.name} onChange={handleChange} aria-label="default input example"/>
            <label className="form-label">Email</label>
            <input className="form-control" name="email" type="text" placeholder="Enter email" value={formData.email} onChange={handleChange} aria-label="default input example"/>
            <label className="form-label">Phone</label>
            <input className="form-control" name="phone" type="text" placeholder="Enter phone" value={formData.phone} onChange={handleChange} aria-label="default input example"/>
            <label className="form-label">Address</label>
            <input className="form-control" name="address" type="text" placeholder="Enter address" value={formData.address} onChange={handleChange} aria-label="default input example"/>
          </ul>
        </form>
        <div className="d-grid gap-2">
      <button className="save-button btn btn-success mt-4" onClick={handleSubmit}>Save</button>
      </div>
      <br />
        <a href="/" className="mt-2">Go back</a>
    </div>
  );
};