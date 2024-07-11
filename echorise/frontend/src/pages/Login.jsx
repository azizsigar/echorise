import {useState} from "react";
import axios from "axios";
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = (e) => {
    e.preventDefault();
    axios.get('/')
  };
  return (
    <div>
      <form onSubmit={loginUser}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
