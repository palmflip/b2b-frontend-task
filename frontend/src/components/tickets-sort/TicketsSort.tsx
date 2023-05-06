import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Tab } from '../../ui/tab'
import { ticketsStore, SortOption } from '../../stores/tickets-store'

import styles from './TicketsSort.module.css'

export const TicketsSort: React.FC = observer(() => {

    const handleOnClick = useCallback((option: SortOption) => () => ticketsStore.setSortOption(option), [ ])

    return (
        <div className={styles.ticketsSort}>
            <Tab 
                active={ticketsStore.sortOption === 'bestPrice'} 
                onClick={handleOnClick('bestPrice')}
            >
                САМЫЙ ДЕШЕВЫЙ
            </Tab>
            <Tab 
                active={ticketsStore.sortOption === 'fastest'}
                onClick={handleOnClick('fastest')}
            >
                САМЫЙ БЫСТРЫЙ
            </Tab>
            <Tab 
                active={ticketsStore.sortOption === 'optimal'}
                onClick={handleOnClick('optimal')}
            >
                ОПТИМАЛЬНЫЙ
            </Tab>
        </div>
    );
})