import React, {ReactNode, MouseEvent } from 'react';
import classnames from 'classnames';

import styles from './Tab.module.css'

export interface TabProps {
    className?: string;
    active?: boolean;
    onClick: (evt: MouseEvent<HTMLButtonElement>) => void,
    children?: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ className, children, onClick, active}) => {
    return (
        <button 
            type='button' 
            className={classnames([{
                [styles.tab]: true,
                [styles.active]: active
            }, className])}
            onClick={onClick}
        >
            {children}
        </button>
    );
}