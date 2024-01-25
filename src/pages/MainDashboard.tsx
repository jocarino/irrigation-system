import { onValue, ref } from 'firebase/database';
import React from 'react';
import { database } from '../FireBase/Firebase';

type PlantData =
    { moisture: [{ [key: string]: number }], lastMoisture: { date: string, level: number } }


const MainDashboard: React.FC = () => {
    const [plantData, setPlantData] = React.useState<{ [key: string]: PlantData }>({})

    React.useEffect(() => {
        const starCountRef = ref(database, 'plant')
        onValue(starCountRef, (snapshot: any) => {
            const data = snapshot.val();
            setPlantData(data);
            console.log(data);

        }, { onlyOnce: true });
    }, [])


    return (
        <>
            <p>Test1</p>
            {Object.keys(plantData).length !== 0 && Object.keys(plantData).map((plant: string) => <p key={plant + '-item'}>{plant}: {plantData?.[plant]?.lastMoisture.level}</p>)}
        </>
    );
};

export default MainDashboard;
