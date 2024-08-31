import React, { forwardRef, useId } from 'react'

const Select = (
    {label,
    options,
    className = "",
    ...props},ref
) => {

    const id = useId();


  return (

    <div className='w-full'>
        {label && <label htmlFor={id}>{label}</label>}

        <select
         id={id}
         ref={ref}
         className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full `}
          {...props}       
       >

        {options?.map((item,index)=>(
            <option key={index} value={item}>
                {item}
                </option>
        ))}

        </select>

    </div>

    

  )
}

export default forwardRef(Select)