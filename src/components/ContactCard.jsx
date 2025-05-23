import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaLocationDot, FaEnvelope } from "react-icons/fa6";

const ContactCard = ({ contacts, onDelete }) => {
  const navigate = useNavigate();

  if (!contacts || contacts.length === 0) {
    return <h1>No hay contactos</h1>;
  }
  
  return (
    <div className="container">
      {contacts.map((contact) => (
        <div className="row" key={contact.id}>
          <div className="col-md-12">
            <div className="list-group">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="imagen">
                    <img
                      src="data:image/jpeg;base64,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"
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="align-self">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <button className="btn me-md-2" type="button" onClick={() => navigate(`/edit/${contact.id}`)}>
                            <MdOutlineModeEdit className="icon-style" />
                          </button>
                          <button className="btn" type="button" onClick={() => onDelete(contact.id)}>
                            <MdDeleteOutline className="icon-style" />
                          </button>
                        </div>
                      </div>
                      <div className="card-style">
                        <p className="card-name"><FaUser /> {contact.name}</p>
                        <p className="text-body-secondary" > <FaLocationDot /> {contact.address}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                           <FaPhone /> {contact.phone}
                          </small>
                        </p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            <FaEnvelope /> {contact.email}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactCard;