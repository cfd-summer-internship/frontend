import React from 'react'

    // Reusable Button component with props
    const ReusableButton = ({
                        title,
                        onClick
                    }: {
        title: string;
        onClick: () => void;
    }) => {
        return (
            <div
                onClick={onClick}
                className="bg-emerald-700 text-white hover:bg-emerald-600 hover:cursor-pointer px-20 py-3 rounded-lg transition-colors duration-300"
            >
                {title}
            </div>
        );
    };

export default ReusableButton
