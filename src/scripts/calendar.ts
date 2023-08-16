const getToday = () => {
	return new Date();
};

const getWeekdays = (date: Date) => {
	return Array(7)
		.fill('')
		.map(
			(_, index) =>
				new Date(date.setDate(date.getDate() - (date.getDay() + index)))
		);
};

const initWeek = (date: Date) => {
	utils.getWeekOfYear(date);
	const week = getWeekdays(date);
	// for (let [index, day] of this.headerCells.entries()) {
	// 	day.children[1].textContent = this.week[index].getDate().toString();
	// 	if (
	// 		this.week[index].getFullYear() === this.today.getFullYear() &&
	// 		this.week[index].getMonth() === this.today.getMonth() &&
	// 		this.week[index].getDate() === this.today.getDate()
	// 	) {
	// 		day.children[0].classList.add('current-day--letters');
	// 		day.children[1].classList.add('current-day--number');
	// 	} else {
	// 		day.children[0].classList.remove('current-day--letters');
	// 		day.children[1].classList.remove('current-day--number');
	// 	}
	// }
};

const formatDateToDDMMYY = (date: Date) => {
	date = new Date(date);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${day}/${month}/${year}`;
};

module.exports = {
	getToday,
	getWeekdays,
	initWeek,
	formatDateToDDMMYY,
};
