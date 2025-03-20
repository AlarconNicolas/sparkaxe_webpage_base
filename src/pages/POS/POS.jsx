import {Link} from 'react-router-dom';
import styles from './POS.module.css';
import Accordion from '../../components/Accordion/Accordion';

const POS = () => {
    return ( 
        <div className={styles.POS}>
            <div className={styles.POSContent}>

           <Accordion />
           </div>
        </div>
     );
}
 
export default POS;