import React, {InputHTMLAttributes} from 'react';
import style from './Input.module.css'
import {useFormContext} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    className?: string,
}

export const Input: React.FC<InputProps> = ({name, className, ...props}) => {
    const { register/*, formState: {errors} */} = useFormContext();
    // const isError = true
    return (
        <>
            <input
                {...register(name)}
                {...props}
                className={`${style.input_search_item} ${className}`}
            />
            {/*{errors[name] && <div>errors[name]?.message</div>}*/}
        </>
    );
};

