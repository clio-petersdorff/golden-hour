import { FC , useState} from "react"

interface Props {
    setInput: React.Dispatch<React.SetStateAction<boolean>>;
    input: boolean;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    date:string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    location:string;
    getSunsetTime: (date: string, location: string) => void;
  }

const Form: FC<Props> = ({setInput, date, input, setDate, location, setLocation, getSunsetTime}) => {
    
    const [dateError, setDateError] = useState<boolean>(false) // date input is bad

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault(); 

        // Debugging
        console.log("Current date:", date);
        console.log("Current location:", location);
        console.log("Current dateError:", dateError);
        console.log("Input state before submit:", input);

        
        // Check whether date inputted is ok
        if (dateOkay(date) || !date) {
            setDateError(false)

            try {
                await getSunsetTime(date, location);
                setInput(false);

            } catch (error) {
                console.error("Error fetching sunset time:", error);
            }
    

        } else {
            setDateError(true)
        }
    }

    function dateOkay(date:string): boolean{
          // check whether basic structure is followed
          if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return false
          }
    
          // check each component
          const [year, month, day] = date.split('-');
    
          if (Number(year) < 1900 || Number(year) > 2100) return false; // Valid 4-digit year
          if (Number(month) < 1 || Number(month) > 12) return false;   // Valid month range
          if (Number(day) < 1 || Number(day) > 31) return false;       // Valid day range

          return true
      }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                <label className="">Date:</label>
                    <input 
                    className={`border rounded px-1 mx-3 ${dateError ? 'border-red-900' : 'border-gray-300'}`} 
                    name="date"
                    placeholder="YYYY-MM-DD"
                    // value = {date}
                    onChange={(e) => setDate(e.target.value)}
                    />
                </div>


                <div className="flex items-center space-x-4">
                    <label className="">Location:</label>
                    <input 
                        className ="border border-gray-300 rounded px-1 mx-3"  
                        name="location"
                        placeholder="London"
                        onChange={(e) => setLocation(e.target.value)}
                        />
                </div>
            </div>

            {
                dateError && 
                <div className="mt-4 text-red-900">
                    Please follow the date structure <span className="font-bold">YYYY-MM-DD</span>
                </div>
            }

            <button 
                className="mt-10 py-2 px-4"
                onClick={handleSubmit}>
                Submit
            </button>
        </form>
        
    )
}

export default Form