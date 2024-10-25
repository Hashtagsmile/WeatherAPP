import { Link } from "react-router-dom";
import { WeatherCard } from "../components/WeatherCard";
import "./LandingPage.css";
import { useCallback, useState } from "react";
import { fetchWeatherData, WeatherData } from "../api/weatherApi";
import { debounce, roundTemperature } from "../utils/helpers";

const cities = ["Stockholm", "New York", "Tokyo", "Dubai", "Spain", "Sydney"];

export const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const [searchResults, setSearchResults] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(query);
      setSearchResults([data]); // Store the result in an array
      setShowSuggestions(true);
    } catch (error) {
      setError("City not found or an error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');  // Clear the search query
  };

  // Debounce the search query to avoid making too many API calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.length > 0) {
        handleSearch(query); // Trigger search when user types
      }
    }, 300),
    []
  );

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value); // Debounce the API request
  };

  return (
    <div className="d-flex flex-column vh-100 flex-grow-1 mt-2">
      {/* Search Form - Always Visible */}
      <form className="d-flex justify-content-start p-3">
        <div className="input-group mb-2" style={{ maxWidth: "600px"}}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>{" "}
            {/* Bootstrap Icon or FontAwesome */}
          </span>
          <input
            type="search"
            className="form-control"
            placeholder="Search for a country or city..."
            value={searchQuery}
            aria-label="Search"
            onChange={handleInputChange}
          />
          {searchQuery && (
        <button className="btn btn-outline-secondary" type="button" onClick={handleClearSearch}>
          <i className="bi bi-x-circle"></i>  {/* Bootstrap Close Icon */}
        </button>
      )}
        </div>
      </form>
      {/* Render Search Results if Query is Submitted */}
      {showSuggestions && searchQuery.length > 0 && (
        <div className="container mt-5">
            {!error && <p className="d-flex flex-start"> Results {searchResults.length}</p>}
        <ul className="list-group">
          {loading ? (
            <li className="list-group-item d-flex flex-start">Loading...</li>
          ) : error ? (
            <li className="list-group-item list-group-item-warning d-flex flex-start">{error}</li>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <li key={index} className="list-group-item d-flex flex-start">
                <Link to={`/weather/${result.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {result.name} - {roundTemperature(result.main.temp)}°C
                </Link>
              </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
        </div>
      )}{" "}
      {!searchQuery && (
        <div className="container">
        <p className="h4 mb-4 mt-2 text-start">Popular searches </p>
        <div className="card-grid">
        {cities.map((city) => (
            <Link key={city} to={`/weather/${city}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <WeatherCard key={city} city={city} />
            </Link>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};
