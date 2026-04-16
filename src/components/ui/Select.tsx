import { cn } from '@/lib/utils';
import { Select as RadixSelect } from 'radix-ui';
import {
    type ChangeEvent,
    Children,
    type ReactNode,
    forwardRef,
    isValidElement,
    useMemo,
    useState,
} from 'react';

type SelectProps = {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    required?: boolean;
};

const Select = forwardRef<
    React.ElementRef<typeof RadixSelect.Trigger>,
    SelectProps
>(
    (
        {
            children,
            className,
            disabled,
            id,
            name,
            onChange,
            onValueChange,
            placeholder,
            value,
            defaultValue,
            required,
        },
        ref,
    ) => {
        const [internalValue, setInternalValue] = useState<string>(
            defaultValue ?? '',
        );

        const { optionItems, optionValueMap, emptyValueSentinel } =
            useMemo(() => {
                const valueMap = new Map<string, string>();

                const items = Children.toArray(children).flatMap(
                    (node, index) => {
                        if (!isValidElement(node)) return [];

                        if (
                            typeof node.type === 'string' &&
                            node.type === 'option'
                        ) {
                            const optionProps =
                                node.props as React.OptionHTMLAttributes<HTMLOptionElement>;
                            const externalValue = String(
                                optionProps.value ??
                                    optionProps.children ??
                                    index,
                            );
                            const internalValue =
                                externalValue === ''
                                    ? `__empty__${index}`
                                    : externalValue;

                            valueMap.set(internalValue, externalValue);

                            return (
                                <RadixSelect.Item
                                    key={internalValue}
                                    value={internalValue}
                                    disabled={optionProps.disabled}
                                    className={cn(
                                        'relative flex cursor-default select-none items-center rounded-md px-3 py-2 text-sm text-text-primary',
                                        'outline-none transition-colors focus:bg-accent/10 focus:text-text-primary',
                                        'data-disabled:pointer-events-none data-disabled:opacity-50',
                                    )}
                                >
                                    <RadixSelect.ItemText>
                                        {optionProps.children}
                                    </RadixSelect.ItemText>
                                    <RadixSelect.ItemIndicator className="ml-auto text-text-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="m6 12 4 4 8-8" />
                                        </svg>
                                    </RadixSelect.ItemIndicator>
                                </RadixSelect.Item>
                            );
                        }

                        return node;
                    },
                );

                const emptyValueSentinel =
                    [...valueMap.entries()].find(
                        ([, external]) => external === '',
                    )?.[0] ?? null;

                return {
                    optionItems: items,
                    optionValueMap: valueMap,
                    emptyValueSentinel,
                };
            }, [children]);

        const getInternalValue = (external?: string) => {
            if (external === '') {
                return emptyValueSentinel ?? external;
            }

            return external;
        };

        const rootValue =
            value !== undefined ? getInternalValue(value) : undefined;
        const rootDefaultValue =
            value === undefined ? getInternalValue(defaultValue) : undefined;

        const currentValue = value ?? internalValue;

        const handleValueChange = (nextValue: string) => {
            const externalValue = optionValueMap.get(nextValue) ?? nextValue;

            if (value === undefined) {
                setInternalValue(externalValue);
            }

            onChange?.({
                target: { value: externalValue },
            } as unknown as ChangeEvent<HTMLSelectElement>);
            onValueChange?.(externalValue);
        };

        return (
            <RadixSelect.Root
                value={rootValue}
                defaultValue={rootDefaultValue}
                disabled={disabled}
                onValueChange={handleValueChange}
            >
                <div className="relative">
                    <RadixSelect.Trigger
                        ref={ref}
                        id={id}
                        className={cn(
                            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-text-primary',
                            'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            className,
                        )}
                        aria-disabled={disabled}
                    >
                        <RadixSelect.Value
                            placeholder={placeholder ?? 'Select an option'}
                        />
                        <RadixSelect.Icon className="text-text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </RadixSelect.Icon>
                    </RadixSelect.Trigger>
                    <RadixSelect.Portal>
                        <RadixSelect.Content
                            className={cn(
                                'z-50 min-w-32 overflow-hidden rounded-md border border-accent/20 bg-background-panel shadow-lg',
                                'animate-in data-[state=closed]:animate-out fade-in-0 data-[state=closed]:fade-out-0',
                            )}
                            position="popper"
                            sideOffset={6}
                        >
                            <RadixSelect.Viewport className="p-1">
                                {optionItems}
                            </RadixSelect.Viewport>
                        </RadixSelect.Content>
                    </RadixSelect.Portal>
                    {name ? (
                        <input
                            type="hidden"
                            name={name}
                            value={currentValue}
                            required={required}
                        />
                    ) : null}
                </div>
            </RadixSelect.Root>
        );
    },
);

Select.displayName = 'Select';

export { Select };
