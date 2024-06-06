import React from "react";

const BookmarkList = ({ bookmarks, editBookmark, removeLink }) => {
  return (
    <div>
      <h2>All Bookmarks</h2>
      <ul>
        {bookmarks.map((web) => (
          <li key={web._id}>
            {web.name} -{" "}
            <a href={web.url} target="_blank" rel="noopener noreferrer">
              {web.url}
            </a>{" "}
            <button onClick={() => editBookmark(web)}>Edit</button>{" "}
            <button onClick={() => removeLink(web._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
