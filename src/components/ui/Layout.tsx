import styles from '../../css/Layout.module.css';

import React from 'react';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className={styles.container}>
      {childrenArray.map((element) => {
        return element;
      })}
    </div>
  );
};

export default Layout;
