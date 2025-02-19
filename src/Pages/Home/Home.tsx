import '../../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header.tsx";
import MainSearch from "../../Components/MainSearch/MainSearch.tsx";

const Home = () => {
    const [city, setCity] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!city.trim()) return; // Evita submissão se o campo estiver vazio ou com espaços
        console.log("teste", city);
        navigate(`/weatherforecast/${city}`);
        setCity(""); // Limpa o campo após a navegação
    };

    return (
        <div className="flex bg-backgroundContainer h-screen justify-between items-center flex-col">
            <Header />
            <MainSearch city={city} setCity={setCity} onSubmit={onSubmit} />
        </div>
    );
};

export default Home;