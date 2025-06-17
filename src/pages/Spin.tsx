import { useEffect, type FC } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useProvider } from "../provider/AppProvider";
import { formatNumber } from "../utils/formatNumber";
import Rank from "../assets/rank.png";
import SpinWheel from "../components/SpinWheel";
import confetti from 'canvas-confetti'

const Spin = () => {
    const fireConfetti = (time: number) => {
        const duration = time * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        const randomInRange = (min: number, max: number) => {
          return Math.random() * (max - min) + min;
        }
        
        const interval: ReturnType<typeof setInterval> = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
        
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
        
          const particleCount = 50 * (timeLeft / duration);
          // since particles fall down, start a bit higher than random
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }
    const handleSpinEnd = (value: number) => {
        fireConfetti(4)
        console.log(`You won: ${value} points!`);
    };

    return (
        <>
            <Breadcrumb
                title="Spin Wheel"
                description="Start spin and get extra rewards."
            />
            <div className="flex py-16 flex-col gap-4">
                <SpinWheel onSpinEnd={handleSpinEnd} />
            </div>
        </>
    )
}

export default Spin