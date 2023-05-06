import React from 'react';

import styles from './TicketEmpty.module.css'

export const TicketEmpty: React.FC = () => {
    return (
        <div className={styles.ticketEmpty}>
            С ТЕКУЩИМИ ФИЛЬТРАМИ НИЧЕГО НЕ НАЙДЕНО
        </div>
    );
}