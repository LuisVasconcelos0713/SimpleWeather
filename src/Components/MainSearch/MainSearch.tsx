import "../../App.css"
import {FaSearch} from "react-icons/fa";

interface MainSearchProps {
    onSubmit: (event: React.FormEvent) => void;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

const MainSearch: React.FC<MainSearchProps> = ({onSubmit,city,setCity}) => {
    return (
        <div className="">
            <div className="text-white flex flex-col items-center justify-center gap-12 mb-[453px]">
                <div className="text-3xl flex flex-col items-center justify-center">
                    <h1 className="font-bold">Welcome to <strong className="text-blue-500">SimpleWeather</strong></h1>
                    <h1 className="font-light text-xl">Choose a location to see the weather forecast</h1>
                </div>
                <form onSubmit={onSubmit} className="flex items-center justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Type a Location"
                        value={city}
                        onChange={(e:React.FormEvent) => setCity(e.target.value)}
                        className="md:w-[543px] p-3 b-4 border-4 border-white rounded-lg text-white"/>
                    <button type="submit" className="p-4 border-4 border-white rounded-lg text-white hover:border-blue-500 hover:text-blue-500"><FaSearch /></button>
                </form>
            </div>
            <span></span>
        </div>
    );
}

export default MainSearch;