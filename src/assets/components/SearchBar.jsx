import { useState } from "react";
import { useNavigate } from "react-router-dom";
import countries from "../../assets/countries";

const SearchBar = ({ onSelectCountry }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const normalizedSearchValue = searchValue.toLowerCase();
    const normalizedCountries = countries.map((country) =>
      country.toLowerCase()
    );

    if (normalizedCountries.includes(normalizedSearchValue)) {
      const selectedCountry = countries.find(
        (country) => country.toLowerCase() === normalizedSearchValue
      );

      if (countries.includes(selectedCountry)) {
        onSelectCountry(selectedCountry);
        navigate("/map", { state: { country: selectedCountry } });
      } else {
        alert("Please enter a valid country.");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {/* Search input */}
      <input
        list="country-list"
        type="text"
        placeholder="Select a country"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid gray",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />
      <div style={{ maxHeight: "250px", overflowY: "auto" }}>
        <datalist id="country-list">
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
      </div>

      {/* Submit button */}
      <div>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
