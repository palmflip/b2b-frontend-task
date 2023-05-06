import React from 'react';

import { TicketHead } from '../ticket-head'
import { TicketInfo } from '../ticket-info';
import type { ITicket } from '../../stores/tickets-store'

import styles from './Ticket.module.css'

export type TicketProps = Omit<ITicket, 'sign'>

export const Ticket: React.FC<TicketProps> = ({ price, carrier, segments }) => {
    return (
        <div className={styles.ticket}>
            <TicketHead price={price} carrier={carrier}/>
            {/* Note в данном кейсе можно index в качестыве ключа) */}
            { segments.map((segment, i) => ( <TicketInfo  key={i} {...segment} /> )) }
        </div>
    );
}