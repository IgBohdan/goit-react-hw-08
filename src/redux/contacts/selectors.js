export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectContactCount = (state) => state.contacts.items.length;
export const selectHasContacts = (state) => state.contacts.items.length > 0;
