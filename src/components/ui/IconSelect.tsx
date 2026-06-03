import { useMemo, useState } from 'react';

import { Button } from './Button';
import { Input } from './Input';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

interface IconOption {
    label: string;
    value: string;
}

interface IconSelectProps {
    options: readonly IconOption[];
    value: string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    renderIcon: (
        iconName: string | null,
        className?: string,
    ) => React.ReactNode;
}

export function IconSelect({
    options,
    value,
    onChange,
    placeholder = 'Select an icon',
    renderIcon,
}: IconSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const selectedOption = useMemo(
        () => options.find((opt) => opt.value === value),
        [options, value],
    );

    const filteredOptions = useMemo(() => {
        if (!search.trim()) return options;
        const lowerSearch = search.toLowerCase();
        return options.filter(
            (opt) =>
                opt.label.toLowerCase().includes(lowerSearch) ||
                opt.value.toLowerCase().includes(lowerSearch),
        );
    }, [options, search]);

    const handleSelect = (iconValue: string) => {
        onChange(iconValue || null);
        setOpen(false);
        setSearch('');
    };

    const handleClear = () => {
        onChange(null);
        setSearch('');
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                >
                    <span className="flex items-center gap-2">
                        {value ? (
                            <>
                                {renderIcon(value, 'w-5 h-5')}
                                <span>{selectedOption?.label}</span>
                            </>
                        ) : (
                            <span className="text-muted">{placeholder}</span>
                        )}
                    </span>
                    <span className="text-xs">▼</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
                <div className="p-2 border-b">
                    <Input
                        placeholder="Search icons..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="max-h-60 overflow-y-auto p-1">
                    {filteredOptions.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted">
                            No icons found
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-0.5">
                            <button
                                type="button"
                                onClick={() => handleSelect('')}
                                className={[
                                    'flex items-center gap-2 px-3 py-2 rounded text-left',
                                    'hover:bg-accent/10 transition-colors',
                                    !value ? 'bg-accent/10' : '',
                                ].join(' ')}
                            >
                                <span className="w-5 h-5" />
                                <span>No icon</span>
                            </button>
                            {filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={[
                                        'flex items-center gap-2 px-3 py-2 rounded text-left',
                                        'hover:bg-accent/10 transition-colors',
                                        value === option.value
                                            ? 'bg-accent/10'
                                            : '',
                                    ].join(' ')}
                                >
                                    {renderIcon(option.value, 'w-5 h-5')}
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {value && (
                    <div className="p-2 border-t">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                            className="w-full"
                        >
                            Clear selection
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
