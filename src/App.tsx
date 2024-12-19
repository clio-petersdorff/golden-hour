import { useState , useEffect } from 'react'

import './App.css'
import Form from './components/Form'
import Results from './components/Results'

import sunset from './assets/sunrise.png'

function App() {

  const [input, setInput] = useState<boolean>(true) // determines whether form / results are shown
  const [sunsetTime, setSunsetTime] = useState<string | null>(null); // To hold the sunset time
  const [apiKey, setApiKey] = useState<string | undefined>(undefined); 

  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locationOutput, setLocationOutput] = useState<string>(""); // location returned by api

  // To Display errors when they occur
  const [locationError, setLocationError] = useState<boolean>(false) // location input is bad
  const [apiError, setApiError] = useState<boolean>(false) // API failed

  useEffect(() => {
    setApiKey(import.meta.env.VITE_API_KEY);
    setDate("")
    setLocation("")
  }, []);

  // API call to sunrise-sunset.org to get time of sunset 
  async function getSunsetTime(date: string, location: string){
    try {   
      
    // Step 1: get the latitude and longitude of the provided location
      
      // Default to London if no location provided
      let lat:string = "51.517383";
      let lon:string="-0.1257";  
      setLocationOutput("London, Greater London, England, United Kingdom" )
      
      // If a location was entered ...
      if (location) {
          const response = await fetch(`https://geocode.maps.co/search?q=${location}&api_key=${apiKey}`)
          if (!response.ok) {
              throw new Error('Failed to get longitude and latitude from location provided')
          }

          const data = await response.json();

          if (data[0]?.importance > 0.6) {
              lat = data[0].lat
              lon = data[0].lon
              setLocationOutput(data[0].display_name)
          } else {
            setLocationError(true)
          }

      } 

      // Step 2: Get sunset data using coordinates
      const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${date}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch sunset data')
      }

      const data = await response.json()
      setSunsetTime(data.results.sunset)          
          
    } catch (e) {
      console.log({ error: "An error occurred", message: e.message })
      setApiError(true)
    }

  }


  return (
    <>
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 align-middle">
        <img className = "w-40 mx-auto" alt="Sunset" src={sunset}/>
        <h1>Golden Hour</h1>
      </div>
      
      {
        input &&

        <div className="p-6">
          <p className = "mt-6">
            Enter a date and a location below to find out at what time the sun will set
          </p>
          <p className = "mb-6 italic">
            Or leave the inputs empty to find out the sunset time in London today
          </p>

          <Form 
              setInput={setInput}
              input={input}
              setDate={setDate}
              setLocation={setLocation}
              location={location}
              getSunsetTime={getSunsetTime} 
              date={date}              
              />

        </div>      
      }

      {
        !input && 
        <Results 
          setInput={setInput} 
          setDate={setDate}
          setLocation={setLocation}
          input={input} 
          date={date} 
          location={location}
          locationOutput = {locationOutput}
          locationError = {locationError}
          setLocationError = {setLocationError}
          apiError = {apiError}
          setApiError={setApiError}
          sunsetTime={sunsetTime}
          />
      }

      <div className="fixed bottom-5 text-center p-4">
        <p>An app by Clio</p>
      </div>
    </>
  )
}

export default App
