// src/components/Logo.jsx
import logo from "../assets/echorise.jpg"; // Adjust the path based on your structure

const Logo = () => {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
    </div>
  );
};

export default Logo;
