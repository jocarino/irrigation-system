import React, { Suspense } from "react";
import { database, db } from "../FireBase/Firebase";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { onValue, ref } from "firebase/database";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

type PlantData = {
  moisture: [{ [key: string]: number }];
  lastMoisture: { date: string; level: number };
};

const MainDashboard: React.FC = () => {
  const [plantData, setPlantData] = React.useState<{
    [key: string]: PlantData;
  }>({});
  const [plantHumidityHistory, setPlantHumdityHistory] = React.useState<{
    [plant: string]: {
      date: string;
      value: any;
    }[];
  }>({});

  const getPlantHumidity = async () => {
    const querySnapshot = await getDocs(collection(db, "humidity"));
    const plantHumidity = querySnapshot.docs.reduce((acc: any, cur) => {
      acc[cur.id] = Object.entries(cur.data()).map(([date, value]) => ({
        date: date,
        value: value,
      }));
      return acc;
    }, {});

    setPlantHumdityHistory(plantHumidity);
  };

  React.useEffect(() => {
    getPlantHumidity();
    const starCountRef = ref(database, "plant");
    onValue(
      starCountRef,
      (snapshot: any) => {
        const data = snapshot.val();
        setPlantData(data);
      },
      { onlyOnce: true }
    );
  }, []);

  return (
    <div className="p-6">
      <p className="font-bold">Test1</p>
      {Object.keys(plantData).length !== 0 &&
        Object.keys(plantData).map((plant: string) => (
          <div className="bg-green-600 rounded-md h-36 w-80 p-4 mt-2">
            <p key={plant + "-item"}>
              {plant}: {plantData?.[plant]?.lastMoisture.level}
            </p>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" },
                }}
                data={plantHumidityHistory[plant]
                  ?.slice(0, 10)
                  ?.map((plant) => ({ x: plant.date, y: plant.value }))}
              />
            </VictoryChart>
          </div>
        ))}
      <Suspense fallback={"Loading..."}>
        {JSON.stringify(plantHumidityHistory)}
      </Suspense>
    </div>
  );
};

export default MainDashboard;
