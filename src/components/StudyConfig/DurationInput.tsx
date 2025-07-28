"use client";

export default function DurationInput({
    label,
    name,
    unit,
    infinite,
    min,
    placeholder
}: {
    label: string;
    name: string;
    unit: string;
    infinite: boolean;
    min:string;
    placeholder:string;
}) {
    return (
        <div className="flex flex-col">
            <div className={`flex flex-row items-center ${!infinite ? "mb-4":""}`}>
                <span className="text-md text-stone-300 mr-4 w-64">{label}</span>
                <input
                    className="bg-stone-800 w-20 pl-2 text-stone-300 rounded-sm"
                    type="number"
                    min={min}
                    placeholder={placeholder}
                    name={name}
                />
                <span className="text-stone-300 ml-4">{unit}</span>
            </div>
            {infinite && <span className="text-stone-400 text-sm italic mb-4">Leave duration at 0 for infinite display</span>}
        </div>
    );
}