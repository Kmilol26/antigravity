'use client';

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

// Simple Context to share state
const SelectContext = React.createContext<{
    value: string | undefined;
    onValueChange: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
} | null>(null);

const Select = ({ children, defaultValue, onValueChange, value: controlledValue }: any) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue || "");

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        if (onValueChange) onValueChange(newValue);
        setOpen(false);
    };

    return (
        <SelectContext.Provider value={{ value: controlledValue !== undefined ? controlledValue : value, onValueChange: handleValueChange, open, setOpen }}>
            <div className="relative inline-block w-full text-left">
                {children}
            </div>
        </SelectContext.Provider>
    );
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, children, ...props }, ref) => {
        const context = React.useContext(SelectContext);
        return (
            <button
                type="button"
                ref={ref}
                onClick={() => context?.setOpen(!context.open)}
                className={cn(
                    "flex h-9 w-full items-center justify-between rounded-md border border-[#FE6535] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FE6535]/20 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#E55A28] transition-all",
                    className
                )}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
        )
    }
)
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
    const context = React.useContext(SelectContext);
    // This is a simplification. In a real SelectValue, we'd need to map the value to the label.
    // For this mockup, we might just show the value or need a way to find the selected child's text.
    // To keep it simple for now, we will trust the select content mapping or just display 'Selected' if complex.
    // Better yet, let's just render the value if it exists, or placeholder. 
    // Ideally we would look up the label from the children of SelectContent, but that's hard here.
    // Let's just output the value for now, user can refine if needed.
    return <span>{context?.value || placeholder}</span>
}

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const context = React.useContext(SelectContext);
        if (!context?.open) return null;

        return (
            <div
                ref={ref}
                className={cn(
                    "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md animate-in fade-in-80 w-full mt-1",
                    className
                )}
                {...props}
            >
                <div className="p-1">
                    {children}
                </div>
            </div>
        )
    }
)
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
    ({ className, children, value, ...props }, ref) => {
        const context = React.useContext(SelectContext);
        return (
            <div
                ref={ref}
                onClick={(e) => {
                    e.stopPropagation();
                    context?.onValueChange(value);
                }}
                className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 cursor-pointer",
                    className
                )}
                {...props}
            >
                <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    {/* Checkmark could go here */}
                </span>
                <span className="truncate">{children}</span>
            </div>
        )
    }
)
SelectItem.displayName = "SelectItem"

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }

// Stub components to match export expectations if needed
const SelectGroup = ({ children }: any) => <>{children}</>
const SelectLabel = ({ children }: any) => <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
const SelectSeparator = () => <div className="-mx-1 my-1 h-px bg-muted" />
