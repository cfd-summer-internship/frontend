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
                className="bg-black text-white hover:bg-gray-50 hover:text-black hover:cursor-pointer px-20 py-3 rounded-lg transition-colors duration-300"
            >
                {title}
            </div>
        );
    };

export default ReusableButton
