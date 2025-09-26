// Hook para pegar o tamanho da janela
import { useState, useEffect } from 'react';

interface WindowProps{
    width: number,
    height: number

}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowProps>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}