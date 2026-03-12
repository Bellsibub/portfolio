import { type NavLink, Navbar, ScrollIndicator } from '@/components/layouts';
// motion used for motion.main
import {
    Outlet,
    createFileRoute,
    useMatch,
    useMatches,
    useNavigate,
    useRouterState,
} from '@tanstack/react-router';
import {
    AnimatePresence,
    animate,
    motion,
    useMotionValue,
} from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

export const Route = createFileRoute('/_public')({
    component: PublicLayout,
});

const links: NavLink[] = [
    { name: 'Character', href: '/' },
    { name: 'Quests', href: '/quests' },
    { name: 'Skills', href: '/skills' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Lore', href: '/lore' },
];

const WHEEL_THRESHOLD = 350;
const DRAG_THRESHOLD = 150;
const SPRING = { type: 'spring' as const, stiffness: 250, damping: 50 };

function PublicLayout() {
    const navigate = useNavigate();
    const { location } = useRouterState();
    const activeIndex = links.findIndex((l) => l.href === location.pathname);

    const matches = useMatches();
    const match = useMatch({ strict: false });
    const nextMatch = matches[matches.findIndex((d) => d.id === match.id) + 1];

    const y = useMotionValue(0);
    const isNavigating = useRef(false);

    const tryNavigate = useCallback(
        (direction: 1 | -1) => {
            if (isNavigating.current) return;
            const nextIndex = activeIndex + direction;
            if (nextIndex < 0 || nextIndex >= links.length) {
                animate(y, 0, SPRING);
                return;
            }
            isNavigating.current = true;
            animate(y, 0, SPRING);
            navigate({ to: links[nextIndex].href });
            setTimeout(() => {
                isNavigating.current = false;
            }, 700);
        },
        [activeIndex, navigate, y],
    );

    useEffect(() => {
        // --- Wheel ---
        let accumulated = 0;
        let resetTimer: ReturnType<typeof setTimeout>;

        const handleWheel = (e: WheelEvent) => {
            if (isNavigating.current) return;

            const atBottom =
                window.scrollY + window.innerHeight >=
                document.documentElement.scrollHeight - 1;
            const atTop = window.scrollY <= 0;
            const goingDown = e.deltaY > 0;

            if (!(goingDown && atBottom) && !(!goingDown && atTop)) {
                accumulated = 0;
                return;
            }

            y.set(Math.max(-100, Math.min(100, y.get() - e.deltaY * 0.2)));
            accumulated += Math.abs(e.deltaY);

            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                if (!isNavigating.current) {
                    animate(y, 0, SPRING);
                    accumulated = 0;
                }
            }, 200);

            if (accumulated > WHEEL_THRESHOLD) {
                accumulated = 0;
                clearTimeout(resetTimer);
                tryNavigate(goingDown ? 1 : -1);
            }
        };

        // --- Touch ---
        let touchStartY = 0;
        let touchMode: 'undecided' | 'drag' | 'scroll' = 'undecided';

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
            touchMode = 'undecided';
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isNavigating.current) return;

            const deltaY = touchStartY - e.touches[0].clientY;
            const atBottom =
                window.scrollY + window.innerHeight >=
                document.documentElement.scrollHeight - 1;
            const atTop = window.scrollY <= 0;
            const goingDown = deltaY > 0;

            if (touchMode === 'undecided' && Math.abs(deltaY) > 8) {
                touchMode =
                    (goingDown && atBottom) || (!goingDown && atTop)
                        ? 'drag'
                        : 'scroll';
            }

            if (touchMode === 'drag') {
                e.preventDefault();
                y.set(Math.max(-100, Math.min(100, -deltaY * 0.5)));
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (touchMode === 'drag') {
                const totalDelta = touchStartY - e.changedTouches[0].clientY;
                if (Math.abs(totalDelta) > DRAG_THRESHOLD) {
                    tryNavigate(totalDelta > 0 ? 1 : -1);
                } else {
                    animate(y, 0, SPRING);
                }
            }
            touchMode = 'undecided';
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, {
            passive: true,
        });
        window.addEventListener('touchmove', handleTouchMove, {
            passive: false,
        });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [tryNavigate, y]);

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Navbar links={links} />
            <motion.main
                className="flex-1 flex items-center justify-center px-6"
                style={{ y }}
            >
                <AnimatePresence mode="wait">
                    <Outlet key={nextMatch.id} />
                </AnimatePresence>
            </motion.main>
            <ScrollIndicator links={links} activeIndex={activeIndex} />
        </div>
    );
}
