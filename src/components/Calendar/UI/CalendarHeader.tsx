import React from 'react';
import './CalendarHeader.css';

interface Props {
	gridArea?: string;
}

const CalendarHeader: React.FC<Props> = () => {
	return <div className="header-wrap" />;
};

export default CalendarHeader;
