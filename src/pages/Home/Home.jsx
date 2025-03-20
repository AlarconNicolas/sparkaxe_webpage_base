import { useState } from "react";

// ****************** styles ******************
import styles from "./Home.module.css";

// ****************** hooks ******************
import useApp from "../../hooks/useApp";

// ************ components ************
import Searchbar from "../../components/Searchbar/Searchbar";
import MainProductGrid from "../../components/MainProductGrid/MainProductGrid";
import Banner from "../../components/Carousel/Banner";
import AboutPetsHome from "../../components/AboutPetsHome/AboutPetsHome";
import AboutHome from "../../components/AboutHome/AboutHome";
import Skeleton from "@mui/material/Skeleton";

function Home() {
  const { advertisements, loading } = useApp();
  return (
    <div>
      {loading ? (
        <Skeleton variant="rounded" width={"100%"} height={420} />
      ) : (
        <Banner slides={advertisements} />
      )}
      <Searchbar />
      <h2 className={styles.heading}>Productos Más Vendidos</h2>
      <MainProductGrid />
      <AboutPetsHome />
      <AboutHome />
    </div>
  );
}

export default Home;
