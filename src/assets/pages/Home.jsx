import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <Header />
      <div
        style={{
          backgroundImage: "url('/src/assets/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "15vh",
          gap: "10px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            fontFamily: "Orbitron",
            fontSize: "3rem",
            color: "#FF6F00",
          }}
        >
          Welcome to the Outbreak Atlas
        </h1>
        <h1
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            fontFamily: "Orbitron",
            color: "#FF8C42",
          }}
        >
          Global Health at a Glance
        </h1>
        <SearchBar onSelectCountry={setSelectedCountry} />
      </div>
    </div>
  );
};

export default Home;
