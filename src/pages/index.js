import * as React from "react";

import Head from "next/head";
import Map from "../components/Map";

import styles from "../../styles/Home.module.css";

import data from "./uesData.json";

const DEFAULT_CENTER = [40.776924, -73.9571366];
const fillBlueOptions = { fillColor: "blue" };

export default function Home() {
  const [minSessions, setMinSessions] = React.useState(1);

  const maxSessions = Math.max(...data.map((d) => d.sessions));

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>UES Location</h1>
        <p>A snapshot of activity since Jan 1, 2022</p>

        <ul>
          <li>
            <label htmlFor="starting_score">Min Sessions: {minSessions}</label>
            <input
              type="range"
              id="starting_score"
              name="starting_score"
              min={1}
              max={maxSessions}
              value={minSessions}
              onChange={(e) => setMinSessions(parseInt(e.target.value))}
            />
          </li>
        </ul>

        <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
          {({ TileLayer, Circle, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {data

                .filter((d) => d && d.lat && d.long)
                .filter((d) => d.sessions >= minSessions)
                .map((d) => {
                  const { lat, long, ...details } = d;
                  return (
                    <Circle
                      center={[lat, long]}
                      pathOptions={fillBlueOptions}
                      radius={d.sessions}
                    >
                      <Popup>
                        <pre>{JSON.stringify(details, null, 2)}</pre>
                      </Popup>
                    </Circle>
                  );
                })}
              <Marker position={DEFAULT_CENTER}>
                <Popup>TCS UES</Popup>
              </Marker>
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
