import { CalendarEvent, CalendarEventWithStyles } from '../types';

import { v4 as uuidv4 } from 'uuid';

export const MS_IN_SECOND = 1000;
export const SECONDS_IN_HOUR = 3600;
export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR = 60;
export const DAYS_IN_WEEK = 7;
export const WEEK_LENGTH = 7;
export const TIME_MARKINGS = [
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
];

export const getToday = () => {
	return new Date();
};

export const getWeekdays = (date: Date) => {
	const startDate = new Date(date);
	return Array(DAYS_IN_WEEK)
		.fill('')
		.map((_, index) => {
			const newDate = new Date(startDate);
			newDate.setDate(startDate.getDate() - (startDate.getDay() - index));
			return newDate;
		});
};

export const formatDateToDDMMYY = (date: Date) => {
	date = new Date(date);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${day}/${month}/${year}`;
};

export const generateId = (): string => {
	return uuidv4();
};

export const getWeekOfYear = (date: string | Date) => {
	date = new Date(date);
	date.setHours(0, 0, 0, 0);
	const firstDayOfYear = new Date(date.getFullYear(), 0, 0);
	const firstSundayOffset =
		(DAYS_IN_WEEK - firstDayOfYear.getDay()) % DAYS_IN_WEEK;
	const firstSundayOfYear = new Date(Number(firstDayOfYear));
	firstSundayOfYear.setDate(firstDayOfYear.getDate() + firstSundayOffset);

	if (date < firstSundayOfYear) {
		return 1;
	}

	const daysSinceFirstSunday =
		(date.getTime() - firstDayOfYear.getTime()) /
		(HOURS_IN_DAY * SECONDS_IN_HOUR * MS_IN_SECOND);

	let weekNumber = Math.floor(daysSinceFirstSunday / DAYS_IN_WEEK) + 1;

	return weekNumber;
};

export const generateDateId = (date: Date) => {
	return `${getWeekOfYear(date)}/${date.getFullYear()}`;
};

export const calculatePreffix = (i: number): 'AM' | 'PM' => {
	if (i < 11) {
		return 'AM';
	}

	return 'PM';
};

export const calculateStyles = (event: CalendarEvent) => {
	const extendsOverMultipleDays =
		formatDateToDDMMYY(event.startingDate) !==
		formatDateToDDMMYY(event.finishingDate);

	const { id, title, description, startingDate, finishingDate } = event;

	const metaData = {
		id,
		title,
		description,
		startingDate,
		finishingDate,
		extendsOverMultipleDays,
	};

	if (extendsOverMultipleDays) {
		const styledData: CalendarEventWithStyles[] = [];
		const loopLength = Math.floor(
			(new Date(event.finishingDate).getTime() -
				new Date(event.startingDate).getTime()) /
				(SECONDS_IN_HOUR * HOURS_IN_DAY * MS_IN_SECOND)
		);

		let iterableDate = new Date(event.startingDate);

		styledData.push({
			...metaData,
			key: `${id}-0`,
			storageId: generateDateId(event.startingDate),
			width: '100%',
			gridRow: `${startingDate.getHours() + 1}/${HOURS_IN_DAY + 1}`,
			gridColumn: `${startingDate.getDay() + 1}`,
			marginTop: `${startingDate.getMinutes()}px`,
			marginBottom: '-10px',
			paddingBottom: '15px',
		});

		if (loopLength > 1) {
			for (let i = 1; i < loopLength; i++) {
				styledData.push({
					...metaData,
					key: `${id}-${i}`,
					storageId: generateDateId(
						new Date(iterableDate.setDate(iterableDate.getDate() + 1))
					),
					width: '100%',
					gridRow: `${1}/${HOURS_IN_DAY + 1}`,
					gridColumn: `${
						new Date(iterableDate.setDate(iterableDate.getDate())).getDay() + 1
					}`,

					marginTop: '-10px',
					marginBottom: '-10px',
					paddingBottom: '15px',
					paddingTop: '15px',
				});
			}
		}

		styledData.push({
			...metaData,
			key: `${id}-${loopLength}`,
			storageId: generateDateId(finishingDate),
			width: '100%',
			gridRow: `${1}/${finishingDate.getHours() + 1}`,
			gridColumn: `${finishingDate.getDay() + 1}`,
			marginBottom: `${-finishingDate.getMinutes()}px`,
			marginTop: '-10px',
			paddingTop: '15px',
		});
		return styledData;
	}

	let marginBottomCalc = 0;
	if (
		finishingDate.getMinutes() !== 0 &&
		startingDate.getHours() === finishingDate.getHours()
	) {
		marginBottomCalc = 60 - finishingDate.getMinutes();
	} else if (
		finishingDate.getMinutes() !== 0 &&
		startingDate.getHours() !== finishingDate.getHours()
	) {
		marginBottomCalc = 0 - finishingDate.getMinutes();
	}

	return [
		{
			...metaData,
			key: `${id}`,
			storageId: generateDateId(startingDate),
			width: '100%',
			gridRow: `${startingDate.getHours() + 1}/${finishingDate.getHours() + 1}`,
			gridColumn: `${startingDate.getDay() + 1}`,
			marginTop: `${startingDate.getMinutes()}px`,
			marginBottom: `${marginBottomCalc}px`,
		},
	];
};

export const processEventDataByWeek = (currentWeeklyView, eventData) => {
	console.log(eventData);
	if (!eventData) {
		return;
	}
	const viewId = generateDateId(currentWeeklyView);

	const filteredData = eventData.filter(
		(event) =>
			event.startingDateId === viewId || event.finishingDateId === viewId
	);

	const filteredDataFixedTypes = filteredData.map((event) => {
		return {
			id: event.id,
			title: event.title,
			startingDateId: event.startingDateId,
			finishingDateId: event.finishingDateId,
			description: event.description,
			startingDate: new Date(event.startingDate),
			finishingDate: new Date(event.finishingDate),
		};
	});

	const styledData = filteredDataFixedTypes
		.map((event) => calculateStyles(event))
		.flat();

	return styledData.filter(
		(event) => event.storageId!.localeCompare(viewId) === 0
	);
};
