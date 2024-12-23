# Find Golden hour 🌅
A simple React app that fetches and displays sunset times for a specific location and date. Enter a location and a date, and the app will retrieve the sunset time using public APIs. If no date or location is provided, it defaults to today's sunset time in London.

See deployed version: [Golden Hour](https://golden-hour-virid.vercel.app)

## Choice of Framework
For personal projects, I tend to use the MERN stack (MongoDB, Express, React, Node.js), although I’ve also built Next.js apps and worked with MySQL databases. For this project, I weighed up using plain React versus Next.js and decided to stick with React because the app is small and lightweight, which is my preference for Single Page Applications (SPAs). That said, if I were building something more complex with many pages, I’d choose Next.js for two reasons: 
* Server-Side Rendering (SSR): It’s faster and more secure, particularly for data-intensive applications.
* Next.js makes it easy to share UI between multiple pages using layout files. For example, you can define a header and footer in a parent component, and it will automatically apply to all child components or pages.

In terms of libraries I didn't really use any except for Tailwind CSS (and Autoprefixer & PostCSS which are peer dependencies). It offers more flexibility than Bootstrap and is quicker and easier than plain CSS. Plus, it eliminates the worry of managing multiple stylesheets or dealing with class overrides, making the styling process much more straightforward. 

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
3. Create an API key for the [Geolocation API](https://geocode.maps.co) and add it to a `.env` file
```bash
VITE_API_KEY=<Your API key>
```
4. Start the development server:
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

3. Adding a loading spinner

I would also add an animation that shows users their input is being processed in between the form and the results page.


