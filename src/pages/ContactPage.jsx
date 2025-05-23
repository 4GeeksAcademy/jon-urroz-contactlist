import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";
import "../index.css";

const ContactPage = () => {
    const { contactList, deleteContact, isLoading } = useContext(StoreContext);
    const navigate = useNavigate();
    

    return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="list-group">
           {isLoading ? 
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> 
            </div>
            : 
            <ContactCard contacts={contactList} onDelete={deleteContact}/>} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;