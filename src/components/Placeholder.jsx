import React from 'react';
import { motion } from 'framer-motion';

const Placeholder = ({ index, positionName }) => (
    <motion.div
        className="flex flex-col items-center opacity-40 flex-shrink-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{
            duration: 0.5,
            delay: index * 0.1
        }}
    >
        <div className="w-[160px] h-[281px] border-2 border-dashed border-amber-300/50 rounded-lg flex items-center justify-center bg-white/5 flex-shrink-0">
            <span className="text-amber-100/50 text-2xl font-bold">{index + 1}</span>
        </div>
        <div className="mt-3 text-amber-100/40 text-sm text-center w-[160px]">{positionName}</div>
    </motion.div>
);

export default Placeholder;
