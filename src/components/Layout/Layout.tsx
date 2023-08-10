import React, { ReactNode } from 'react';
import './Layout.css';

interface Props {
	children?: ReactNode;
}

const Layout: React.FC<Props> = (props): JSX.Element => {
	return (
		<div className="content-wrap">
			{props.children &&
				React.Children.map(
					props.children,
					(element, index: number): ReactNode => {
						if (React.isValidElement(element)) {
							return (
								<div className={element.props.gridArea} key={index}>
									{element}
								</div>
							);
						} else {
							throw new Error(
								'Layout module had problems loading page elements'
							);
						}
					}
				)}
		</div>
	);
};

export default Layout;
