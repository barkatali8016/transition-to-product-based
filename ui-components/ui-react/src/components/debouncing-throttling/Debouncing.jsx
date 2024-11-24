import { useEffect, useState } from "react";

function Debouncing() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("SEARCH TERM", searchTerm);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        onKeyUp={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
    </div>
  );
}

export default Debouncing;
