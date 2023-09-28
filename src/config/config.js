const baseURL = 'https://api.openaq.org/v2/latest?';
const breakpoints = {
    pm25: [
      { min: 0.0, max: 12.0, aqiMin: 0, aqiMax: 50 },
      { min: 12.1, max: 35.4, aqiMin: 51, aqiMax: 100 },
      { min: 35.5, max: 55.4, aqiMin: 101, aqiMax: 150 },
      // ... continue adding other breakpoints as needed
    ],
    pm10: [
      { min: 0, max: 54, aqiMin: 0, aqiMax: 50 },
      { min: 55, max: 154, aqiMin: 51, aqiMax: 100 },
      { min: 155, max: 254, aqiMin: 101, aqiMax: 150 },
      // ... continue adding other breakpoints as needed
    ]
};

module.exports = {
    baseURL,
    breakpoints
}