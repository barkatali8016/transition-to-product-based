import { useEffect, useState } from "react";
import useThrottle from "./hooks/useThrottle";

function Throttling() {
  const [top, setTop] = useState(0);
  const [inputText, setInputText] = useState(0);
  const throttledValue = useThrottle(top, 1000);
  const throttledText = useThrottle(inputText, 1000);

  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleKeyup = (event) => {
    setInputText(event.target.value);
  };
  return (
    <div style={{ height: "100rem" }}>
      <div style={{ position: "fixed", top: 100 }}>
        <input type="text" name="search" id="search" onKeyUp={handleKeyup} />

        <p>scrolled top : {top}</p>
        <p>Throttled Value : {throttledValue}</p>
        <p>ThrottledText : {throttledText}</p>
      </div>
    </div>
  );
}

export default Throttling;
