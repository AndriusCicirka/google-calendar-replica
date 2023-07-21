'use strict';

const calendarHeaderCells = document.querySelectorAll('.calendar-header--cell');
const calendarTable = document.querySelector('.calendar-table');

const eventModal = document.querySelector('.event-creation--modal');
const eventModalCloseBtn = document.querySelector('.modal-close--button');

const eventBlobs = document.querySelectorAll('.calendar-event');

/*
 *
 *
 *
 *
 */

class Modal {
	constructor(modal, closeBtn, callbacks) {
		this.modal = modal;
		this.closeBtn = closeBtn;

		this.closeBtn.addEventListener('click', (event) => this.hide(event));
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
}

/*
 */

class Calendar {
	constructor(table, calendarHeaderCells, callbacks) {
		this.today = new Date();
		this.headerCells = calendarHeaderCells;

		this.table = table.addEventListener('click', callbacks.onClick);
		this.initWeek(this.today);
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
		this.getWeekOfYear(this.today);
		this.week = this.getWeekdays(date);
		for (let [index, day] of this.headerCells.entries()) {
			day.children[1].textContent = this.week[index];
			if (this.week[index] === this.today.getDate()) {
				day.children[0].classList.add('current-day--letters');
				day.children[1].classList.add('current-day--number');
			}
		}
	}

	getWeekOfYear(date = this.today) {
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

/*
 */

class Event {
	constructor(eventBlobs, callbacks) {
		this.eventBlobs = eventBlobs;
	}
	generateId() {
		return Date.now();
	}
}

class Storage {
	constructor() {}
}

/*
 *
 *
 *
 *
 */

const modal = new Modal(eventModal, eventModalCloseBtn);

const calendar = new Calendar(calendarTable, calendarHeaderCells, {
	onClick() {
		modal.toggle();
	},
});

const event = new Event(eventBlobs, {});
