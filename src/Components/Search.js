import React from "react";
import { useState, useEffect } from "react";
const Search = () => {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //Fetch data as the first rendering happens.
  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch(
        "http://universities.hipolabs.com/search?name=middle"
      );
      if (response.ok) {
        const data = await response.json();
        setUniversities(data);
        setFilteredUniversities(data);
      } else {
        throw new Error("Failed loading");
      }
    } catch (error) {
      console.error("Fetching problem :", error);
    }
  };

  //Filter the universtiy on the change of search bar.
  const filterUniversities = (query) => {
    setSearchQuery(query);
    const filtered = universities.filter((university) =>
      university.country.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUniversities(filtered);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter country name"
          value={searchQuery}
          onChange={(e) => filterUniversities(e.target.value)}
        />
      </div>
      <div className="university-list">
        {filteredUniversities.map((university, index) => (
          <div key={index} className="university-card">
            <img
              src={"https://picsum.photos/seed/{university.name}/400/200"}
              alt={university.name}
              onClick={()=>(window.location.href=<link>{university.web_pages}</link>)}
            />
            <div className="university-info">
              <a href={university.web_pages}>Link</a>
              <h2>{university.name}</h2>
              <p>{university.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
