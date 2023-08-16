import React from 'react';
import './EventModal.css';
import { useFormik } from 'formik';

const EventModal = (): JSX.Element => {
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
			console.log(values);
		},
	});

	return (
		<form className="event-creation--modal" onSubmit={formik.handleSubmit}>
			<div className="event-creation--modal--header">
				<button className="modal-close--button" aria-label="Close modal button">
					X
				</button>
			</div>
			<div className="event-creation--modal--wrap">
				<div className="event-creation--modal--input">
					<input
						type="text"
						name="name"
						aria-label="Add event title"
						placeholder="Add title"
						id="event-title"
						className="mandatory-input"
						value={formik.values.title}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="event-creation--modal--time">
					<label htmlFor="starting-date" className="hide-visibility">
						Starting date
					</label>
					<input
						type="date"
						name="startingDate"
						id="starting-date"
						className="mandatory-input"
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
						className="mandatory-input"
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
						className="mandatory-input"
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
						className="mandatory-input"
						value={formik.values.finishingDate}
						onChange={formik.handleChange}
					/>
				</div>
				<textarea
					name="description"
					id="event-description"
					className="event-creation--modal--description"
					placeholder="Description of the meeting"
					value={formik.values.description}
					onChange={formik.handleChange}
				></textarea>
				<div className="event-creation--modal--buttons">
					<button type="submit" className="modal-save--button">
						Save
					</button>
				</div>
			</div>
		</form>
	);
};

export default EventModal;
