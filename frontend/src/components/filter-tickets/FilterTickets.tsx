import React from 'react';
import classnames from 'classnames';

import { Checkbox } from '../../ui/checkbox';
import styles from './FilterTickets.module.css'


export interface FilterTicketsProps {
    className?: string;
}

export const FilterTickets: React.FC<FilterTicketsProps> = ({ className }) => {
    return (
        <div className={classnames([styles.filterTickets, className])} aria-label="Фильтрация по колличеству пересадок">
            <div className={styles.legend}>Количество пересадок</div>
            <Checkbox checked={false} whenChange={() => {}}>
                Все
            </Checkbox>
            <Checkbox checked={true} whenChange={() => {}}>
                Без пересадок
            </Checkbox>
            <Checkbox checked={true} whenChange={() => {}}>
                1 пересадка
            </Checkbox>
            <Checkbox checked={true} whenChange={() => {}}>
                2 пересадки
            </Checkbox>
            <Checkbox checked={false} whenChange={() => {}}>
                3 пересадки
            </Checkbox>
        </div>
    );
}