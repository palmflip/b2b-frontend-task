import React from 'react';

import { TicketHead } from '../ticket-head'
import { TicketInfo } from '../ticket-info';

import styles from './Ticket.module.css'

export const Ticket: React.FC = () => {
    return (
        <div className={styles.ticket}>
            <TicketHead price={13400} carrier={'S7'}/>
            <TicketInfo 
                origin={'MOW'}
                destination={'HKT'}
                dateUTC='2023-04-22T10:05:00.000Z'
                duration={1237}
                stops={['HKG', 'JNB']}
            />
            <TicketInfo 
                origin={'MOW'}
                destination={'HKT'}
                dateUTC='2023-04-22T10:05:00.000Z'
                duration={1295}
                stops={[]}
            />
        </div>
    );
}