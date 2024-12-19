import {FC } from "react";
import sad_sun from '../assets/sun.png'


interface Props {
    setInput: React.Dispatch<React.SetStateAction<boolean>>;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    setLocation:React.Dispatch<React.SetStateAction<string>>;
    input: boolean;
    date: string;
    location: string;
    locationOutput: string;
    locationError:boolean;
    setLocationError:React.Dispatch<React.SetStateAction<boolean>>;
    setApiError:React.Dispatch<React.SetStateAction<boolean>>;
    apiError:boolean;
    sunsetTime:string;
  }

const Results: FC<Props> = ({setInput, setDate , date, input, setLocation, setApiError, location, locationOutput, locationError, setLocationError, apiError, sunsetTime }) => {

    function goBack(){
        setDate("")
        setLocation("")
        setInput(true)
        setLocationError(false)
        setApiError(false)

        // Debugging
        console.log("Current date:", date);
        console.log("Current location:", location);
        console.log("Current dateError:");
        console.log("Input state before submit:", input);

    }

    return (
        <div>
            { 
                !apiError && locationError &&    
                <div>
                    <p className="mb-4">
                        Hmmm, I'm not sure where <span className = "font-bold">{location}</span> is, but here's the time for the sunset in <span className="font-bold">London</span> <span className="font-bold">{date?`on ${date}`:"today"}</span>:
                    </p>
                    <p className="text-xl font-semibold text-orange-500">{sunsetTime} UCT</p>
                </div>
            }
            
            {
                !apiError && !locationError &&
                <div>
                    <p className="mb-4 italic">{locationOutput}</p>
                    <p className="mb-4">Time of sunset <span className="font-bold">{date?`on ${date}`:"today"}</span> in <span className="font-bold">{location?location:"London"}</span>:</p>
                    <p className="text-xl font-semibold text-orange-400">{sunsetTime} (UCT)</p> 
                </div>
            }

            {
                apiError &&
                <div>
                    <img className = "w-40 mx-auto" src={sad_sun} alt="Sad sun"/>
                    Not sure what went wrong there - please try again later!
                </div>

            }

            <button 
                className = "mt-10 py-2 px-4" 
                onClick={goBack}>
                Go back
            </button>
        </div>
    )
}

export default Results