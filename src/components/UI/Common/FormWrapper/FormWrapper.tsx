import React, {FC, ReactNode} from 'react';
import styled from './FormWrapper.module.css'

interface FormWrapperProps {
    children: ReactNode,
    name?: string
    className?: string,
    title?: boolean
}

const FormWrapper: FC<FormWrapperProps> = ({children , className, name, title = true}) => {
    return (
        <div className={`${styled.container} ${className}` }>
            {title &&
                <p className={styled.title}>
                    {name}
                </p>
            }
            {children}
        </div>
    );
};

export default FormWrapper;

