import React from 'react';
import styles from './CalendarTable.module.css';

import Event from '../Event/Event';
import { CalendarEventWithStyles } from 'types';
import {
	calculatePreffix,
	WEEK_LENGTH,
	HOURS_IN_DAY,
	TIME_MARKINGS,
} from 'utils';

interface Props {
	gridArea: string;
	currentWeeklyView: Date;
	showEventModal: boolean;
	eventList: CalendarEventWithStyles[];
	onTableClick: Function;
}

const tableCells = Array(WEEK_LENGTH * HOURS_IN_DAY).fill('');
const timeMarkings = Array(HOURS_IN_DAY - 1).fill('');

const CalendarTable: React.FC<Props> = (props) => {
	const tableClickHandler = (modalState: boolean) => {
		props.onTableClick(!modalState);
	};

	return (
		<div className={styles[props.gridArea]}>
			<div aria-hidden="true" className={styles.tableTime}>
				{timeMarkings.map((_, i) => (
					<span className={styles.timeMarker} key={i}>
						{TIME_MARKINGS[i]} {calculatePreffix(i)}
					</span>
				))}
			</div>
			<div
				className={styles.tableWrap}
				onClick={() => tableClickHandler(props.showEventModal)}
			>
				<div className={styles.table}>
					{props.eventList &&
						props.eventList.map((event) => {
							const {
								id,
								key,
								title,
								description,
								startingDate,
								finishingDate,
								extendsOverMultipleDays,
								width,
								gridRow,
								gridColumn,
								marginBottom,
								marginTop,
								paddingTop,
								paddingBottom,
							} = event;
							return (
								<Event
									id={id}
									key={key}
									title={title}
									description={description}
									startingDate={startingDate}
									finishingDate={finishingDate}
									extendsOverMultipleDays={extendsOverMultipleDays}
									width={width}
									gridRow={gridRow}
									gridColumn={gridColumn}
									marginBottom={marginBottom}
									marginTop={marginTop}
									paddingBottom={paddingBottom}
									paddingTop={paddingTop}
								/>
							);
						})}
				</div>
				<div className={styles.tableInvisible}>
					{tableCells.map((_, i) => (
						<div className={styles.tableCell} key={i}></div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CalendarTable;
