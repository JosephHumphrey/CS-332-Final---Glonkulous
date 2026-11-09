import styles from './Button.module.css';

function Button() {

    let count = 1;

    return(
        <button className={styles.button}>{count}</button>
    );
}
export default Button