import { useEffect, type FC } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useProvider } from "../provider/AppProvider";
import { formatNumber } from "../utils/formatNumber";
import Rank from "../assets/rank.png";
import SpinWheel from "../components/SpinWheel";


const Spin = () => {
    const handleSpinEnd = (segment: { label: string; points: number; color: string }) => {
        console.log(`You won: ${segment.label} with ${segment.points} points!`);
    };

    return (
        <>
            <Breadcrumb
                title="Spin Wheel"
                description="Start spin and get extra rewards."
            />
            <div>
                <SpinWheel onSpinEnd={handleSpinEnd} />
            </div>
        </>
    )
}

export default Spin