'use strict';

const calendarHeaderCells = document.querySelectorAll('.calendar-header--cell');
const calendarTable = document.querySelector('.calendar-table');

const eventModal = document.querySelector('.event-creation--modal');
const eventModalCloseBtn = document.querySelector('.modal-close--button');

const eventBlobs = document.querySelectorAll('.calendar-event');

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

class Calendar {
	constructor(table, calendarHeaderCells, callbacks) {
		this.today = new Date();
		this.headerCells = calendarHeaderCells;

		this.table = table.addEventListener('click', callbacks.onClick);
		this.initWeek(this.today);
	}
	getWeekdays(date) {
		if (!date) {
			date = this.today;
		}
		return Array(7)
			.fill()
			.map((_, index) =>
				new Date(date.setDate(date.getDate() - date.getDay() + index)).getDate()
			);
	}

	initWeek(date) {
		this.today = new Date();
		if (!date) {
			date = this.today;
		}
		this.week = this.getWeekdays(date);
		for (let [index, day] of this.headerCells.entries()) {
			day.children[1].textContent = this.week[index];
			if (this.week[index] === this.today.getDate()) {
				day.children[0].classList.add('current-day--letters');
				day.children[1].classList.add('current-day--number');
			}
		}
	}
}

class Event {
	constructor(eventBlobs, callbacks) {
		this.eventBlobs = eventBlobs;
	}
	generateId() {
		return Date.now();
	}
}

const modal = new Modal(eventModal, eventModalCloseBtn);

const calendar = new Calendar(calendarTable, calendarHeaderCells, {
	onClick() {
		modal.toggle();
	},
});

const event = new Event(eventBlobs, {});
