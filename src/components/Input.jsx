import React, { useId } from 'react'
import { forwardRef } from 'react'

const Input = forwardRef(
    function Input({
        label,
        type = "text",
        className = "",
        ...props
    }, ref) {

        const id = useId()
        return (
            <div className='w-full flex flex-col gap-2'>

                {label && <label 
                className='text-gray-500 myfont ' 
                htmlFor={id}>
                    {label}
                </label>
                }

                <input
                type={type}
                className="bg-white  text-black outline-none focus:border-gray-600 border-b-2 border-gray-400  w-full"
                ref={ref}
                {...props}
                id={id}
                />
            </div>
        )
    }
)

export default Input