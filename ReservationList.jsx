import React, { useState } from "react";

export default function ReservationList({
  reservations,
  events,
  onDelete,
  onSaveEdit
}) {
  const [search, setSearch] = useState("");

  const getEvent = (eventId) => {
    return events.find(
      (evt) => evt.id === parseInt(eventId)
    );
  };

  const filteredReservations = reservations.filter((res) =>
    res.customerName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: "#f4f4f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <h3>
        Reservations ({reservations.length})
      </h3>

      <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />

      {filteredReservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        filteredReservations.map((res) => {
          const event = getEvent(res.eventId);

          const totalAmount = event
            ? event.price * res.ticketsBooked
            : 0;

          return (
            <div
              key={res.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px"
              }}
            >
              <h4>{res.customerName}</h4>

              <p>
                Event: {event?.title}
              </p>

              <p>
                Tickets: {res.ticketsBooked}
              </p>

              <p>
                Amount: ₹{totalAmount}
              </p>

              <p>
                Date: {res.dateBooked}
              </p>

              <button
                onClick={() => {
                  const newName = prompt(
                    "Enter New Name",
                    res.customerName
                  );

                  const newTickets = parseInt(
                    prompt(
                      "Enter New Ticket Count",
                      res.ticketsBooked
                    )
                  );

                  if (
                    newName &&
                    newTickets > 0
                  ) {
                    onSaveEdit(
                      res.id,
                      newName,
                      newTickets
                    );
                  }
                }}
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(res.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}