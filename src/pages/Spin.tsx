import { useEffect, type FC } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useProvider } from "../provider/AppProvider";
import SpinWheel from "../components/SpinWheel";
import confetti from 'canvas-confetti'
import { toast } from "react-toastify";

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

const Spin = () => {
    const { userSpin, getUserSpinData, user, getUser } = useProvider()

    const handleSpinEnd = (value: number) => {
        fireConfetti(4)
        toast(`Congratulations! You won ${value} points`)
    };

    useEffect(() => {
        (async () => {
            try {
                if (!localStorage.getItem("userid")) return;

                await getUser(localStorage.getItem("userid") as string);
                await getUserSpinData(localStorage.getItem("userid") || '')
            }
            catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <div className="flex flex-col">
            <Breadcrumb
                title="Spin Wheel"
                description="Start spin and get extra rewards."
            />
            <div className="flex py-10 flex-col gap-4">
                <SpinWheel onSpinEnd={handleSpinEnd} locked={userSpin?.count === 0} />
            </div>
            <div className="flex flex-col items-center w-full gap-5">
                <div className="flex flex-col items-start w-full px-2">
                    <h1 className="text-white font-bold text-2xl">Available spin: {userSpin?.count || 0}</h1>
                    <h1 className="text-white font-semibold text-base opacity-80">Refresh every 2h</h1>
                </div>
                <div className="flex w-full justify-end">
                    <h1 className="w-[200px] text-right text-lg font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                        Earn extra spins for each referral
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Spin