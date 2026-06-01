import React, { useState } from 'react';

export default function ReservationForm({ events, onBook }) {
  const [customerName, setCustomerName] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [tickets, setTickets] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !selectedEventId) {
      alert("Please fill out all fields!");
      return;
    }

    const selectedEvent = events.find(evt => evt.id === parseInt(selectedEventId));
    if (tickets > selectedEvent.availableSeats) {
      alert(`Sorry, only ₹{selectedEvent.availableSeats} tickets left for this event.`);
      return;
    }

    onBook({
      id: 'res-' + Date.now(),
      eventId: selectedEventId,
      customerName,
      ticketsBooked: parseInt(tickets),
      dateBooked: new Date().toISOString().split('T')[0]
    });

    setCustomerName("");
    setSelectedEventId("");
    setTickets(1);
  };

  return (
    <div style={{ background: '#f4f4f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h3>Book Your Tickets</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        <label>Your Name:</label>
        <input 
          type="text" 
          value={customerName} 
          onChange={(e) => setCustomerName(e.target.value)} 
          placeholder="Enter full name"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>Select Event:</label>
        <select 
          value={selectedEventId} 
          onChange={(e) => setSelectedEventId(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">-- Choose an Event --</option>
          {events.map(evt => (
            <option key={evt.id} value={evt.id} disabled={evt.availableSeats <= 0}>
              {evt.title} (₹{evt.price}) - [{evt.availableSeats} left]
            </option>
          ))}
        </select>

        <label>Number of Tickets:</label>
        <input 
          type="number" 
          min="1" 
          max="10"
          value={tickets} 
          onChange={(e) => setTickets(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Reserve Tickets
        </button>
      </form>
    </div>
  );
}