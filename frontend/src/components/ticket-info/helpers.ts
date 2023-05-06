const rusPluralRules = new Intl.PluralRules('ru-RU'); // .select(1)

const transferPluralRules = {
    zero: 'Пересадок',
    one: 'Пересадка',
    two: 'Пересадки',
    few: 'Пересадки',
    many: 'Пересадок',
    other: 'Пересадок',
}

const letterByIndex: Record<number, string> = {
    0: 'д',
    1: 'ч',
    2: 'м'
}

export function formatDistanceStrict(duration: number) {
    const d = Math.floor(duration / (24 * 60));
    const h =  Math.floor((duration / 60) % 24);
    const m =  Math.floor(duration % 60);

    return [d, h, m].map((time, i ) => time ? time + letterByIndex[i] : '').join(' ')
}

export function timeToString(date: Date) {
    const h = date.getHours();
    const m = date.getMinutes();
    const rounding = 5 - m % 5;

    return `${h}:${m + rounding}`;
}

export function getTransferText(count: number) {
    return transferPluralRules[rusPluralRules.select(count)]
}