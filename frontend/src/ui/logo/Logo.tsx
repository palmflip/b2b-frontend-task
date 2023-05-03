import React from 'react';

import logoSvg from './logo.svg'
import classnames from 'classnames';


export interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <img
            className={classnames(className)}
            src={logoSvg}
            alt='логотип Авиасейлс'
        />
    );
}