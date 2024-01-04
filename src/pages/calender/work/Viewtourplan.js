import React, { useState, useEffect } from 'react';

export const Viewtourplan = () => {
  const [dateStrings, setDateStrings] = useState([]);

  useEffect(() => {
    // Create a new Date object for the current date
    const currentDate = new Date();

    // Get the current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Set the date to the 1st of the current month
    currentDate.setDate(1);

    // Array to store formatted date strings
    const formattedDateStrings = [];

    // Loop through all days of the month
    while (currentDate.getMonth() === currentMonth) {
      // Get the current day of the month
      const currentDay = currentDate.getDate();

      // Get the name of the day of the week
      const dayOfWeekName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
        currentDate.getDay()
      ];

      // Format the date string using template literal
      const dateString = `${currentDay.toString().padStart(2, '0')}/${(currentMonth + 1).toString().padStart(2, '0')}/${currentYear}`;

      // Add the formatted date string to the array
      formattedDateStrings.push(`${dateString} (${dayOfWeekName})`);

      // Move to the next day
      currentDate.setDate(currentDay + 1);
    }

    // Update the state with the array of formatted date strings
    setDateStrings(formattedDateStrings);
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount


  return (
    <div>
      {/* Render your component content here */}
      <ul>
        {dateStrings.map((dateString, index) => (
          <li key={index}>{dateString}</li>
        ))}
      </ul>
    </div>
  );
};
