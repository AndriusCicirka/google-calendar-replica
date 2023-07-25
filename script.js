'use strict';

const calendarHeaderCells = document.querySelectorAll('.calendar-header--cell');
const calendarTable = document.querySelector('.calendar-table');

const eventModal = document.querySelector('.event-creation--modal');
const eventModalCloseBtn = document.querySelector('.modal-close--button');
const eventModalSaveBtn = document.querySelector('.modal-save--button');

const eventBlobs = document.querySelectorAll('.calendar-event');

/*
 *
 *
 *
 *
 */

class Utils {
	constructor() {}

	generateId() {
		return Date.now();
	}

	generateDateId(date = new Date()) {
		return `${this.getWeekOfYear(date)}/${date.getFullYear()}`;
	}

	getWeekOfYear(date = new Date()) {
		const copyDate = new Date(date);
		copyDate.setHours(0, 0, 0, 0);
		const firstDayOfYear = new Date(copyDate.getFullYear(), 0, 1);
		const daysSinceFirstSunday =
			(copyDate - firstDayOfYear) / (24 * 60 * 60 * 1000);

		// Adjust week number if January 1st is not a Sunday
		let weekNumber = Math.floor(daysSinceFirstSunday / 7) + 1;
		if (firstDayOfYear.getDay() !== 0) {
			weekNumber--;
		}

		return weekNumber;
	}
}

class Modal {
	constructor(modal, closeBtn, saveBtn, callbacks) {
		this.modal = modal;
		this.closeBtn = closeBtn;
		this.saveBtn = saveBtn;

		this.modal.addEventListener('submit', (event) => this.onSubmit(event));
		this.closeBtn.addEventListener('click', (event) => this.hide(event));
		this.saveBtn.addEventListener('submit', (event) => event.preventDefault());
	}
	open(eventBlobId) {
		this.modal.classList.remove('hide');
	}
	hide(event) {
		event.preventDefault();
		this.modal.classList.add('hide');
	}
	toggle() {
		this.modal.classList.toggle('hide');
	}
	onSubmit(event) {
		event.preventDefault();
		let title = document.getElementById('event-title').value.trim();
		let description = document.getElementById('event-description').value.trim();

		let startingDate = document.getElementById('starting-date').value;
		let startingTime = document.getElementById('starting-time').value;
		let finishingTime = document.getElementById('finishing-time').value;
		let finishingDate = document.getElementById('finishing-date').value;

		const combinedStart = new Date(`${startingDate}T${startingTime}`);
		const combinedFinish = new Date(`${finishingDate}T${finishingTime}`);

		if (
			title.length > 2 &&
			startingDate &&
			startingTime &&
			finishingTime &&
			finishingDate &&
			combinedStart <= combinedFinish
		) {
			console.log('pog');
			calendar.getModalData(title, description, combinedStart, combinedFinish);
			//this.modal.reset();
			//this.hide();
		} else {
			console.log('unpog');
		}
	}
}

/*
 */

class Storage {
	constructor() {
		this.getData().then((data) => {
			if (!data) {
				this.setData([]);
			}
		});

		console.log(utils.generateDateId());
	}

	setData(data) {
		localStorage.setItem('events', JSON.stringify([this.getData(), data]));
	}

	async getData() {
		return JSON.parse(localStorage.getItem('events'));
	}
}

/*
 */

class Calendar {
	constructor(table, calendarHeaderCells, callbacks) {
		this.today = this.getToday();
		this.headerCells = calendarHeaderCells;

		this.table = table.addEventListener('click', callbacks.onClick);
		this.initWeek(this.today);
		this.renderEvents();
	}

	getToday() {
		return new Date();
	}

	getWeekdays(date = this.today) {
		return Array(7)
			.fill()
			.map((_, index) =>
				new Date(date.setDate(date.getDate() - date.getDay() + index)).getDate()
			);
	}

	initWeek(date = this.today) {
		this.today = new Date();
		utils.getWeekOfYear(this.today);
		this.week = this.getWeekdays(date);
		for (let [index, day] of this.headerCells.entries()) {
			day.children[1].textContent = this.week[index];
			if (this.week[index] === this.today.getDate()) {
				day.children[0].classList.add('current-day--letters');
				day.children[1].classList.add('current-day--number');
			}
		}
	}

	formatDateToDDMMYY(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${day}/${month}/${year}`;
	}

	/*
	 */

	getModalData(title, description, startingDate, finishingDate) {
		const id = utils.generateId();
		storage.setData({
			id,
			title,
			description,
			startingDateId: utils.generateDateId(startingDate),
			finishingDateId: utils.generateDateId(finishingDate),
			startingDate: startingDate,
			finishingDate: finishingDate,
		});
	}

	calculateStyles(data) {
		if (
			this.formatDateToDDMMYY(startingDate) !==
			this.formatDateToDDMMYY(finishingDate)
		) {
			const blobArray = [];
			const loopLength = Math.floor(
				(data.finishingDate - data.startingDate) / (3600 * 24 * 1000)
			);

			let iterableDate = data.startingDate;

			blobArray.push({
				id: data.id,
				blobId: `${data.id}-0`,
				storageId: utils.generateDateId(data.startingDate),
				width: '100%',
				gridRow: `${data.startingDate.getHours() - 1}/${24}`,
				gridColumn: `${data.startingDate.getDay()}`,
				marginTop: `${data.startingDate.getMinutes()}px`,
				paddingBottom: '25px',
			});

			if (loopLength > 2) {
				for (let i = 1; i < loopLength; i++) {
					blobArray.push({
						id: data.id,
						blobId: `${data.id}-${i}`,
						storageId: utils.generateDateId(
							new Date(iterableDate.setDate(iterableDate.getDate() + 1))
						),
						width: '100%',
						gridRow: `${0}/${24}`,
						gridColumn: (date = data.startingDate, i = i) => {
							let temp = date;
							return temp.setDate(temp.getDate() + i).getDay();
						},
						paddingBottom: '25px',
						paddingTop: '25px',
					});
				}
			}
			blobArray.push({
				id: data.id,
				blobId: `${data.id}-${loopLength}`,
				storageId: utils.generateDateId(data.finishingDate),
				width: '100%',
				gridRow: `${0}/${data.finishingDate.getHours()}`,
				gridColumn: `${data.finishingDate.getDay()}`,
				marginBottom: `${-(60 - data.finishingDate.getMinutes())}px`,
				paddingTop: '25px',
			});

			console.log(blobArray);
			return blobArray;
		} else {
			return {
				id: data.id,
				storageId: storage.idByDate(data.startingDate),
				width: '100%',
				gridRow: `${
					data.startingDate.getHours() - 1
				}/${data.finishingDate.getHours()}`,
				gridColumn: `${data.startingDate.getDay()}`,
				marginTop: `${data.startingDate.getMinutes()}px`,
				marginBottom: `${-(60 - data.finishingDate.getMinutes())}px`,
			};
		}
	}

	renderEvents(dateId = utils.generateDateId(this.getToday())) {
		let data = storage.getData().then((data) => {
			if (data) {
				console.log(data);
			}
		});
	}
}

/*
 *
 *
 *
 *
 */

const utils = new Utils();

const modal = new Modal(eventModal, eventModalCloseBtn, eventModalSaveBtn);

const storage = new Storage();

const calendar = new Calendar(calendarTable, calendarHeaderCells, {
	onClick() {
		modal.toggle();
	},
});
