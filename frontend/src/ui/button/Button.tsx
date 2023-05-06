import React, {ReactNode, MouseEvent } from 'react';
import classnames from 'classnames';

import styles from './Button.module.css'

export interface ButtonProps {
    className?: string;
    id?: string;
    disabled?: boolean;
    type?:  'button' | 'submit' | 'reset';
    onClick: (evt: MouseEvent<HTMLButtonElement>) => void,
    children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ className, children, ...props}) => {
    return (
        <button 
            className={classnames([styles.button, className])}
            {...props}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: 'button'
}