import { useState, useEffect } from "react";

function Admin() {
  const [users, setUsers] = useState("");

  return (
    <div>
      <h1>Admin felület</h1>
      <h3>Új felhasználó hozzáadása</h3>
      
      <h3>Felhasználók</h3>
      <h4>Felhasználói kérések</h4>
    </div>
  );
}

export default Admin;
