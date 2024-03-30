import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  ({ type, label, placeholder, register, name, error, className }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-slate-800">
           {label}
          </label>
        )}

        <div>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? true : false}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
              className
            )}/>
            {error && (<span className="text-xs mt-0.5 text-[#f64949fe]">{error}</span>)}
        </div>
      </div>
    );
  }
);

export default Textbox;
