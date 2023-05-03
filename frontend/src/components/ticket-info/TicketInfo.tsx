import React from 'react';

import { formatDistanceStrict, getTransferText, timeToString } from './helpers';

import styles from './TicketInfo.module.css'

export interface TicketInfoProps {
    origin: string;
    destination: string;
    dateUTC: string;
    stops:  string[];
    duration: number;
}

export const TicketInfo: React.FC<TicketInfoProps> = ({ origin, destination, dateUTC, stops, duration }) => {
    // по умолчанию подставляе GMT относительно вашего проживания (москва GMT+3), (Грузия GMT+4), (Таиланд GMT+7)
    // так как GMT места вылета и посадки мне не известно, оставил так
    const departureDate = new Date(dateUTC);
    const arrivalDate = new Date(Number(departureDate) + duration * 60 * 100);
    const departureTime =  timeToString(departureDate);
    const arrivalTime = timeToString(arrivalDate);
    const travelTime = formatDistanceStrict(duration);

    return (
        <div className={styles.ticketInfo}>
            <div className={styles.container}>
                <div className={styles.text}>
                    {origin} – {destination}
                </div>
                <div className={styles.secondText}>
                    {departureTime} – {arrivalTime}
                </div>
            </div>
            <div className={styles.length}>
                <div className={styles.text}>
                    в пути
                </div>
                <div className={styles.secondText}>
                    {travelTime}
                </div>
            </div>
            <div className={styles.stops}>
            <div className={styles.text}>
                    { stops.length ? `${stops.length} ${getTransferText(stops.length)}` : 'Без пересадок' }
                </div>
                {  stops.length > 0 && (
                    <div className={styles.secondText}>
                        { stops.join(', ') }
                    </div>
                )}
            </div>
        </div>
    );
}