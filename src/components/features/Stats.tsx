export type StatItem = {
    label: string;
    value: string | number;
};

export type StatsProps = {
    stats: StatItem[];
} & React.HTMLAttributes<HTMLDivElement>;

export const Stats = ({ stats, ...props }: StatsProps) => {
    return (
        <div {...props} className="flex flex-col gap-5">
            {stats.map((stat, index) => (
                <div key={index} className="inline-flex gap-5">
                    <p className="text-accent uppercase text-base tracking-[0.4em] font-semibold">
                        {stat.label}
                    </p>
                    <p className="text-text-primary text-base tracking-wider">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

Stats.displayName = 'Stats';
