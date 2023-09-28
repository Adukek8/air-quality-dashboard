// const axios = require('axios');
// const { baseURL, breakpoints } = require('../config/config.js');

// async function getLatestMeasurementsForCity(city) {
//     try {
//         const response = await axios.get(baseURL, {
//             params: {
//                 country: 'US',
//                 city: city,
//                 parameter: ['pm25', 'pm10']
//             }
//         });

//         return response.data.results;
//     } catch (error) {
//         console.error(`Error fetching measurements for ${city}:`, error);
//         return [];
//     }
// }

// function calculateAQI(concentration, parameter) {
//     const parameterBreakpoints = breakpoints[parameter];
    
//     if (!Array.isArray(parameterBreakpoints)) {
//         return `Breakpoints not defined for parameter: ${parameter}`;
//     }
  
//     for (let breakpoint of parameterBreakpoints) {
//         if (concentration >= breakpoint.min && concentration <= breakpoint.max) {
//             const { aqiMin, aqiMax, min, max } = breakpoint;
//             return ((aqiMax - aqiMin) / (max - min)) * (concentration - min) + aqiMin;
//         }
//     }
//     return "Concentration out of range"; // If the provided concentration is out of range
// }


// async function main() {
//     const measurements = await getLatestMeasurementsForCity('Minneapolis');

//     measurements.forEach(measurement => {
//         measurement.measurements.forEach(detail => {
//             const aqi = calculateAQI(detail.value, detail.parameter);
//             console.log(`City: ${measurement.city}, Parameter: ${detail.parameter}, Value: ${detail.value}, AQI: ${aqi}`);
//         });
//     });
// }

// main();

const sdk = require('api')('@openaq/v2.0#10mjh22rlmsa1tj7');

sdk.locations_get_v2_locations_get({
    limit: '1000',
    page: '1',
    offset: '0',
    sort: 'desc',
    radius: '1000',
    city: 'Minneapolis-St.%20Paul-Bloomington',
    order_by: 'lastUpdated',
    dump_raw: 'false'
})
.then(({ data }) => {
    if (data && Array.isArray(data.results)) {
        data.results.forEach(result => {
            const pm25Data = result.parameters.find(param => param.parameter === 'pm25');
            if (pm25Data) {
                console.log(result.name, pm25Data);
            } else {
                console.log(result.name, 'No pm25 data found for this result.', result.parameters);
            }
        });
    } else {
        console.log('Unexpected data format or no results found.');
    }
})
.catch(err => console.error(err));