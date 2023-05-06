import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import classnames from 'classnames';

import { Checkbox } from '../../ui/checkbox';
import styles from './TicketsFilter.module.css'
import { ticketsStore, transferOptions } from '../../stores/tickets-store';


export interface TicketsFilterProps {
    className?: string;
}

const wordMap: Record<typeof transferOptions[number], string> = {
    all: 'Все',
    0: 'Без пересадок',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки'
}

export const TicketsFilter: React.FC<TicketsFilterProps> = observer(({ className }: TicketsFilterProps) => {
    const handleWhenClick = useCallback((option: typeof transferOptions[number]) => () => ticketsStore.toggleTransferOption(option), [ ])

    return (
        <div className={classnames([styles.ticketsFilter, className])} aria-label="Фильтрация по колличеству пересадок">
            <div className={styles.legend}>Количество пересадок</div>
            { transferOptions.map((option) => {
                return (
                    <Checkbox 
                        key={option}
                        checked={ticketsStore.transferOption.has(option)} 
                        whenChange={handleWhenClick(option)}
                    > 
                        {wordMap[option]}
                    </Checkbox>
                )
            })}
        </div>
    );
})