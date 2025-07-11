import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) { /* Lo necesito para poder envolver a mis componentes y que compartan ese contexto | Permite envolver componentes que comparten ese contexto */
    const [theme, setTheme] = useLocalStorage('theme', 'light') /* Recibe la calve dondequiero guardar y el valor por defecto */
    const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() { /* Lo necesito para poder cambiar el contexto | Permite interacturar con el contexto */
    return useContext(ThemeContext)
}