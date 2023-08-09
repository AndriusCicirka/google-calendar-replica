import React from 'react';
import './Placeholder.css';

interface Props {
	gridArea?: string;
}

const Placeholder: React.FC<Props> = (gridArea) => {
	return <div className={`element ${gridArea}`} />;
};

export default Placeholder;
