import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Tab } from '../../ui/tab'
import { ticketsStore, SortOption } from '../../stores/tickets-store'

import styles from './TicketsSort.module.css'

export const TicketsSort: React.FC = observer(() => {

    const handleWhenClick = useCallback((option: SortOption) => () => ticketsStore.setSortOption(option), [ ])

    return (
        <div className={styles.ticketsSort}>
            <Tab 
                active={ticketsStore.sortOption === 'bestPrice'} 
                whenClick={handleWhenClick('bestPrice')}
            >
                САМЫЙ ДЕШЕВЫЙ
            </Tab>
            <Tab 
                active={ticketsStore.sortOption === 'fastest'}
                whenClick={handleWhenClick('fastest')}
            >
                САМЫЙ БЫСТРЫЙ
            </Tab>
            <Tab 
                active={ticketsStore.sortOption === 'optimal'}
                whenClick={handleWhenClick('optimal')}
            >
                ОПТИМАЛЬНЫЙ
            </Tab>
        </div>
    );
})