import React, { ChangeEvent, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './Checkbox.module.css'

export interface CheckboxProps {
    className?: string;
    checked: boolean;
    disabled?: boolean;
    value?: string;
	id?: string;
	name?: string;
    onChange: (value: boolean) => void;
    children?: ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ onChange, className, children, ...props }) => {
    const handleWhenChange = (evt: ChangeEvent<HTMLInputElement>) => {
        onChange(evt.target.checked);
    }

    return (
        <label className={classnames([styles.container, className])}>
           <input 
                className={styles.checkbox} 
                type='checkbox' 
                onChange={handleWhenChange}
                {...props}
            ></input>
            {children}
        </label>
    );
}