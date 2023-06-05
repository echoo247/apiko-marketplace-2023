import React, {ReactNode} from 'react';
import styled from './InputLabel.module.css'


interface InputLabelProps {
    children: ReactNode,
    className?: string
}

const InputLabel = ({children, className}: InputLabelProps) => {
    return (
        <label className={`${styled.input_label} ${className}`}>
            {children}
        </label>
    );
};

export default InputLabel;
