'use strict';

const calendarTableWrap = document.querySelector('.calendar-table--wrap');
const calendarTableEvent = document.querySelector('.calendar-table');

const eventModal = document.querySelector('.event-creation--modal');

class Modal {
	constructor(callbacks) {}
	open() {
		eventModal.classList.remove('hide');
	}
	hide() {
		eventModal.classList.add('hide');
	}
	toggle() {
		eventModal.classList.toggle('hide');
	}
}

class Calendar {
	constructor(callbacks) {
		calendarTableWrap.addEventListener('click', callbacks.onClick);
	}
}

const modal = new Modal();

const calendar = new Calendar({
	onClick() {
		modal.toggle();
	},
});
