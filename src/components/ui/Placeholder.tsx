import styles from '../../css/Placeholder.module.css';

interface Props {
	gridArea?: string;
}

const Placeholder: React.FC<Props> = (props) => {
  return <div className={`${styles.container} ${props.gridArea}`} />;
};

export default Placeholder;
