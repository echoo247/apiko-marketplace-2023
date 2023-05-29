import React, {ReactNode} from 'react';
import styled from './InputLabel.module.css'


interface InputLabelProps {
    children: ReactNode,
    styles?: string
}

const InputLabel = ({children, styles}: InputLabelProps) => {
    return (
        <label className={`${styled.input_label} ${styles}`}>
            {children}
        </label>
    );
};

export default InputLabel;
