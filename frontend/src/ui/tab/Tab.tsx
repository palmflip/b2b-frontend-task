import React, {ReactNode, MouseEvent } from 'react';
import classnames from 'classnames';

import styles from './Tab.module.css'

export interface TabProps {
    className?: string;
    active?: boolean;
    whenClick?: (evt: MouseEvent<HTMLButtonElement>) => void,
    children?: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ className, children, whenClick, active}) => {
    const handleWhenClick = (evt: MouseEvent<HTMLButtonElement>) => {
        whenClick?.(evt);
    }

    return (
        <button 
            type='button' 
            className={classnames([{
                [styles.tab]: true,
                [styles.active]: active
            }, className])}
            onClick={handleWhenClick}
        >
            {children}
        </button>
    );
}