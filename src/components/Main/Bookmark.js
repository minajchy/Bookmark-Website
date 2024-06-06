import React, { useState, useContext } from "react";
import classes from "./Bookmark.module.css";
import Context from "../Store/Context";
import BookmarkList from "./BookmarkList";

const Bookmark = () => {
  const {
    showModal,
    openModal,
    closeModal,
    bookmarks,
    onAddNew,
    onUpdate,
    onRemoveLink,
  } = useContext(Context);
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkLink, setBookmarkLink] = useState("");
  const [editingBookmark, setEditingBookmark] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (bookmarkName.trim().length === 0 || bookmarkLink.trim().length === 0) {
      return;
    }

    if (editingBookmark) {
      const updatedBookmark = {
        ...editingBookmark,
        name: bookmarkName,
        url: bookmarkLink,
      };
      await onUpdate(updatedBookmark);
      setEditingBookmark(null);
    } else {
      const newBookmark = {
        url: bookmarkLink,
        name: bookmarkName,
      };
      await onAddNew(newBookmark);
    }
    closeModal();
    setBookmarkLink("");
    setBookmarkName("");
  };

  const bookmarkNameHandler = (event) => {
    setBookmarkName(event.target.value);
  };

  const bookmarkLinkHandler = (event) => {
    setBookmarkLink(event.target.value);
  };

  const editBookmark = (bookmark) => {
    setBookmarkName(bookmark.name);
    setBookmarkLink(bookmark.url);
    setEditingBookmark(bookmark);
    openModal();
  };

  return (
    <>
      <button onClick={openModal}>Add New</button>
      {showModal && (
        <div className={classes.overlay} onClick={closeModal}>
          <div className={classes.content}>
            <form onSubmit={submitHandler}>
              <label>Name: </label>
              <input
                id="name"
                type="text"
                value={bookmarkName}
                onChange={bookmarkNameHandler}
              />
              <br></br>
              <label>URL: </label>
              <input
                id="link"
                type="text"
                value={bookmarkLink}
                onChange={bookmarkLinkHandler}
              />
              <br></br>
              <button type="submit">
                {editingBookmark ? "Update" : "Add"} Bookmark
              </button>
            </form>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      <BookmarkList
        bookmarks={bookmarks}
        editBookmark={editBookmark}
        removeLink={onRemoveLink}
      />
    </>
  );
};

export default Bookmark;
