import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Fetch country error:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filtered);
  };

  return (
    <>
      <center>
        <input
          type="text"
          className="form-control"
          placeholder="Search for countries"
          onChange={handleSearch}
        />
      </center>
      <div className="countryCard">
        {filteredCountries.map((country) => (
          <div className="card" key={country.name.common}>
            <img src={country.flags.png} alt={country.name.common} />
            <h3>{country.name.common}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
