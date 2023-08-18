import React from 'react';
import styles from './EventModal.module.css';
import { useFormik } from 'formik';
import { generateDateId, generateId } from 'utils/utils';
import { appendData } from 'utils/apiHelper';
interface Props {
	closeModal: Function;
}

const EventModal: React.FC<Props> = (props): JSX.Element => {
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			startingDate: '',
			startingTime: '',
			finishingTime: '',
			finishingDate: '',
		},

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

			if (
				title.trim().length > 2 &&
				startingDate &&
				startingTime &&
				finishingTime &&
				finishingDate &&
				combinedStartDate <= combinedFinishDate
			) {
				const id = generateId();
				const startingDateId = generateDateId(combinedStartDate);
				const finishingDateId = generateDateId(combinedFinishDate);

				const eventData = {
					id,
					title,
					description,
					startingDate: combinedStartDate,
					finishingDate: combinedFinishDate,
					startingDateId,
					finishingDateId,
				};

				appendData('events', eventData);
				props.closeModal();
			}
		},
	});

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
						className={styles.mandatoryInput}
						value={formik.values.title}
						onChange={formik.handleChange}
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
						className={styles.mandatoryInput}
						value={formik.values.startingDate}
						onChange={formik.handleChange}
					/>
					<label htmlFor="starting-time" className="hide-visibility">
						Starting time
					</label>
					<input
						type="time"
						name="startingTime"
						id="starting-time"
						className={styles.mandatoryInput}
						value={formik.values.startingTime}
						onChange={formik.handleChange}
					/>
					<div aria-label="until">-</div>
					<label htmlFor="finishing-time" className="hide-visibility">
						Finishing time
					</label>
					<input
						type="time"
						name="finishingTime"
						id="finishing-time"
						className={styles.mandatoryInput}
						value={formik.values.finishingTime}
						onChange={formik.handleChange}
					/>
					<label htmlFor="finishing-date" className="hide-visibility">
						Finishing date
					</label>
					<input
						type="date"
						name="finishingDate"
						id="finishing-date"
						className={styles.mandatoryInput}
						value={formik.values.finishingDate}
						onChange={formik.handleChange}
					/>
				</div>
				<textarea
					name="description"
					id="event-description"
					className={styles.eventCreationDescription}
					placeholder="Description of the meeting"
					value={formik.values.description}
					onChange={formik.handleChange}
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
