# Find Golden hour 🌅
A simple React app that fetches and displays sunset times for a specific location and date. Enter a location and a date, and the app will retrieve the sunset time using public APIs. If no date or location is provided, it defaults to today's sunset time in London.

## API (s) used
* [Geolocation API](https://geocode.maps.co) - to get latitude and longitude from the location supplied
* [Sunset API](https://sunrise-sunset.org/api) - to get the time of the sunset based on the date provided and the coordinates

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/clio-petersdorff/golden-hour
   cd golden-hour
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
4. Create an API key for the [Geolocation API](https://geocode.maps.co) and add it to a `.env` file
   ```bash
   VITE_API_KEY=<Your API key>
   ```
6. Start the development server:
  ```bash
  npm run dev
  ```

## Inputs and Outputs
There are input fields for the Date you wish to see and the Location. These are optional fields, and if they are left blank they will default to today's date and London respectively.

## If I had more time I would... 

1. Fix security issues

The way I'm handling the API key is less than ideal, but because it isn't sensitive it wasn't a priority to obscure it. With more time I would spin up a backend and handle API calls from there. That way the API wouldn't be visible to malicious actors browsing to the site. Alternatively I could have used Next.Js where API calls can be made server-side during the rendering phase. 

2. Improve user-friendliness.

In particular I would add react-datepicker (or something similar) to make the date input field more user friendly. This would also make input validation easier (right now the 31/02/2024 is a valid date).

I would also use the google maps APIs to make the location field more user friendly - in particular I think adding autocomplete would be good feature.


