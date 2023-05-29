import React, {ReactNode} from 'react';


interface ButtonHeaderProps {
    children: ReactNode,
    className?: string,
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => void
    type?: "button" | "submit" | "reset" | undefined
}

const ButtonHeader = ({children, className, onClick,type}: ButtonHeaderProps) => {
    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export default ButtonHeader;
