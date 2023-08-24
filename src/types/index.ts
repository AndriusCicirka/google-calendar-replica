export interface CalendarEvent {
	id: string;
	title: string;
	description?: string;
	storageId?: string;
	startingDate: Date;
	finishingDate: Date;
	startingDateId?: string;
	finishingDateId?: string;

	locale?: string;
}

export interface CalendarEventWithStyles extends CalendarEvent {
	width?: string;
	key: string;
	gridRow: string;
	gridColumn: string;
	extendsOverMultipleDays: boolean;
	marginBottom?: string;
	marginTop?: string;
	paddingBottom?: string;
	paddingTop?: string;
}

export interface EventService {
	getEvents: (storageKey: string) => Promise<CalendarEvent[]>;
	createEvent: (
		event: CalendarEvent | CalendarEvent[],
		storageKey: string
	) => Promise<void>;
}
