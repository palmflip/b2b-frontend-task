import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Ticket } from '../ticket'
import { Button } from '../../ui/button'
import { TicketEmpty } from '../tecket-empty';
import { ticketsStore } from '../../stores/tickets-store'

import styles from './Tickets.module.css'

export const Tickets: React.FC = observer(() => {
    const showButton = !ticketsStore.stop
    const showStub = !ticketsStore.sortedTickets.length && !!ticketsStore.tickets.length
    const handleButtonClick = useCallback(() => ticketsStore.fetchTickets(), [])

    return (
        <div className={styles.tickets}>
            { 
                ticketsStore.sortedTickets.map(({ sign, ...props }) => (
                    <Ticket 
                        key={sign}
                        {...props}
                    />
                )) 
            }
            { showStub &&  <TicketEmpty />}
            {/* еще 5 билетов звучит не правдоподобно) */}
            { showButton && <Button whenClick={handleButtonClick}> ПОКАЗАТЬ ЕЩЕ БИЛЕТЫ </Button> }  
        </div>
    );
})