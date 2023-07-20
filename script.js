'use strict';

const calendarTable = document.querySelector('.calendar-table');

const eventModal = document.querySelector('.event-creation--modal');
const eventModalCloseBtn = document.querySelector('.modal-close--button');

const eventBlobs = document.querySelectorAll('.calendar-event');

class Modal {
	constructor(modal, closeBtn, callbacks) {
		this.modal = modal;
		this.closeBtn = closeBtn;

		this.closeBtn.addEventListener('click', () => this.hide());
	}
	open(eventBlobId) {
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
	constructor(table, callbacks) {
		this.table = table.addEventListener('click', callbacks.onClick);
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

const calendar = new Calendar(calendarTable, {
	onClick() {
		modal.toggle();
	},
});

const event = new Event(eventBlobs, {});
