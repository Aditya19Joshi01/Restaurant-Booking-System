import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8547";
const AUTH_HEADER = { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFwcGVsbGErYXBpQHJlc2RpYXJ5LmNvbSIsIm5iZiI6MTc1NDQzMDgwNSwiZXhwIjoxNzU0NTE3MjA1LCJpYXQiOjE3NTQ0MzA4MDUsImlzcyI6IlNlbGYiLCJhdWQiOiJodHRwczovL2FwaS5yZXNkaWFyeS5jb20ifQ.g3yLsufdk8Fn2094SB3J3XW-KdBc0DY9a2Jiu_56ud8" };

const BookingForm = () => {
  const [restaurant] = useState("TheHungryUnicorn");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [availability, setAvailability] = useState([]);
  const [status, setStatus] = useState("");

  const checkAvailability = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("VisitDate", date);
      formData.append("PartySize", partySize);
      formData.append("ChannelCode", "ONLINE");

      const { data } = await axios.post(
        `${API_BASE}/api/ConsumerApi/v1/Restaurant/${restaurant}/AvailabilitySearch`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            ...AUTH_HEADER,
          },
        }
      );

      const availableTimes = data.available_slots
        .filter((slot) => slot.available)
        .map((slot) => slot.time);

      setAvailability(availableTimes);
      setTime(availableTimes[0] || "");
    } catch (err) {
      console.error("Error checking availability:", err);
      setAvailability([]);
      setTime("");
    }
  };

  const submitBooking = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("VisitDate", date);
      formData.append("VisitTime", time);
      formData.append("PartySize", partySize);
      formData.append("ChannelCode", "ONLINE");
      formData.append("FirstName", name.split(" ")[0] || name);
      formData.append("Surname", name.split(" ")[1] || "User");
      formData.append("Email", email);
      formData.append("Phone", phone);
      formData.append("Mobile", phone);
      formData.append("MobileCountryCode", "+44");
      formData.append("SpecialRequests", specialRequest);
      formData.append("IsLeaveTimeConfirmed", "true");

      const { data } = await axios.post(
        `${API_BASE}/api/ConsumerApi/v1/Restaurant/${restaurant}/BookingWithStripeToken`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            ...AUTH_HEADER,
          },
        }
      );

      setStatus(`✅ Booking successful! Reference: ${data.booking_reference}`);
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err.message);
      setStatus("❌ Booking failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>🍽 Book a Table</h1>
        <p className="subtitle">
          Reserve your spot at <strong>{restaurant}</strong>
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitBooking();
          }}
        >
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label htmlFor="time">Time</label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!availability.length}
            required
          >
            <option value="">Select time</option>
            {availability.map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label htmlFor="partySize">Party Size</label>
          <input
            id="partySize"
            type="number"
            min="1"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            required
          />

          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            placeholder="+44 123 456 789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="specialRequest">Special Request</label>
          <textarea
            id="specialRequest"
            placeholder="Any special requests?"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          />

          <div className="button-row">
            <button
              type="button"
              className="secondary-btn"
              onClick={checkAvailability}
            >
              🔍 Check Availability
            </button>
            <button type="submit" className="primary-btn">
              ✅ Book Now
            </button>
          </div>
        </form>

        {status && (
          <p
            className={`status-message ${
              status.startsWith("✅") ? "success" : "error"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
