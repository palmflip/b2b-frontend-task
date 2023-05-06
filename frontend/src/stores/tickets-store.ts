import { runInAction, makeAutoObservable } from 'mobx'

export interface ITicketSegment {
    // Код города (iata)
    origin: string;
    // Код города (iata)
    destination: string;
    // Дата и время вылета туда
    date: string;
    // Массив кодов (iata) городов с пересадками
    stops: string[];
    // Общее время перелёта в минутах
    duration: number;
}

export interface ITicket {
    // Идентификатор
    sign: string;
    // Цена в рублях
    price: number;
    // Код авиакомпании (iata)
    carrier: string;
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: [ITicketSegment, ITicketSegment]
}

export type SortOption = 'bestPrice' | 'fastest' | 'optimal'
export type TransferOption = 'all' | number

export const transferOptions = ['all', 0, 1, 2, 3] as const

// Note: я не буду создавать отдельную сущность для Api, и описывать общий контракт приходящих данных
class TicketsStore {
    private searchId: string | null = null;
    private tickets: ITicket[] = [];

    // Note: кажется вся сортировка и фильтры должны лежать в другом месте, и далее внедрять тикеты как зависимость
    sortOption: SortOption = 'bestPrice'
    transferOption: Set<TransferOption> = new Set()
    stop = false;


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async fetchSearchId() {
        // NOTE: мы знаем что тестовый сервер рано или поздно ответит, бесконечного цикла не будет, заглушу рисовать не надо)
        try {
            const res = await fetch('/search');
            const data = await res.json();
            
            runInAction(() => this.searchId = data.searchId)
        } catch {
            this.fetchSearchId();
        }
    }

    async fetchTickets() {
        if (!this.searchId) await this.fetchSearchId()

        try {
            const data = await fetch(`/tickets?searchId=${this.searchId}`);
            const res = await data.json();

            runInAction(() => {
                this.tickets.push(...res.tickets)
                this.stop = res.stop;
            })
        } catch (error) {
            this.fetchTickets();
        }
    }

    setSortOption(option: SortOption) {
        this.sortOption = option
    }

    toggleTransferOption(option: TransferOption) {
        if (this.transferOption.has(option)) {
            this.transferOption.delete(option)

            return;
        }

        if (option === 'all') {
            transferOptions.forEach(val => this.transferOption.add(val))
        } else {
            this.transferOption.add(option)
        }
    }

    get filteredTickets() {
        const filteredTickets = this.tickets;

        if (this.transferOption.size === 0) return filteredTickets;

        return this.tickets.filter((ticket) => {
            // Note: я хз как правильно, у нас билеты туда и обратно, чтобы меньше пустой выдачи было, оставлю some
            return ticket.segments.some((segment) => this.transferOption.has(segment.stops.length))
        })
    }

    get sortedTickets() {
        if (this.sortOption === 'bestPrice') return [...this.filteredTickets].sort((a, b) => a.price - b.price);
        if (this.sortOption === 'fastest') return [...this.filteredTickets].sort((a, b) => {
            const aDuration = a.segments.reduce((acc, cur) => acc + cur.duration, 0);
            const bDuration = b.segments.reduce((acc, cur) => acc + cur.duration, 0);
            return aDuration - bDuration;
        });
        return [...this.filteredTickets].sort((a, b) => {
            const aDuration = a.segments.reduce((acc, cur) => acc + cur.duration, 0);
            const bDuration = b.segments.reduce((acc, cur) => acc + cur.duration, 0);
            const aScore = a.price + aDuration;
            const bScore = b.price + bDuration;
            return aScore - bScore;
          });
    }
}

export const ticketsStore = new TicketsStore()