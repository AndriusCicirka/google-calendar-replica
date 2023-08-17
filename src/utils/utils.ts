export const getToday = () => {
	return new Date();
};

export const getWeekdays = (date: Date) => {
	const startDate = new Date(date);
	return Array(7)
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

export const generateId = () => {
	return Date.now();
};

export const generateDateId = (date: Date) => {
	return `${getWeekOfYear(date)}/${date.getFullYear()}`;
};

export const getWeekOfYear = (date: string | Date) => {
	date = new Date(date);
	date.setHours(0, 0, 0, 0);
	const firstDayOfYear = new Date(date.getFullYear(), 0, 0);
	const firstSundayOffset = (7 - firstDayOfYear.getDay()) % 7;
	const firstSundayOfYear = new Date(Number(firstDayOfYear));
	firstSundayOfYear.setDate(firstDayOfYear.getDate() + firstSundayOffset);

	if (date < firstSundayOfYear) {
		return 1;
	}

	const daysSinceFirstSunday =
		(date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000);

	let weekNumber = Math.floor(daysSinceFirstSunday / 7) + 1;

	return weekNumber;
};
