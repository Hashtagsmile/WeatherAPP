export function debounce(func: Function, delay: number) {
    let timeoutId: number | null;  // Use `number` type for browser
  
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);  // Clear timeout
      }
  
      timeoutId = window.setTimeout(() => {
        func(...args);  // Call the function after the delay
      }, delay);
    };
  }
  

  export const isNight = (currentTime: number, sunrise: number, sunset: number): boolean => {
    return currentTime < sunrise || currentTime > sunset;
  };
  
  // Function to get the background based on weather ID and time of day
  export const getBackgroundById = (id: number, night: boolean): string => {
  
    if (id >= 200 && id < 300) {
      return night ? 'linear-gradient(135deg, #2c3e50, #4ca1af)' : 'linear-gradient(135deg, #667db6, #0082c8)'; // Thunderstorm
    } else if (id >= 300 && id < 400) {
      return night ? 'linear-gradient(135deg, #485563, #29323c)' : 'linear-gradient(135deg, #a1c4fd, #c2e9fb)'; // Drizzle
    } else if (id >= 500 && id < 600) {
      return night ? 'linear-gradient(135deg, #223a5e, #1e3c72)' : 'linear-gradient(135deg, #89f7fe, #66a6ff)'; // Rain
    } else if (id >= 600 && id < 700) {
      return night ? 'linear-gradient(135deg, #e0eafc, #a1c4fd)' : 'linear-gradient(135deg, #e0eafc, #cfdef3)'; // Snow
    } else if (id === 800) {
      return night ? 'linear-gradient(135deg, #2c3e50, #34495e)' : 'linear-gradient(135deg, #f6d365, #fda085)'; // Clear sky
    } else if (id > 800 && id < 900) {
      return night ? 'linear-gradient(135deg, #2f4f4f, #34495e)' : 'linear-gradient(135deg, #a1c4fd, #c2e9fb)'; // Cloudy
    } else {
      return night ? 'linear-gradient(135deg, #1c1c1c, #434343)' : 'linear-gradient(135deg, #d4fc79, #96e6a1)'; // Default fallback
    }
  };


  export const getDayOfWeek = (timestamp: number, timezoneOffset: number): string => {
    const localTime = new Date((timestamp + timezoneOffset) * 1000);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[localTime.getUTCDay()];
  };
  
  export const convertToLocalTime = (timestamp: number, timezoneOffset: number) => {
    const date = new Date((timestamp + timezoneOffset) * 1000); // Convert Unix time to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  export const roundTemperature = (temp: number) => Math.round(temp);

  export const getLastUpdatedMessage = (lastUpdatedDate: Date | null): string => {

    if (!lastUpdatedDate) {
        return 'Last updated: Unknown'; // Fallback if no valid date
      }
    const now = new Date(); // Current time
    const lastUpdatedDay = lastUpdatedDate.getDate();
    const currentDay = now.getDate();
    
    // Check if it was today
    if (lastUpdatedDay === currentDay) {
      return `Last updated today at ${lastUpdatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if it was yesterday
    if (lastUpdatedDay === currentDay - 1) {
      return `Last updated yesterday at ${lastUpdatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  
    // If it wasn't today or yesterday, format it with the full date
    return `Last updated on ${lastUpdatedDate.toLocaleDateString()} at ${lastUpdatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };
  


  /**
 * Converts degrees into compass directions (e.g., N, NW, SE)
 * @param degrees - Wind direction in degrees (0° - 360°)
 * @returns A string representing the compass direction
 */
export const getWindDirection = (degrees: number): string => {
    if (degrees >= 348.75 || degrees < 11.25) {
      return 'N'; // North
    } else if (degrees >= 11.25 && degrees < 33.75) {
      return 'NNE'; // North-Northeast
    } else if (degrees >= 33.75 && degrees < 56.25) {
      return 'NE'; // Northeast
    } else if (degrees >= 56.25 && degrees < 78.75) {
      return 'ENE'; // East-Northeast
    } else if (degrees >= 78.75 && degrees < 101.25) {
      return 'E'; // East
    } else if (degrees >= 101.25 && degrees < 123.75) {
      return 'ESE'; // East-Southeast
    } else if (degrees >= 123.75 && degrees < 146.25) {
      return 'SE'; // Southeast
    } else if (degrees >= 146.25 && degrees < 168.75) {
      return 'SSE'; // South-Southeast
    } else if (degrees >= 168.75 && degrees < 191.25) {
      return 'S'; // South
    } else if (degrees >= 191.25 && degrees < 213.75) {
      return 'SSW'; // South-Southwest
    } else if (degrees >= 213.75 && degrees < 236.25) {
      return 'SW'; // Southwest
    } else if (degrees >= 236.25 && degrees < 258.75) {
      return 'WSW'; // West-Southwest
    } else if (degrees >= 258.75 && degrees < 281.25) {
      return 'W'; // West
    } else if (degrees >= 281.25 && degrees < 303.75) {
      return 'WNW'; // West-Northwest
    } else if (degrees >= 303.75 && degrees < 326.25) {
      return 'NW'; // Northwest
    } else if (degrees >= 326.25 && degrees < 348.75) {
      return 'NNW'; // North-Northwest
    } else {
      return 'Unknown'; // Fallback for invalid degrees
    }
  }