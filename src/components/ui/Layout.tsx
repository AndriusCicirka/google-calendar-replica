import styles from '../../css/Layout.module.css';

import React from 'react';

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const childrenArray = React.Children.toArray(props.children);
  return (
    <div className={styles.container}>
      {childrenArray.map((element) => {
        return element;
      })}
    </div>
  );
};

export default Layout;
