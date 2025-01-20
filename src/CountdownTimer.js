import React, { useState, useEffect } from "react";

// Define ASCII art for each digit and time unit
const asciiDigits = {
  0: [" 000 ", "0   0", "0   0", "0   0", " 000 "],
  1: ["  1  ", " 11  ", "  1  ", "  1  ", " 111 "],
  2: [" 222 ", "2   2", "   2 ", "  2  ", "22222"],
  3: [" 333 ", "3   3", "  33 ", "3   3", " 333 "],
  4: ["   4 ", "  44 ", " 4 4 ", "44444", "   4 "],
  5: ["55555", "5    ", "5555 ", "    5", "5555 "],
  6: [" 666 ", "6    ", "6666 ", "6   6", " 666 "],
  7: ["77777", "    7", "   7 ", "  7  ", " 7   "],
  8: [" 888 ", "8   8", " 888 ", "8   8", " 888 "],
  9: [" 999 ", "9   9", " 9999", "    9", " 999 "],
  D: ["DDDDD ", "D    D", "D    D", "D    D", "DDDDD "], // ASCII art for 'D'
  H: ["H    H", "H    H", "HHHHHH", "H    H", "H    H"], // ASCII art for 'H'
  M: ["M    M", "MM  MM", "M MM M", "M    M", "M    M"], // ASCII art for 'M'
  S: [" SSSS ", "S     ", " SSSS ", "     S", " SSSS "], // ASCII art for 'S'
};

// Function to convert string to ASCII and separate time units
const convertToAscii = (days, hours, minutes, seconds) => {
  const timeUnits = [days + "D", hours + "H", minutes + "M", seconds + "S"];
  return timeUnits
    .map((unit) => {
      const lines = ["", "", "", "", ""];
      unit.split("").forEach((char) => {
        const asciiChar = asciiDigits[char] || asciiDigits["0"];
        asciiChar.forEach((line, lineIndex) => {
          lines[lineIndex] += line + " ";
        });
      });
      return lines.join("\n");
    })
    .join("\n\n"); // Add extra newline for spacing between units
};

function CountdownTimer() {
  const [asciiTime, setAsciiTime] = useState("");

  useEffect(() => {
    const countDownDate = new Date("Jan 21, 2025 12:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        setAsciiTime("EXPIRED");
        document.title = "Marriage Day - Time's Up!"; // Set document title
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const timerString = `${days}D ${hours}H ${minutes}M ${seconds}S`;
      setAsciiTime(convertToAscii(days, hours, minutes, seconds));
      document.title = `${timerString} - Marriage Day`; // Update the document title
    };

    const timer = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(timer);
      document.title = "Marriage Day"; // Reset the title when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Marriage Day</h1>
        <p className="small-text">Toma & Shajeed</p>
      </header>
      <pre>{asciiTime}</pre> {/* Preserve ASCII formatting */}
    </div>
  );
}

export default CountdownTimer;