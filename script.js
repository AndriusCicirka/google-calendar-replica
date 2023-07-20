'use strict';

const calendarTableWrap = document.querySelector('.calendar-table--wrap');
const calendarTableEvent = document.querySelector('.calendar-table');
const eventModal = document.querySelector('.event-creation--modal');

class Modal {
	constructor(modal, callbacks) {
		this.modal = modal;
	}
	open() {
		this.modal.classList.remove('hide');
	}
	hide() {
		this.modal.classList.add('hide');
	}
	toggle() {
		this.modal.classList.toggle('hide');
	}
}

class Calendar {
	constructor(callbacks) {
		calendarTableWrap.addEventListener('click', callbacks.onClick);
	}
}

const modal = new Modal(eventModal);

const calendar = new Calendar({
	onClick() {
		modal.toggle(eventModal);
	},
});
