import React, { useEffect } from 'react';

import { Logo } from '../../ui/logo'
import { TicketsFilter } from '../../components/tickets-filter';
import { TicketsSort } from '../../components/tickets-sort';
import { Tickets } from '../../components/tickets';
import { ticketsStore } from '../../stores/tickets-store'

import styles from './TicketsList.module.css';

export const TicketsList: React.FC = () => {
	useEffect(() => {
		ticketsStore.fetchTickets()
	}, [])

	return (
		<div className={styles.container}>
			<Logo className={styles.logo}></Logo>
			<div className={styles.content}>
				<TicketsFilter className={styles.filter}/>
				<TicketsSort/>
				<Tickets/>
			</div>
		</div>
	);
}
