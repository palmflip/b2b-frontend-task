import React from 'react';

import { Ticket } from '../ticket'
import { Button } from '../../ui/button'

import styles from './Tickets.module.css'

export const Tickets: React.FC = () => {
    return (
        <div className={styles.tickets}>
            <Ticket/>
            <Ticket/>
            <Ticket/>
            <Ticket/>
            <Ticket/>
            <Button>
               ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
            </Button>
        </div>
    );
}