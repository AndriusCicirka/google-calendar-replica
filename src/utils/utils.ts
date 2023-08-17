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

export const calculateStyles = (event: Data) => {
	const overlapping =
		formatDateToDDMMYY(event.startingDate) !==
		formatDateToDDMMYY(event.finishingDate);

	event.startingDate = new Date(event.startingDate);
	event.finishingDate = new Date(event.finishingDate);

	const { id, title, description, startingDate, finishingDate } = event;

	const metaData = {
		id,
		title,
		description,
		startingDate,
		finishingDate,
		overlapping,
	};

	const MS_IN_SECOND = 1000;
	const SECONDS_IN_HOUR = 3600;
	const HOURS_IN_DAY = 24;

	if (overlapping) {
		const styledData: any = [];
		const loopLength = Math.floor(
			(new Date(event.finishingDate).getTime() -
				new Date(event.startingDate).getTime()) /
				(SECONDS_IN_HOUR * HOURS_IN_DAY * MS_IN_SECOND)
		);

		let iterableDate = event.startingDate;

		styledData.push({
			...metaData,
			id,
			blobId: `${id}-0`,
			storageId: generateDateId(event.startingDate),
			width: '100%',
			gridRow: `${startingDate.getHours() + 1}/${25}`,
			gridColumn: `${startingDate.getDay() + 1}`,
			marginTop: `${startingDate.getMinutes()}px`,
			marginBottom: '-10px',
			paddingBottom: '15px',
		});

		if (loopLength > 2) {
			for (let i = 1; i < loopLength; i++) {
				styledData.push({
					...metaData,
					id,
					blobId: `${id}-${i}`,
					storageId: generateDateId(
						new Date(iterableDate.setDate(iterableDate.getDate() + 1))
					),
					width: '100%',
					gridRow: `${1}/${25}`,
					gridColumn: `${new Date(
						iterableDate.setDate(iterableDate.getDate())
					).getDay()}`,

					marginTop: '-10px',
					marginBottom: '-10px',
					paddingBottom: '15px',
					paddingTop: '15px',
				});
			}
		}

		styledData.push({
			...metaData,
			id: id,
			blobId: `${id}-${loopLength}`,
			storageId: generateDateId(finishingDate),
			width: '100%',
			gridRow: `${1}/${finishingDate.getHours() + 1}`,
			gridColumn: `${finishingDate.getDay() + 1}`,
			marginBottom: `${-finishingDate.getMinutes()}px`,
			marginTop: '-10px',
			paddingTop: '15px',
		});

		//console.log(blobArray);
		return [...styledData];
	} else {
		return [
			{
				...metaData,
				id,
				blobId: `${id}`,
				storageId: generateDateId(startingDate),
				width: '100%',
				gridRow: `${startingDate.getHours() + 1}/${
					finishingDate.getHours() + 1
				}`,
				gridColumn: `${startingDate.getDay() + 1}`,
				marginTop: `${startingDate.getMinutes()}px`,
				marginBottom: `${-finishingDate.getMinutes()}px`,
			},
		];
	}
};
