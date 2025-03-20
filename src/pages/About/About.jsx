

// ******************* styles *******************
import styles from "./About.module.css";

// ******************* hooks *******************
import useApp from "../../hooks/useApp";

// ******************* assets *******************
import Banner6 from "../../assets/Oralpeace6.png";
import Banner7 from "../../assets/Oralpeace7.png";
import Banner8 from "../../assets/Oralpeace8.png";
import Banner9 from "../../assets/Oralpeace9.png";
import Banner10 from "../../assets/Oralpeace10.png";

// ******************* components *******************
import Banner from "../../components/Carousel/Banner";
import Skeleton from '@mui/material/Skeleton';

const About = () => {
    const { advertisements, loading } = useApp();
    return (
        <div>
            {loading ? (
                <Skeleton variant="rounded" width={'100%'} height={420} />
            ) : (
                <Banner 
                    slides={advertisements}
                />
            )}
            <div className={styles.About}>
                <div className={styles.AboutContent}>
                    <h2 className={styles.heading}>Therbal MEXICO</h2>
                    <h3>Para toda tu familia, incluida tu mascota</h3>
                    <p>
                        <span>Therbal MEXICO</span> IPSUM ABEST YADA YADA
                    </p>
                    <p>
                        <span>EMPRESA MADRE</span>NI IDEA NI IDEA
                    </p>
                    <p>
                        YADA YADA YADA
                    </p>
                    <div>
                        <img src={Banner6} alt="banner6" />
                    </div>
                    <h2 className={`${styles.heading} ${styles.subheading}`}>EL TE</h2>
                    <p>
                        <span>NI IDEA</span> ESTA BIEN BUENO
                    </p>
                    <div>
                        <img src={Banner10} alt="banner10" />
                    </div>
                </div>

                <div>
                    <h2 className={styles.heading}>Colaboradores</h2>
                    <div className={styles.Awards}>
                        <div className={styles.AboutImg}>
                            <img src={Banner9} alt="Quality1" />
                        </div>
                        <div className={styles.AboutImg}>
                            <img src={Banner8} alt="Gaia" />
                        </div>
                        <div className={styles.AboutImg}>
                            <img src={Banner7} alt="Quality1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
