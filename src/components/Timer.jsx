import React, { useState, useEffect } from "react";

const Timer = ({ deadline }) => {
  // Function to calculate the remaining time in hours, minutes, and seconds
  const calculateTimeDifference = (deadline) => {
    const currentTime = new Date(); // Get the current date and time

    // Convert the deadline (in Unix timestamp) to a JavaScript Date object
    const deadlineDate = new Date(Number(deadline) * 1000); // Convert from seconds to milliseconds

    // Calculate the difference in milliseconds
    const timeDifferenceMs = deadlineDate - currentTime;

    // Convert the difference from milliseconds to total seconds
    const timeDifferenceSeconds = Math.floor(timeDifferenceMs / 1000);

    // If the deadline is in the past, set the difference to 0 hours 0 minutes 0 seconds
    if (timeDifferenceSeconds < 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(timeDifferenceSeconds / 3600); // 1 hour = 3600 seconds
    const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60); // Remaining minutes
    const seconds = timeDifferenceSeconds % 60; // Remaining seconds

    return { hours, minutes, seconds };
  };

  // Initial time calculation based on the provided deadline
  const {
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  } = calculateTimeDifference(deadline);

  // Initialize state with the initial time difference
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  // State to track if the campaign has ended
  const [campaignEnded, setCampaignEnded] = useState(false);

  useEffect(() => {
    // If there's no time left, stop the timer and show "Campaign End"
    if (
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      setCampaignEnded(true);
      return;
    }

    // Set up a timer interval
    const timer = setInterval(() => {
      // Recalculate the remaining time based on the current time and deadline
      const { hours, minutes, seconds } = calculateTimeDifference(deadline);

      // If the timer has expired, clear the interval and show "Campaign End"
      if (hours === 0 && minutes === 0 && seconds === 0) {
        setCampaignEnded(true);
        clearInterval(timer);
      }

      // Update the state with the remaining time
      setTimeLeft({ hours, minutes, seconds });
    }, 1000); // Update every second

    // Cleanup interval on component unmount or when time reaches 0
    return () => clearInterval(timer);
  }, [deadline, timeLeft]); // Depend on deadline and timeLeft to update

  return (
    <div>
      {campaignEnded ? (
        <h1 className="whitespace-nowrap text-white-A700_ab">Campaign End</h1>
      ) : (
        <h1>  
          {String(timeLeft.hours).padStart(2, "0")}:
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </h1>
      )}
    </div>
  );
};

export default Timer;
