import React from 'react';
import './App.css';

import { useSelector } from 'react-redux';
import Header from 'components/Calendar/UI/Header';
import Layout from 'components/Layout/Layout';
import Placeholder from 'components/Layout/Placeholder';
import CalendarHeader from 'components/Calendar/UI/CalendarHeader';
import CalendarTable from 'components/Calendar/UI/CalendarTable';
import EventModal from 'components/Calendar/UI/EventModal';
import { RootState } from 'store';

function App() {
	const modalToggle = useSelector((state: RootState) => state.modal);

	return (
		<>
			<Header />
			{modalToggle && <EventModal />}
			<Layout>
				<Placeholder gridArea="aside-left" />
				<CalendarHeader gridArea="calendar-header" />
				<CalendarTable gridArea="calendar-wrap" />
				<Placeholder gridArea="aside-right" />
			</Layout>
		</>
	);
}

export default App;
