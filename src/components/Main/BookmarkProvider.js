import React, { useState, useEffect } from "react";
import axios from "axios";
import Context from "../Store/Context";

const BookmarkProvider = (props) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://crudcrud.com/api/1fc550016c3e42dfb95535a695167285/name"
      );
      setBookmarks(response.data);
    } catch (error) {
      console.log("Error fetching bookmarks:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (event) => {
    if (!event || (event && event.target === event.currentTarget)) {
      setShowModal(false);
    }
  };

  const onAddNew = async (newBookmark) => {
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/1fc550016c3e42dfb95535a695167285/name",
        newBookmark
      );
      setBookmarks([...bookmarks, response.data]);
    } catch (error) {
      console.log("Error adding bookmark:", error);
    }
  };

  const onUpdate = async (updatedBookmark) => {
    try {
      // Log the updatedBookmark to see its structure
      // console.log("Updating Bookmark:", updatedBookmark);

      const { _id, ...rest } = updatedBookmark;
      // Ensure we do not send the _id in the body of the PUT request
       await axios.put(
        `https://crudcrud.com/api/1fc550016c3e42dfb95535a695167285/name/${_id}`,
        rest
      );
      setBookmarks((prevBookmarks) =>
        prevBookmarks.map((bookmark) =>
          bookmark._id === _id ? updatedBookmark : bookmark
        )
      );
    } catch (error) {
      console.log("Error updating bookmark:", error);
    }
  };

  const onRemoveLink = async (id) => {
    try {
      await axios.delete(
        `https://crudcrud.com/api/1fc550016c3e42dfb95535a695167285/name/${id}`
      );
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark._id !== id)
      );
    } catch (error) {
      console.log("Error removing bookmark:", error);
    }
  };

  const linkContext = {
    bookmarks,
    showModal,
    openModal,
    closeModal,
    onAddNew,
    onUpdate,
    onRemoveLink,
  };

  return (
    <Context.Provider value={linkContext}>{props.children}</Context.Provider>
  );
};

export default BookmarkProvider;
