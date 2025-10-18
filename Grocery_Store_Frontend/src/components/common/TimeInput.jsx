import React from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

const TimeInput = ({
  label = "Time",
  value,
  onChange,
  name,
  disabled = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full"
    >
      <label
        htmlFor={name}
        className="text-sm font-semibold text-slate-700 mb-1 flex items-center space-x-2"
      >
        <Clock className="w-4 h-4 text-emerald-500" />
        <span>{label}</span>
      </label>

      {disabled ? (
        <div className="relative flex items-center px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 shadow-sm">
          <Clock className="w-4 h-4 text-slate-400 mr-2" />
          <span className="text-sm font-medium">
            {value || "—"}
          </span>
        </div>
      ) : (
        <div className="relative">
          <motion.div whileFocus={{ scale: 1.02 }} className="relative">
            <input
              type="time"
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className="w-full px-10 py-3 text-sm rounded-xl border border-slate-200 bg-white/60 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
            />
            <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default TimeInput;
