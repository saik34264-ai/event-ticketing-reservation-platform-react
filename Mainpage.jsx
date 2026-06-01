import React, { useState } from 'react';
import ReservationForm from './Reservationform'; 
import ReservationList from './ReservationList'; 

const INITIAL_EVENTS = [
  { id: 1, title: "Rock Concert 2026", date: "2026-06-15", price: 3500, availableSeats: 100 },
  { id: 2, title: "Stand-up Comedy Night", date: "2026-07-02", price: 2500, availableSeats: 45 },
  { id: 3, title: "Sci-Fi Movie Premiere", date: "2026-07-20", price: 1200, availableSeats: 120 }
];

export default function MainPage() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [reservations, setReservations] = useState([
    { id: 'res-1', eventId: 1, customerName: "Alex", ticketsBooked: 2, dateBooked: "2026-05-31" }
  ]);


  const addReservation = (newRes) => {
    setReservations([...reservations, newRes]);
    
  
    setEvents(events.map(evt => 
      evt.id === parseInt(newRes.eventId) 
        ? { ...evt, availableSeats: evt.availableSeats - newRes.ticketsBooked }
        : evt
    ));
  };

 
  const deleteReservation = (id) => {
    const resToCancel = reservations.find(r => r.id === id);
    if (!resToCancel) return;

    
    setEvents(events.map(evt => 
      evt.id === parseInt(resToCancel.eventId)
        ? { ...evt, availableSeats: evt.availableSeats + resToCancel.ticketsBooked }
        : evt
    ));

    setReservations(reservations.filter(r => r.id !== id));
  };


  const saveEditedReservation = (id, updatedName, updatedTickets) => {
    setReservations(reservations.map(res => {
      if (res.id === id) {
        const event = events.find(e => e.id === parseInt(res.eventId));
        const ticketDifference = updatedTickets - res.ticketsBooked;

        // Balance out available seats based on edit change
        setEvents(events.map(evt => 
          evt.id === event.id 
            ? { ...evt, availableSeats: evt.availableSeats - ticketDifference }
            : evt
        ));

        return { ...res, customerName: updatedName, ticketsBooked: updatedTickets };
      }
      return res;
    }));
  };

  return (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
      <div style={{ flex: '1', minWidth: '300px' }}>
        <ReservationForm events={events} onBook={addReservation} />
      </div>

      <div style={{ flex: '1.5', minWidth: '350px' }}>
        <ReservationList 
          reservations={reservations} 
          events={events}
          onDelete={deleteReservation} 
          onSaveEdit={saveEditedReservation}
        />
      </div>
    </div>
  );
}