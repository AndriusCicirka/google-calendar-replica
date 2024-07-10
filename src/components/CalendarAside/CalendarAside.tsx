import React from 'react';

import styles from './CalendarAside.module.css'

import { calculatePreffix, DAYS_IN_WEEK, TIME_MARKINGS, HOURS_IN_DAY } from 'utils';

interface Props {
  gridArea: string;
	currentWeeklyView: Date;
  onViewChange: Function;
}

const CalendarAside: React.FC<Props> = ({gridArea, currentWeeklyView, onViewChange}) => {

const timeMarkings = Array(HOURS_IN_DAY - 1).fill('');
	const handleWeekNavigation = (
		direction: 'forward' | 'backward',
		currentDate: Date
	) => {
		const updatedDate =
			direction === 'forward'
				? new Date(currentDate.setDate(currentDate.getDate() + DAYS_IN_WEEK))
				: new Date(currentDate.setDate(currentDate.getDate() - DAYS_IN_WEEK));

		onViewChange(updatedDate);
	};

  return (
    <div className={styles[gridArea]}>			
			<div className={styles.headerMisc}>
				<div>
					<button
						className={styles.buttonWeek}
						onClick={() =>
							handleWeekNavigation('backward', currentWeeklyView)
						}
					>
						{'<'}
					</button>
					<button
						className={styles.buttonWeek}
						onClick={() =>
							handleWeekNavigation('forward', currentWeeklyView)
						}
					>
						{'>'}
					</button>
				</div>
				<span className={styles.headerTimezone}>GMT+03</span>
			</div>
					<div aria-hidden="true" className={styles.tableTime}>
				{timeMarkings.map((_, i) => (
					<span className={styles.timeMarker} key={i}>
						{TIME_MARKINGS[i]} {calculatePreffix(i)}
					</span>
				))}
			</div>
		</div>
  )
}

export default CalendarAside