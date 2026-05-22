import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function loadUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  }

  async function addUser(event) {
    event.preventDefault();

    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    setName("");
    setEmail("");
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main className="page">
      <section className="card">
        <h1>MERN Docker Beginner App</h1>
        <p>Frontend + Backend + MongoDB running with Docker Compose.</p>

        <form onSubmit={addUser} className="form">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
          />

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />

          <button type="submit">Add user</button>
        </form>

        <h2>Saved users</h2>

        {users.length === 0 ? (
          <p>No users added yet.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <strong>{user.name}</strong> — {user.email}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
