import React from 'react';

import { Tab } from '../../ui/tab'

import styles from './MultiSort.module.css'

export const MultiSort: React.FC = () => {
    return (
        <div className={styles.multiSort}>
            <Tab active={true}>САМЫЙ ДЕШЕВЫЙ</Tab>
            <Tab active={false}>САМЫЙ БЫСТРЫЙ</Tab>
            <Tab active={false}>ОПТИМАЛЬНЫЙ</Tab>
        </div>
    );
}