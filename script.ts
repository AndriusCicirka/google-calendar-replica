'use strict';

const calendarHeaderCells: NodeListOf<HTMLElement> = document.querySelectorAll(
	'.calendar-header--cell'
)!;
const calendarTable = document.querySelector<HTMLElement>('.calendar-table')!;
const weekBackBtn =
	document.querySelector<HTMLButtonElement>('button-week--back');
const weekForwardBtn = document.querySelector<HTMLButtonElement>(
	'.button-week--forward'
);
const eventModal = document.querySelector<HTMLElement>(
	'.event-creation--modal'
);
const eventModalCloseBtn = document.querySelector<HTMLButtonElement>(
	'.modal-close--button'
);
const eventModalSaveBtn = document.querySelector<HTMLButtonElement>(
	'.modal-save--button'
);
const eventBlobs = document.querySelectorAll<HTMLElement>('.calendar-event');
const mandatoryInputs =
	document.querySelectorAll<HTMLInputElement>('.mandatory-input');

class Utils {
	constructor() {}

	generateId() {
		return Date.now();
	}

	generateDateId(date: Date = new Date()) {
		return `${this.getWeekOfYear(date)}/${new Date(date).getFullYear()}`;
	}

	getWeekOfYear(date: Date = new Date()) {
		const copyDate = new Date(date);
		copyDate.setHours(0, 0, 0, 0);
		const firstDayOfYear = new Date(copyDate.getFullYear(), 0, 0);
		const firstSundayOffset = (7 - firstDayOfYear.getDay()) % 7;
		const firstSundayOfYear = new Date(firstDayOfYear);
		firstSundayOfYear.setDate(firstDayOfYear.getDate() + firstSundayOffset);

		if (copyDate < firstSundayOfYear) {
			return 1;
		}

		const daysSinceFirstSunday =
			(copyDate.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000);

		let weekNumber = Math.floor(daysSinceFirstSunday / 7) + 1;

		return weekNumber;
	}
}

class Modal {
	modal: HTMLElement;
	closeBtn: HTMLElement;
	saveBtn: HTMLElement;

	constructor(modal: HTMLElement, closeBtn: HTMLElement, saveBtn: HTMLElement) {
		this.modal = modal;
		this.closeBtn = closeBtn;
		this.saveBtn = saveBtn;

		this.modal.addEventListener('submit', (event: Event) =>
			this.onSubmit(event)
		);
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
	onSubmit(event: Event) {
		event.preventDefault();

		let title = (
			document.getElementById('event-title') as HTMLInputElement
		).value.trim();
		let description = (
			document.getElementById('event-description') as HTMLInputElement
		).value.trim();
		let startingDate = (
			document.getElementById('starting-date') as HTMLInputElement
		).value;
		let startingTime = (
			document.getElementById('starting-time') as HTMLInputElement
		).value;
		let finishingTime = (
			document.getElementById('finishing-time') as HTMLInputElement
		).value;
		let finishingDate = (
			document.getElementById('finishing-date') as HTMLInputElement
		).value;

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
			calendar.getModalData(title, description, combinedStart, combinedFinish);
			(this.modal as HTMLFormElement).reset();
			this.hide();
			setTimeout(() => {
				storage.getData().then((data: StyledData[]) => {
					calendar.renderEvents(
						data,
						utils.generateDateId(calendar.currentView)
					);
				});
			}, 100);
		} else {
			for (const input of mandatoryInputs) {
				if (input instanceof HTMLInputElement) {
					if (!input.value) {
						input.style.color = 'red';
					} else {
						input.style.color = 'black';
					}
				}
			}
		}
	}
}

class CalendarStorage {
	constructor() {}

	async setData(data: Object) {
		let prevData = await this.getData();
		if (prevData === null) {
			prevData = [];
		}
		localStorage.setItem('events', JSON.stringify([...prevData, data]));
	}

	async getData() {
		const data = await Promise.resolve(localStorage.getItem('events'));
		if (data) {
			return JSON.parse(data);
		}
	}
}

interface Data {
	title: string;
	id?: string;
	storageId?: string;
	description?: string;
	startingDate: Date;
	finishingDate: Date;
	startingDateId?: string;
	finishingDateId?: string;
}

interface StyledData extends Data {
	blobId?: string;
	width?: string;
	gridRow?: string;
	gridColumn?: string;
	marginTop?: string;
	marginBottom?: string;
	paddingBottom?: string;
	paddingTop?: string;
	overlapping?: boolean;
}

class Calendar {
	today: Date;
	currentView: Date;
	week: Date[] = [];
	headerCells;
	table;
	weekBackButton;
	weekForwardButton;

	constructor(
		table: HTMLElement,
		calendarHeaderCells: NodeListOf<HTMLElement>,
		callbacks: Record<string, Function>
	) {
		this.today = this.getToday();
		this.currentView = this.today;
		this.headerCells = calendarHeaderCells;

		this.table = table.addEventListener('click', callbacks.onClick());
		this.initWeek(this.today);
		storage.getData().then((data: Array<Data>) => {
			this.renderEvents(data);
		});

		this.weekBackButton = weekBackBtn?.addEventListener('click', () => {
			this.currentView = new Date(
				this.currentView.setDate(this.currentView.getDate() - 7)
			);
			this.initWeek(this.currentView);
			storage.getData().then((data: Data[]) => {
				this.renderEvents(data, utils.generateDateId(this.currentView));
			});
		});

		this.weekForwardButton = weekForwardBtn?.addEventListener('click', () => {
			this.currentView = new Date(
				this.currentView.setDate(this.currentView.getDate() + 7)
			);
			this.initWeek(this.currentView);
			storage.getData().then((data: Data[]) => {
				this.renderEvents(data, utils.generateDateId(this.currentView));
			});
		});
	}

	getToday() {
		return new Date();
	}

	getWeekdays(date = this.today) {
		return Array(7)
			.fill('')
			.map(
				(_, index) =>
					new Date(date.setDate(date.getDate() - date.getDay() + index))
			);
	}

	initWeek(date = this.today) {
		this.today = new Date();
		utils.getWeekOfYear(this.today);
		this.week = this.getWeekdays(date);
		for (let [index, day] of this.headerCells.entries()) {
			day.children[1].textContent = this.week[index].getDate().toString();
			if (
				this.week[index].getFullYear() === this.today.getFullYear() &&
				this.week[index].getMonth() === this.today.getMonth() &&
				this.week[index].getDate() === this.today.getDate()
			) {
				day.children[0].classList.add('current-day--letters');
				day.children[1].classList.add('current-day--number');
			} else {
				day.children[0].classList.remove('current-day--letters');
				day.children[1].classList.remove('current-day--number');
			}
		}
	}

	formatDateToDDMMYY(date: Date) {
		const year = new Date(date).getFullYear();
		const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
		const day = String(new Date(date).getDate()).padStart(2, '0');

		return `${day}/${month}/${year}`;
	}

	getModalData(
		title: string,
		description: string,
		startingDate: Date,
		finishingDate: Date
	) {
		setTimeout(() => {
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
		}, 100);
	}

	calculateStyles(data: Data) {
		console.log(data);
		const overlapping =
			this.formatDateToDDMMYY(data.startingDate) !==
			this.formatDateToDDMMYY(data.finishingDate);
		const metaData = {
			title: data.title,
			description: data.description,
			startingDate: data.startingDate,
			finishingDate: data.finishingDate,
			overlapping,
		};

		if (overlapping) {
			const blobArray = [];
			const loopLength = Math.floor(
				(data.finishingDate.getTime() - data.startingDate.getTime()) /
					(3600 * 24 * 1000)
			);

			let iterableDate = new Date(data.startingDate);

			console.log(data);

			blobArray.push({
				...metaData,
				id: data.id,
				blobId: `${data.id}-0`,
				storageId: utils.generateDateId(data.startingDate),
				width: '100%',
				gridRow: `${new Date(data.startingDate).getHours() + 1}/${25}`,
				gridColumn: `${new Date(data.startingDate).getDay() + 1}`,
				marginTop: `${new Date(data.startingDate).getMinutes()}px`,
				marginBottom: '-10px',
				paddingBottom: '15px',
			});

			if (loopLength > 2) {
				for (let i = 1; i < loopLength; i++) {
					blobArray.push({
						...metaData,
						id: data.id,
						blobId: `${data.id}-${i}`,
						storageId: utils.generateDateId(
							new Date(iterableDate.setDate(iterableDate.getDate() + 1))
						),
						width: '100%',
						gridRow: `${1}/${25}`,
						gridColumn: new Date(
							iterableDate.setDate(iterableDate.getDate())
						).getDay(),

						marginTop: '-10px',
						marginBottom: '-10px',
						paddingBottom: '15px',
						paddingTop: '15px',
					});
				}
			}
			blobArray.push({
				...metaData,
				id: data.id,
				blobId: `${data.id}-${loopLength}`,
				storageId: utils.generateDateId(data.finishingDate),
				width: '100%',
				gridRow: `${1}/${new Date(data.finishingDate).getHours() + 1}`,
				gridColumn: `${new Date(data.finishingDate).getDay() + 1}`,
				marginBottom: `${-new Date(data.finishingDate).getMinutes()}px`,
				marginTop: '-10px',
				paddingTop: '15px',
			});

			//console.log(blobArray);
			return [...blobArray];
		} else {
			return [
				{
					...metaData,
					id: data.id,
					blobId: `${data.id}`,
					storageId: utils.generateDateId(data.startingDate),
					width: '100%',
					gridRow: `${new Date(data.startingDate).getHours() + 1}/${
						new Date(data.finishingDate).getHours() + 1
					}`,
					gridColumn: `${new Date(data.startingDate).getDay() + 1}`,
					marginTop: `${new Date(data.startingDate).getMinutes()}px`,
					marginBottom: `${-new Date(data.finishingDate).getMinutes()}px`,
				},
			];
		}
	}

	renderEvents(
		data: Array<Data>,
		dateId = utils.generateDateId(this.getToday())
	) {
		calendarTable!.innerHTML = '';

		if (data) {
			console.log(data);
			data = data.filter(
				(event) =>
					event.startingDateId === dateId || event.finishingDateId === dateId
			);
			data = data.map((event) => this.calculateStyles(event)).flat();
			data = data.filter((blob) => {
				return blob.storageId!.localeCompare(dateId) === 0;
			});

			data.map((blob: StyledData) => {
				console.log(blob);
				calendarTable!.insertAdjacentHTML(
					'beforeend',
					`<div class="calendar-event ${blob.blobId}">
							<span class="calendar-event--title">${blob.title},</span>
							<span class="calendar-event--time">${
								blob.overlapping
									? `${new Date(blob.startingDate).toLocaleString('en-US', {
											month: 'short',
									  })} ${new Date(blob.startingDate).getDate()}, `
									: ''
							}${String(new Date(blob.startingDate).getHours()).padStart(
						2,
						'0'
					)}:${String(new Date(blob.startingDate).getMinutes()).padStart(
						2,
						'0'
					)} - ${String(new Date(blob.finishingDate).getHours()).padStart(
						2,
						'0'
					)}:${String(new Date(blob.finishingDate).getMinutes()).padStart(
						2,
						'0'
					)}${
						blob.overlapping
							? `, ${new Date(blob.finishingDate).toLocaleString('en-US', {
									month: 'short',
							  })} ${new Date(blob.finishingDate).getDate()}`
							: ''
					} </span>
							<p class="calendar-event--description">
								${blob.description}
							</p>
					</div>`
				);

				let temp = calendarTable.lastElementChild;

				if (temp) {
					if (blob.gridColumn) {
						(temp as HTMLDivElement).style.gridColumn = blob.gridColumn;
					}
					if (blob.gridRow) {
						(temp as HTMLDivElement).style.gridRow = blob.gridRow;
					}
					if (blob.marginTop) {
						(temp as HTMLDivElement).style.marginTop = blob.marginTop;
					}
					if (blob.marginBottom) {
						(temp as HTMLDivElement).style.marginBottom = blob.marginBottom;
					}
					if (blob.paddingTop) {
						(temp as HTMLDivElement).style.paddingTop = blob.paddingTop;
					}
					if (blob.paddingBottom) {
						(temp as HTMLDivElement).style.paddingBottom = blob.paddingBottom;
					}
				}
			});
		}
	}
}

const utils = new Utils();

const modal = new Modal(
	eventModal as HTMLElement,
	eventModalCloseBtn as HTMLButtonElement,
	eventModalSaveBtn as HTMLButtonElement
);

const storage = new CalendarStorage();

const calendar = new Calendar(
	calendarTable as HTMLElement,
	calendarHeaderCells,
	{
		onClick() {
			modal.toggle();
		},
	}
);
