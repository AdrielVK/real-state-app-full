import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    accept:boolean;
    Icon?: React.ElementType | null;
}

const Button: React.FC<ButtonProps> = ({Icon, text,accept, ...rest }) => {
    return (
        <button
            type="submit"
            className={`w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                accept ? `bg-amber-500 hover:bg-amber-600` : `bg-gray-300`
            } focus:outline-none`}            
            {...rest} 
        >
            {text}
            {Icon && <Icon className='w-5 h-5'/>}
        </button>
    );
}

export default Button;