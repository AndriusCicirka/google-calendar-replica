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
