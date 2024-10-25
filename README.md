# WeatherAPP
A TypeScript-based weather application that provides users with a search for the weather condition in a particular city or country. 
A start page with top searches weather cards and a detailed view for a more detailed description. It offers a 5-day weather forecast, including maximum temperatures, weather conditions, and icons. 
The app utilizes a weather API and displays forecasted data based on the selected location.

### Features
- Typescript
- React
- Vite
- Axios
- Bootstrap for styling
- custom Hooks (e.g useForecst.ts, useWeather.ts, useWeatherDetail.ts)
- Open streetmaps for location pin in details view.


## Getting Started

### Prerequisites
- Node.js (version 14 or later)
- npm or yarn for managing dependencies
- API key for the weather service (e.g., OpenWeatherMap) places in .env file in the root

### 1. Clone the Repository

```bash
git clone https://github.com/Hashtagsmile/WeatherAPP.git
cd WeatherApp/
```

### 2. Installation

Install dependencies:
```bash
npm install
```

### 3. Set up your API key
- Register for an API key from the weather service (e.g., OpenWeatherMap).
- Create a .env file at the root of the project and add your API key: REACT_APP_WEATHER_API_KEY=your_api_key_here

### 4. Runing the app
```bash
npm run dev
```

### Future Improvements
- Localization: Add support for multiple languages and localized date formats.
- Search functionality: Add better seach functionality
- Custom Locations on Map: Allow users to select a location directly on a map.
- Enhanced Accessibility: Improve accessibility with better contrast and screen reader support.
