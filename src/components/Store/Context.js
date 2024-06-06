import React from "react";

const Context = React.createContext({
  bookmarks: [],
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
  onAddNew: (newBookmark) => {},
  onUpdate: (updatedBookmark) => {},
  onRemoveLink: (id) => {},
});

export default Context;
