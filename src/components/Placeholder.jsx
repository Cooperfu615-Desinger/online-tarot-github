import React from 'react';

const Placeholder = ({ index, positionName }) => (
    <div className="flex flex-col items-center opacity-40">
        <div className="w-24 h-40 md:w-32 md:h-48 border-2 border-dashed border-amber-300/50 rounded-lg flex items-center justify-center bg-white/5">
            <span className="text-amber-100/50 text-2xl font-bold">{index + 1}</span>
        </div>
        <div className="mt-2 text-amber-100/40 text-xs text-center">{positionName}</div>
    </div>
);

export default Placeholder;
