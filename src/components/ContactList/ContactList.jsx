import React from "react";
import { useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }
  if (filteredContacts.length === 0) {
    return <div className={styles.noContacts}>No contacts found.</div>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {filteredContacts.map((contact) => (
        <li key={contact.id} className="w-full">
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
