import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectContactCount = (state) => state.contacts.items.length;
export const selectHasContacts = (state) => state.contacts.items.length > 0;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (!filter) return contacts;
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerCaseFilter) ||
        contact.number.toLowerCase().includes(lowerCaseFilter)
    );
  }
);
