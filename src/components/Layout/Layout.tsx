import React from 'react';
import './Layout.css';

const Layout = (props) => {
	console.log(props.children);
	return (
		<div className="content-wrap">
			{props.children.map((element) => {
				return <div className={element.props.gridArea}>{element}</div>;
			})}
		</div>
	);
};

export default Layout;
