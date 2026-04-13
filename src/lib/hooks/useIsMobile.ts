import { useEffect, useState } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        () => window.matchMedia('(pointer: coarse)').matches,
    );

    useEffect(() => {
        const mql = window.matchMedia('(pointer: coarse)');
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return isMobile;
}
