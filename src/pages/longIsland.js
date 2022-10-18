import * as React from "react";

import Head from "next/head";
import Map from "../components/Map";

import styles from "../../styles/Home.module.css";

import data from "./longIslandStudents.json";

const TEST_CENTERS = [
  { name: "Port Washington", position: [40.8302202, -73.6920002] },
  { name: "Syosset", position: [40.8238037, -73.5041074] },
];

const DEFAULT_CENTER = [40.82701195, -73.5980538];

const fillOptions = {
  online: { color: "green", fillColor: "green" },
  at_client: { color: "blue", fillColor: "blue" },
  pp_office: { color: "red", fillColor: "red" },
};

const LongIsland = () => {
  const [minLessons, setMinLessons] = React.useState(1);

  const maxLessons = Math.max(...data.map((d) => d.sessions));

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Long Island</h1>
        <p>A snapshot of active families since July 1, 2022</p>

        <ul>
          <li>
            <label htmlFor="min_lessons">Min Lessons: {minLessons}</label>
            <input
              type="range"
              id="min_lessons"
              name="min_lessons"
              min={1}
              max={maxLessons}
              value={minLessons}
              onChange={(e) => setMinLessons(parseInt(e.target.value))}
            />
          </li>
        </ul>

        <h4>Most Common Lesson Location</h4>
        <ul style={{ display: "flex", listStyle: "none", gap: "1rem" }}>
          {[
            ["Online", "green"],
            ["At Client", "blue"],
            ["PP Office", "red"],
          ].map(([name, color]) => (
            <li key={name}>
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: color,
                }}
              />
              {name}
            </li>
          ))}
        </ul>

        <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={10}>
          {({ TileLayer, Circle, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {data
                .filter((d) => d && d.lat && d.long)
                .filter((d) => d.lessons >= minLessons)
                .map((d) => {
                  const { lat, long, max_location, ...details } = d;
                  return (
                    <Circle
                      center={[lat, long]}
                      pathOptions={fillOptions[max_location]}
                      radius={d.lessons * 5}
                    >
                      <Popup>
                        <pre>{JSON.stringify(details, null, 2)}</pre>
                      </Popup>
                    </Circle>
                  );
                })}
              {TEST_CENTERS.map((testCenter) => (
                <Marker key={testCenter.name} position={testCenter.position}>
                  <Popup>{testCenter.name}</Popup>
                </Marker>
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
};

export default LongIsland;
