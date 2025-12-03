import React from 'react';

const Placeholder = ({ index, positionName }) => (
    <div className="flex flex-col items-center opacity-40">
        <div className="w-32 h-48 md:w-56 md:h-84 border-2 border-dashed border-amber-300/50 rounded-lg flex items-center justify-center bg-white/5">
            <span className="text-amber-100/50 text-2xl font-bold">{index + 1}</span>
        </div>
        <div className="mt-2 text-amber-100/40 text-xs text-center">{positionName}</div>
    </div>
);

export default Placeholder;
