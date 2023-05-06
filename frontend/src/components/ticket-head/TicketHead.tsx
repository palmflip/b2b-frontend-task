import React from 'react';

import styles from './TicketHead.module.css'

export interface TicketHeadProps {
    price: number;
    carrier: string;
}

export const TicketHead: React.FC<TicketHeadProps> = ({ price, carrier }) => {
    return (
        <div className={styles.ticketHead}>
            <div className={styles.price}>{price.toLocaleString('ru-Ru')} Р</div>
            <img
                srcSet={`
                    //pics.avs.io/110/36/${carrier}.png,
                    //pics.avs.io/220/72/${carrier}.png 2x`
                }
                width={110}
                height={36}
                src={`//pics.avs.io/110/36/${carrier}.png`} 
                alt={`логотип перевозчика ${carrier}`}
            />
        </div>
    );
}