import "../../App.css"
import b from "../../assets/logoweather.png";
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <div className="">
            <Link to={"/"} className="text-2xl text-white mt-12 flex flex-row items-center justify-center font-bold gap-1">
                <img src={b} alt="Weather logo" className="w-16"/> SimpleWeather
            </Link>
        </div>
    );
}

export default Header;