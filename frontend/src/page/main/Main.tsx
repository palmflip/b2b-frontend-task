import React from 'react';

import { Logo } from '../../ui/logo'
import { FilterTickets } from '../../components/filter-tickets';
import { MultiSort } from '../../components/multi-sort';
import { Tickets } from '../../components/tickets';

import styles from './Main.module.css';

export const Main = () => {
	return (
    	<div className={styles.container}>
      		<Logo className={styles.logo}></Logo>
			<div className={styles.content}>
				<FilterTickets className={styles.filter}/>
				<MultiSort/>
				<Tickets/>
			</div>
    	</div>
  	);
}
