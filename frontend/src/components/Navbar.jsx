import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/market">Market</Link>
          </li>
          <li>
            <Link to="/solutions">Solutions</Link>
          </li>
          <li>
            <Link to="/echorise">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      {/* Your Navbar component code here */}
    </div>
  );
}
