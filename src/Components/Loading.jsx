import React, { useEffect, useState } from 'react';

const LoadingAnimation = () => {

    const [color, setColor] = useState(0);
    const colors = ['border-red-600', 'border-blue-500', 'border-purple-600', 'border-yellow-500', 'border-orange-600', 'border-pink-600', 'border-green-500', 'border-gray-600',];

    useEffect(() => {
        const timeOut = setInterval(() => {
            setColor((prevIndex) => (prevIndex + 1) % colors.length);
        }, 2000); // Change color every second
        return () => clearInterval(timeOut);
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="relative w-6 h-6">
                <div className={`absolute inset-0 rounded-full border-[6px] ${colors[color]} border-t-transparent animate-spin`}></div>
            </div>
        </div>
    );
};

export default LoadingAnimation;