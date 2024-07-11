import styles from '../css/EventModal.module.css';

import React, { useState } from 'react';
import classnames from 'classnames';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { generateDateId, generateId } from 'utils';
import { CalendarEvent } from 'types';

interface Props {
	currentEventData: CalendarEvent[];
	closeModal: Function;
	onSubmit: Function;
}

const initialFormValues = {
	title: '',
	description: '',
	startingDate: '',
	startingTime: '',
	finishingTime: '',
	finishingDate: '',
};

const formValidationSchema = Yup.object()
	.shape({
		title: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required(),
		startingDate: Yup.string().required(),
		startingTime: Yup.string().required(),
		finishingTime: Yup.string().required(),
		finishingDate: Yup.string().required(),
	})
	.test(
		'date-time-check',
		'Starting time should be before ending time',
		(values) => {
			const combinedStartDate = new Date(
				`${values.startingDate}T${values.startingTime}`
			);
			const combinedFinishDate = new Date(
				`${values.finishingDate}T${values.finishingTime}`
			);

			return combinedStartDate < combinedFinishDate;
		}
	);

const EventModal: React.FC<Props> = (props) => {
	const formik = useFormik({
		initialValues: initialFormValues,
		validationSchema: formValidationSchema,
		onSubmit: (values) => {
			const {
				title,
				description,
				startingDate,
				startingTime,
				finishingTime,
				finishingDate,
			} = values;

			const combinedStartDate = new Date(`${startingDate}T${startingTime}`);
			const combinedFinishDate = new Date(`${finishingDate}T${finishingTime}`);

			const eventData = {
				id: generateId(),
				title,
				description,
				startingDate: combinedStartDate,
				finishingDate: combinedFinishDate,
				startingDateId: generateDateId(combinedStartDate),
				finishingDateId: generateDateId(combinedFinishDate),
			};

			props.onSubmit(eventData);
			props.closeModal();
		},
	});

	const [titleError, setTitleError] = useState(false);
	const [startingDateError, setStartingDateError] = useState(false);
	const [startingTimeError, setStartingTimeError] = useState(false);
	const [finishingDateError, setFinishingDateError] = useState(false);
	const [finishingTimeError, setFinishingTimeError] = useState(false);

	const inputMapping = {
		'event-title': 'title',
		'starting-date': 'startingDate',
		'starting-time': 'startingTime',
		'finishing-date': 'finishingDate',
		'finishing-time': 'finishingTime',
	};

	const handleClick = (event) => {
		formik.setFieldTouched(inputMapping[event.target.id]);
	};

	const handleBlur = (event) => {
		formik.handleBlur(event);

		formik.values.title.trim().length < 3
			? setTitleError(true)
			: setTitleError(false);
		!formik.values.startingDate && formik.touched.startingDate
			? setStartingDateError(true)
			: setStartingDateError(false);
		!formik.values.startingTime && formik.touched.startingTime
			? setStartingTimeError(true)
			: setStartingTimeError(false);
		!formik.values.finishingDate && formik.touched.finishingDate
			? setFinishingDateError(true)
			: setFinishingDateError(false);
		!formik.values.finishingTime && formik.touched.finishingTime
			? setFinishingTimeError(true)
			: setFinishingTimeError(false);
	};

	return (
		<form className={styles.modal} onSubmit={formik.handleSubmit}>
			<div className={styles.modalHeader}>
				<button
					className={styles.closeButton}
					aria-label="Close modal button"
					type="button"
					onClick={() => props.closeModal()}
				>
					X
				</button>
			</div>
			<div className={styles.eventCreationWrap}>
				<div className={styles.eventCreationInput}>
					<input
						type="text"
						name="title"
						aria-label="Add event title"
						placeholder="Add title"
						id="event-title"
						className={classnames(
							styles.mandatoryInput,
							titleError && styles.error
						)}
						value={formik.values.title}
						onClick={handleClick}
						onChange={formik.handleChange}
						onBlur={handleBlur}
					/>
				</div>
				<div className={styles.eventCreationTime}>
					<label htmlFor="starting-date" className="hide-visibility">
						Starting date
					</label>
					<input
						type="date"
						name="startingDate"
						id="starting-date"
						className={classnames(
							styles.mandatoryInput,
							startingDateError && styles.error
						)}
						value={formik.values.startingDate}
						onClick={handleClick}
						onChange={formik.handleChange}
						onBlur={handleBlur}
					/>
					<label htmlFor="starting-time" className="hide-visibility">
						Starting time
					</label>
					<input
						type="time"
						name="startingTime"
						id="starting-time"
						className={classnames(
							styles.mandatoryInput,
							startingTimeError && styles.error
						)}
						value={formik.values.startingTime}
						onClick={handleClick}
						onChange={formik.handleChange}
						onBlur={handleBlur}
					/>
					<div aria-label="until">-</div>
					<label htmlFor="finishing-time" className="hide-visibility">
						Finishing time
					</label>
					<input
						type="time"
						name="finishingTime"
						id="finishing-time"
						className={classnames(
							styles.mandatoryInput,
							finishingTimeError && styles.error
						)}
						value={formik.values.finishingTime}
						onClick={handleClick}
						onChange={formik.handleChange}
						onBlur={handleBlur}
					/>
					<label htmlFor="finishing-date" className="hide-visibility">
						Finishing date
					</label>
					<input
						type="date"
						name="finishingDate"
						id="finishing-date"
						className={classnames(
							styles.mandatoryInput,
							finishingDateError && styles.error
						)}
						value={formik.values.finishingDate}
						onClick={handleClick}
						onChange={formik.handleChange}
						onBlur={handleBlur}
					/>
				</div>
				<textarea
					name="description"
					id="event-description"
					className={styles.eventCreationDescription}
					placeholder="Description of the meeting"
					value={formik.values.description}
					onClick={handleClick}
					onChange={formik.handleChange}
					onBlur={handleBlur}
				></textarea>
				<div className={styles.eventCreationButtons}>
					<button type="submit" className={styles.saveButton}>
						Save
					</button>
				</div>
			</div>
		</form>
	);
};

export default EventModal;
