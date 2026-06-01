import React, { useState } from "react";
import MainPage from "./Mainpage";
import Auth from "./Auth";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "20px"
          }}
        >
          <h1>
             Event Ticketing &
            Reservation Platform
          </h1>

          <p>
            Welcome, {user.name}
          </p>

          <button
            onClick={() => {
              setUser(null);
            }}
          >
            Logout
          </button>

          <hr />

          <MainPage />
        </div>
      ) : (
        <Auth onLogin={setUser} />
      )}
    </>
  );
}