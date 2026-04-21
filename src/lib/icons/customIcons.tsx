//─── TanStack (shared logo for Router + Query) ────────────────────────────────
// ─── Motion.dev ───────────────────────────────────────────────────────────────
import motionPng from './MotionIcon.png';
import tanstackPng from './TanStackIcon.png';

// Add custom PNG icons here for packages not available in developer-icons.
// 1. Place your .png file in src/lib/icons/ (e.g. tanstack.png)
// 2. Import it below
// 3. Export a component using the template at the bottom

type IconProps = { className?: string };

export const TanStackIcon = ({ className }: IconProps) => (
    <img src={tanstackPng} className={className} alt="TanStack" />
);
export const TanStackRouterIcon = TanStackIcon;
export const TanStackQueryIcon = TanStackIcon;

export const MotionIcon = ({ className }: IconProps) => (
    <img src={motionPng} className={className} alt="Motion" />
);

// ─── Template ─────────────────────────────────────────────────────────────────
// import myLibPng from './mylib.png';
//
// export const MyLibIcon = ({ className }: IconProps) => (
//     <img src={myLibPng} className={className} alt="MyLib" />
// );
