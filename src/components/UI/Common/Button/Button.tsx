import React, {FC, ReactNode} from 'react';


interface ButtonProps {
    children: ReactNode,
    className?: string,
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => void
    type?: "button" | "submit" | "reset" | undefined
}

const Button: FC<ButtonProps> = ({children, className, onClick,type}) => {
    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export default Button;
