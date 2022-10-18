import Head from "next/head";
import Map from "../components/Map";

import styles from "../../styles/Home.module.css";

import data from "./uesData.json";

const DEFAULT_CENTER = [40.776924, -73.9571366];
const fillBlueOptions = { fillColor: "blue" };

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>UES Location</h1>
        <p>A snapshot of activity since Jan 1, 2022</p>

        <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
          {({ TileLayer, Circle }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {data
                .filter((d) => d && d.lat && d.long)
                .map((d) => (
                  <Circle
                    center={[d.lat, d.long]}
                    pathOptions={fillBlueOptions}
                    radius={d.sessions}
                  />
                ))}
            </>
          )}
        </Map>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
