import { useState } from "react";
export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>name</label>
        <input
          type="text"
          placeholder="enter name "
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label>email</label>
        <input
          type="email"
          placeholder="enter email"
          value={data.name}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>password</label>
        <input
          type="password"
          placeholder="enter password"
          value={data.password}
          onChange={(e) => ({ ...data, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
