import React from "react";
import Bookmark from "./components/Main/Bookmark";
import BookmarkProvider from "./components/Main/BookmarkProvider";

function App() {
  return (
    <BookmarkProvider>
      <>
        <h2>Bookmark Website</h2>
        <Bookmark />
      </>
    </BookmarkProvider>
  );
}

export default App;
