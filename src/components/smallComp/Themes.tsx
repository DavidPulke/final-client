import { FunctionComponent } from "react";
import { getStorageUser, setStorageUser } from "../../services/userService";

interface ThemesProps {

}

const Themes: FunctionComponent<ThemesProps> = () => {
    const storedUser = getStorageUser();
    const themes = {
        defaultTheme: {
            name: "Default Theme",
            src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1750112806/grediant-background_gxexio.jpg"
        },
        neonTheme: {
            name: "Neon Theme",
            src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1750112712/neon-background_jci1vj.jpg"
        },
        cityTheme: {
            name: "City Theme",
            src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1750112716/city-background_wdqr3h.jpg"
        },
        mountainTheme: {
            name: "Mountain Theme",
            src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1750116497/Mountain-background_g2xca6.jpg"
        },
    };

    const handleThemes = (theme: any) => {
        setStorageUser({ ...storedUser, theme })
        window.history.go(0)
    }
    return (<div className="themes-container">
        <h3>Themes</h3>
        <div className="themes">
            {/* Default Theme */}
            <div className="theme">
                <img src={themes.defaultTheme.src} alt={themes.defaultTheme.name} />
                <button onClick={() => handleThemes(themes.defaultTheme)} disabled={storedUser.theme && storedUser.theme.name === themes.defaultTheme.name} className="btn btn-warning">Set theme</button>
            </div>

            {/* Neon Theme */}
            <div className="theme">
                <img src={themes.neonTheme.src} alt={themes.neonTheme.name} />
                <button onClick={() => handleThemes(themes.neonTheme)} disabled={storedUser.theme && storedUser.theme.name === themes.neonTheme.name} className="btn btn-warning">Set theme</button>
            </div>

            {/* City Theme */}
            <div className="theme">
                <img src={themes.cityTheme.src} alt={themes.cityTheme.name} />
                <button onClick={() => handleThemes(themes.cityTheme)} disabled={storedUser.theme && storedUser.theme.name === themes.cityTheme.name} className="btn btn-warning">Set theme</button>
            </div>

            {/* Mountain Theme */}
            <div className="theme">
                <img src={themes.mountainTheme.src} alt={themes.mountainTheme.name} />
                <button onClick={() => handleThemes(themes.mountainTheme)} disabled={storedUser.theme && storedUser.theme.name === themes.mountainTheme.name} className="btn btn-warning">Set theme</button>
            </div>
        </div>
    </div>);
}

export default Themes;