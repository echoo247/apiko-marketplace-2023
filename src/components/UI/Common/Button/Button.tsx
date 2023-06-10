import React, {FC, ReactNode} from 'react';


interface ButtonProps {
    children: ReactNode,
    className?: string,
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => void
}

const Button: FC<ButtonProps> = ({children, className, onClick, ...props}) => {
    return (
        <button
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
