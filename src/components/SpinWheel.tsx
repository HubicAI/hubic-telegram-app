import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

const segments = [
    { value: 100, color: "#FF0040", textColor: "white", label: "$100" },
    { value: 200, color: "#FF6600", textColor: "white", label: "$200" },
    { value: 300, color: "#FFD700", textColor: "white", label: "$300" },
    { value: 400, color: "#00BFFF", textColor: "white", label: "$400" },
    { value: 500, color: "#00FFFF", textColor: "white", label: "$500" },
    { value: 600, color: "#00FF40", textColor: "white", label: "$600" },
    { value: 700, color: "#8000FF", textColor: "white", label: "$700" },
    { value: 800, color: "#FF1493", textColor: "white", label: "$800" },
]

interface SpinWheelProps {
    onSpinEnd: (value: number) => void
    locked?: boolean
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onSpinEnd, locked = false }) => {
    const [isSpinning, setIsSpinning] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [result, setResult] = useState<number>(0)

    const getWinningSegment = (finalRotation: number) => {
        // Normalize rotation to 0-360 degrees
        const normalizedRotation = ((finalRotation % 360) + 360) % 360

        // Each segment is 45 degrees (360/8 segments)
        const segmentAngle = 360 / segments.length

        // The pin points to the top (0 degrees)
        // We need to find which segment is at the top position
        // Since segments start at -90 degrees (top), we need to adjust
        const segmentIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length

        // Return the winning segment
        return segments[segmentIndex]
    }

    const handleSpin = () => {
        if (isSpinning || locked) return

        setIsSpinning(true)
        setResult(0) // Clear previous result

        const newRotation = rotation + 3600 + Math.random() * 720 // 10-12 rounds
        setRotation(newRotation)

        setTimeout(() => {
            setIsSpinning(false)

            // Calculate and display the winning segment
            const winningSegment = getWinningSegment(newRotation)
            setResult(winningSegment.value)
            onSpinEnd(winningSegment.value)
        }, 4000) // Longer animation time
    }

    return (
        <div
            className={`flex flex-col items-center mb-8 ${isSpinning ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleSpin}
        >
            <motion.div
                className="flex relative"
                animate={{
                    scale: isSpinning ? [1, 1.02, 1, 1.01, 1] : 1,
                }}
                transition={{
                    scale: { duration: 0.4, repeat: isSpinning ? 2 : 0, ease: "easeInOut" },
                }}
            >
                {/* Outer Gradient Border */}
                <div
                    className="relative p-[3px] rounded-full"
                    style={{
                        background:
                            "linear-gradient(45deg, #0066FF, #1E90FF, #FFD700, #FF8C00, #FF1493, #8A2BE2, #00CED1, #32CD32)",
                    }}
                >
                    {/* Pin-shaped Pointer - Merged with outer border */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="relative">
                            {/* Pin body - longer and with gradient matching outer border */}
                            <div
                                className="w-4 h-12 rounded-t-full"
                                style={{
                                    background: "linear-gradient(180deg, #FFD700, #FF8C00, #FF1493)",
                                }}
                            ></div>
                            {/* Triangle point at the bottom */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                <div
                                    className="w-0 h-0"
                                    style={{
                                        borderLeft: "8px solid transparent",
                                        borderRight: "8px solid transparent",
                                        borderTop: "12px solid #FF1493",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Border (Dark and Thick) */}
                    <div className="relative p-4 rounded-full bg-gradient-to-br from-black via-gray-600 to-black">
                        {/* Inner Gradient Border */}
                        <div
                            className="relative p-1 rounded-full"
                            style={{
                                background:
                                    "linear-gradient(135deg, #8A2BE2, #FF1493, #FF8C00, #FFD700, #1E90FF, #0066FF, #00CED1, #32CD32)",
                            }}
                        >
                            {/* Spin Wheel Container */}
                            <div
                                className="relative w-80 h-80 rounded-full overflow-hidden"
                                style={{
                                    boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.9), inset 0 0 200px rgba(0, 0, 0, 0.7)",
                                }}
                            >
                                {/* Spinning Wheel */}
                                <motion.div
                                    className="w-full h-full relative"
                                    animate={{ rotate: rotation }}
                                    transition={{ duration: 4, ease: "easeOut" }}
                                >
                                    <div
                                        className="w-full h-full rounded-full"
                                        style={{
                                            boxShadow:
                                                "inset 0 0 160px rgba(0, 0, 0, 0.95), inset 0 0 240px rgba(0, 0, 0, 0.8), inset 0 0 320px rgba(0, 0, 0, 0.6)",
                                        }}
                                    >
                                        <svg width="320" height="320" viewBox="0 0 320 320" className="w-full h-full">
                                            <defs>
                                                <radialGradient id="radialShadow" cx="50%" cy="50%" r="50%">
                                                    <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                                                    <stop offset="30%" stopColor="rgba(0,0,0,0.1)" />
                                                    <stop offset="60%" stopColor="rgba(0,0,0,0.4)" />
                                                    <stop offset="80%" stopColor="rgba(0,0,0,0.7)" />
                                                    <stop offset="100%" stopColor="rgba(0,0,0,0.9)" />
                                                </radialGradient>
                                            </defs>
                                            {segments.map((segment, index) => {
                                                const angle = (360 / segments.length) * index
                                                const nextAngle = (360 / segments.length) * (index + 1)
                                                const startAngle = (angle - 90) * (Math.PI / 180)
                                                const endAngle = (nextAngle - 90) * (Math.PI / 180)

                                                const x1 = 160 + 160 * Math.cos(startAngle)
                                                const y1 = 160 + 160 * Math.sin(startAngle)
                                                const x2 = 160 + 160 * Math.cos(endAngle)
                                                const y2 = 160 + 160 * Math.sin(endAngle)

                                                const largeArcFlag = nextAngle - angle > 180 ? 1 : 0

                                                const pathData = [
                                                    `M 160 160`,
                                                    `L ${x1} ${y1}`,
                                                    `A 160 160 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                                    "Z",
                                                ].join(" ")

                                                // Text position
                                                const textAngle = (angle + nextAngle) / 2
                                                const textRadius = 110
                                                const textX = 160 + textRadius * Math.cos((textAngle - 90) * (Math.PI / 180))
                                                const textY = 160 + textRadius * Math.sin((textAngle - 90) * (Math.PI / 180))

                                                return (
                                                    <g key={index}>
                                                        <path d={pathData} fill={segment.color} />
                                                        <path d={pathData} fill="url(#radialShadow)" opacity="0.8" />
                                                        <text
                                                            x={textX}
                                                            y={textY}
                                                            fill={segment.textColor}
                                                            fontSize="18"
                                                            fontWeight="bold"
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                            transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                                                        >
                                                            {segment.label}
                                                        </text>
                                                    </g>
                                                )
                                            })}
                                        </svg>
                                    </div>

                                    {/* Axis (Center Circle with Gradient Border) */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div
                                            className="w-16 h-16 rounded-full p-0.5"
                                            style={{
                                                background: "linear-gradient(90deg, #0066FF, #1E90FF, #FFD700, #FF8C00, #FF1493, #8A2BE2)",
                                            }}
                                        >
                                            <div
                                                className="w-full h-full rounded-full"
                                                style={{
                                                    background: "radial-gradient(circle, #333333 0%, #000000 70%, #000000 100%)",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Spin Button */}
            {/* <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="mt-8 px-8 py-3 rounded-[8px] text-[14px] text-white bg-[#E879F9] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isSpinning ? "Spinning..." : "SPIN"}
            </button> */}
        </div>
    )
}

export default SpinWheel