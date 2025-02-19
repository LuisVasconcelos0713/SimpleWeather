import '../../App.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../Components/Header/Header.tsx";
import MainSearch from "../../Components/MainSearch/MainSearch.tsx";

const Home = () => {

    const [city, setCity] = useState("")
    const navigate = useNavigate();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        if (!city.trim()) return
        console.log("teste", city)
        navigate(`/weatherforecast/${city}`)
        setCity("")
    }

    return (
        <div className="">
            <div className="flex bg-backgroundContainer h-screen justify-between items-center flex-col">
                <Header/>
                <MainSearch city={city} setCity={setCity} onSubmit={onSubmit} />
                <span></span>
            </div>
        </div>
    );
}

export default Home;