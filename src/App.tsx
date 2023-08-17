import React from 'react';
import './App.css';

import { useSelector } from 'react-redux';
import Header from 'components/Layout/Header';
import Layout from 'components/Layout/Layout';
import Placeholder from 'components/Layout/Placeholder';
import CalendarHeader from 'components/Calendar/CalendarHeader';
import CalendarTable from 'components/Calendar/CalendarTable';
import EventModal from 'components/Event/EventModal';
import { RootState } from 'store/store';

function App() {
	const modalToggle = useSelector((state: RootState) => state.modal);

	return (
		<>
			<Header />
			{modalToggle && <EventModal />}
			<Layout>
				<Placeholder gridArea="asideLeft" />
				<CalendarHeader gridArea="calendarHeader" />
				<CalendarTable gridArea="calendarWrap" />
				<Placeholder gridArea="asideRight" />
			</Layout>
		</>
	);
}

export default App;
