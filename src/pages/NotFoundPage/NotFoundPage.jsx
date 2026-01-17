import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="notfound">
        <h1 className="notfound_title">404</h1>
        <h2 className="notfound_subtitle">Page Not Found</h2>
        <p className="notfound_text">
          The page you are trying to access doesn’t exist, was removed, or is
          temporarily unavailable.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
