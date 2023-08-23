import { CalendarEvent, EventService } from 'types';

export const eventServiceLocalStorage: EventService = {
	getEvents: async (storageKey) => {
		const response = localStorage.getItem(storageKey);
		const events: CalendarEvent[] = response ? JSON.parse(response) : [];
		return Promise.resolve(events);
	},

	createEvent: async (event, storageKey) => {
		const events = [event];
		localStorage.setItem(storageKey, JSON.stringify(events));
		return Promise.resolve();
	},
};
