import styles from '../../css/Header.module.css';

interface Props {
	currentWeeklyView: Date;
}

const Header: React.FC<Props> = ({currentWeeklyView}) => {

  const date = currentWeeklyView.toLocaleDateString('default', { year: 'numeric', month: 'long' });

  return <header className={styles.header}>
    <h1 className={styles.date}>{date}</h1>
  </header>;
};

export default Header;
