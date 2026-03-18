import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type PageWrapperProps = {
    children: React.ReactNode;
    className?: string;
};

export const PageWrapper = ({ children, className }: PageWrapperProps) => (
    <motion.div
        className={cn('content-panel max-w-5xl w-full', className)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ type: 'spring', stiffness: 250, damping: 50 }}
    >
        {children}
    </motion.div>
);

PageWrapper.displayName = 'PageWrapper';
