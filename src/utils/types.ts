export interface Event {
	id: string;
	key: string;
	title: string;
	description?: string;
	storageId?: string;
	startingDate: Date;
	finishingDate: Date;
	startingDateId?: string;
	finishingDateId?: string;
	overlapping: boolean;
	locale?: string;
}

export interface EventWithAddedStyles extends Event {
	width?: string;
	gridRow: string;
	gridColumn: string;
	marginBottom?: string;
	marginTop?: string;
	paddingBottom?: string;
	paddingTop?: string;
}
