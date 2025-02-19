import "../../App.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiCloudOn } from "react-icons/ci";
import {IoPartlySunnyOutline, IoRainyOutline, IoSunnyOutline, IoThunderstormOutline} from "react-icons/io5";
import { FaRegSnowflake } from "react-icons/fa";
import Header from "../../Components/Header/Header.tsx";
import Loading from "../../Components/Loading/Loading.tsx";

const WeatherForecastScreen = () => {
    const { city } = useParams();
    const [weatherCurrent, setWeatherCurrent] = useState({});
    const [weatherWeek, setWeatherWeek] = useState(null);

    const capitalizeFirstLetter = (str:string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const getWeatherForecast = async () => {
        const resWeatherCurrent = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=c880fb6ae881432282813433250802&q=${city}`
        );
        const dataWeatherCurrent = await resWeatherCurrent.json();
        setWeatherCurrent(dataWeatherCurrent);

        const resWeatherWeek = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=c880fb6ae881432282813433250802&q=${city}&days=8`
        );
        const dataWeatherWeek = await resWeatherWeek.json();
        setWeatherWeek(dataWeatherWeek);

        console.log(dataWeatherCurrent);
        console.log(dataWeatherWeek); // Log para verificar como os dados estão chegando
    };

    useEffect(() => {
        getWeatherForecast();
    }, [city]);

    // Atualizando o dicionário de ícones com as chaves para comparação sem diferenciação de maiúsculas/minúsculas
    const weatherIcons = {
        "sunny": <IoSunnyOutline size={93} className="text-white" />,
        "partly cloudy": <IoPartlySunnyOutline size={93} className="text-white" />,
        "cloudy": <CiCloudOn size={93} className="text-white" />,
        "overcast": <CiCloudOn size={93} className="text-white" />,
        "mist": <CiCloudOn size={93} className="text-white" />,
        "patchy rain possible": <IoRainyOutline size={93} className="text-white"/>,
        "patchy rain nearby": <IoRainyOutline size={93} className="text-white"/>,
        "rain": <IoRainyOutline size={93} className="text-white"/>,
        "moderate rain" : <IoRainyOutline size={93} className="text-white" />,
        "heavy rain": <IoThunderstormOutline size={93} className="text-white"/>,
        "thunderstorm": <IoThunderstormOutline size={93} className="text-white"/>,
        "snow": <FaRegSnowflake size={93} className="text-white"/>,
    };

    const weatherTemperature = (temperature:number):string => {
        if (temperature < 12) {
            return "Freezing."
        }else{
            return "It's Hot."
        }
    }

    const truncNumber = (unTruncNumber:number):number => {
        return Math.trunc(unTruncNumber)
    }

    return (

        weatherWeek ? (

            <div className="overflow-hidden">
                <Header></Header>
                <div className="bg-backgroundContainer h-screen flex flex-col justify-between pl-12 pr-12 relative phone:justify-normal font-display">
                    <div className="md:flex md:flex-row md:items-start md:justify-between phone:flex phone:items-center phone:justify-center mb-96: ">
                        <h1 className="text-[333px] leading-54 text-white leading-none phone:hidden md:flex">{weatherTemperature(weatherWeek.current.temp_c)}</h1>
                        <h1 className="border-3 p-4 font-bold rounded-3xl text-2xl mr-16 mt-16 text-white phone:flex phone:items-center phone:justify-center phone:mr-0">{capitalizeFirstLetter(city)}</h1>
                    </div>
                    <div className="md:flex md:flex-row md:items-center md:justify-between md:mb-0 phone:flex phone:flex-col-reverse phone:mb-96 phone:leading-none phone:h-[660px] md:h-full md:mt-32">
                        <div className="flex flex-row gap-5 md:overflow-x-hidden phone:overflow-x-scroll phone:overflow-y-hidden min-h-[300px]">
                            {weatherWeek?.forecast ? (
                                weatherWeek.forecast.forecastday.slice(1).map((day) => {
                                    const condition:string = day.day.condition.text.toLowerCase(); // Normaliza o texto para minúsculas
                                    const iconToShow = weatherIcons[condition] || <CiCloudOn size={93} className="text-white" />; // Verifica a correspondência

                                    return (
                                        <div key={day.date}
                                             className="flex flex-col items-center justify-between border-3 rounded-full md:h-[293px] phone:h-[260px] phone:max-w-26 phone:min-w-32 md:max-w-33 md:min-w-38 index-2 text-white ">
                                            <div className="mt-5">{iconToShow}</div>
                                            <div className="flex flex-col text-sm text-gray-400">
                                                <span className="">{day.day.maxtemp_c} °C</span>
                                                <span className="">{day.day.mintemp_c} °C</span>
                                            </div>
                                            <h2 className="mb-12 font-bold text-3xl">{new Date(day.date).toLocaleDateString("en-US", {weekday: "short"})}</h2>
                                        </div>
                                    );
                                })
                            ) : (
                                <h1>Carregando...</h1>
                            )}

                        </div>
                        <div className="flex flex-row items-center md:justify-between text-white phone:justify-center phone:leading-none font-teste">
                            <h1 className="md:text-[300px] phone:text-[260px] phone:leading-none">{weatherCurrent.current ? `${truncNumber(weatherCurrent.current.temp_c)}` : "Carregando..."}</h1>
                            <div className="mb-48 md:text-6xl flex items-center phone:mt-12">
                                <span className="text-7xl">°</span>
                                <span className="text-8xl">c</span>
                            </div>
                        </div>
                    </div>

                    {/* Sol com 70% da largura da tela, posicionado na parte inferior */}
                    {
                        weatherCurrent.current.is_day == 0
                            ? <div className="absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 md:translate-y-3/5 md:w-[60vw] md:h-[60vw] bg-neutral-200 rounded-full blur-xl opacity-30 index-1 phone:bottom-1/2 phone:left-1/2 phone:right-0 phone:transform phone:translate-x-1 phone:translate-y-1/4 phone:w-[445px] phone:h-[554px]"></div>
                            : <div className="absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 md:translate-y-3/5 md:w-[60vw] md:h-[60vw]  bg-yellow-300 rounded-full blur-xl opacity-30 index-1 phone:bottom-1/2 phone:left-1/2 phone:right-0 phone:transform phone:translate-x-1 phone:translate-y-1/4 phone:w-[445px] phone:h-[554px]"></div>
                    }
                </div>
            </div>
        ) : <Loading/>
    );
};

export default WeatherForecastScreen;
