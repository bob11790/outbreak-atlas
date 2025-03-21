import { Link } from "react-router-dom";
import logo from "../logo.png";

const Header = () => {
  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#b8bfbf",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link to="/">
        <img src={logo} alt="Logo" style={{ maxHeight: "100px" }} />
      </Link>
    </header>
  );
};

export default Header;
