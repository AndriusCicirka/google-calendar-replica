'use strict';

const calendarTableWrap = document.querySelector('.calendar-table--wrap');
const calendarTableEvent = document.querySelector('.calendar-table');

const eventModal = document.querySelector('.event-creation--modal');
const eventModalCloseBtn = document.querySelector('.modal-close--button');

class Modal {
	constructor(modal, closeBtn, callbacks) {
		this.modal = modal;
		this.closeBtn = closeBtn;

		this.closeBtn.addEventListener('click', () => this.hide());
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

const modal = new Modal(eventModal, eventModalCloseBtn);

const calendar = new Calendar({
	onClick() {
		modal.toggle(eventModal);
	},
});
