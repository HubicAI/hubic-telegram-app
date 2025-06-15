import React, { useState, useEffect, useRef } from 'react';

interface WheelSegment {
    label: string;
    points: number;
    color: string;
}

interface SpinWheelProps {
    onSpinEnd: (segment: WheelSegment) => void;
    targetSegmentIndex?: number; // Optional index to predetermine spin result
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onSpinEnd, targetSegmentIndex }) => {
    const [rotation, setRotation] = useState<number>(0);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvasSize, setCanvasSize] = useState<number>(300); // Default size, will be adjusted

    const segments: WheelSegment[] = [
        { label: 'Jackpot', points: 100, color: '#FFD700' }, // Vibrant Gold
        { label: 'Double', points: 50, color: '#FF69B4' }, // Hot Pink
        { label: 'Bonus', points: 30, color: '#00CED1' }, // Dark Turquoise
        { label: 'Extra Spin', points: 20, color: '#ADFF2F' }, // Lime Green
        { label: 'Try Again', points: 10, color: '#FF4500' }, // Orange Red
        { label: 'Lucky', points: 40, color: '#9932CC' }, // Dark Orchid
    ];

    // Adjust canvas size based on container width
    useEffect(() => {
        const updateCanvasSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const size = Math.min(containerWidth - 32, 360); // Account for 2rem padding + 8px border
                setCanvasSize(size);
            }
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    const drawWheel = (ctx: CanvasRenderingContext2D, rotation: number) => {
        const canvas = ctx.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2 - 10;
        const arc = (2 * Math.PI) / segments.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw segments with gradient
        segments.forEach((segment, i) => {
            const gradient = ctx.createRadialGradient(
                centerX, centerY, radius * 0.3,
                centerX, centerY, radius
            );
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(1, segment.color);

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.moveTo(centerX, centerY);
            ctx.arc(
                centerX,
                centerY,
                radius,
                i * arc + (rotation * Math.PI) / 180,
                (i + 1) * arc + (rotation * Math.PI) / 180
            );
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            // Draw text with shadow for better contrast
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(i * arc + arc / 2 + (rotation * Math.PI) / 180);
            ctx.fillStyle = '#1F2937';
            ctx.shadowColor = '#FFFFFF';
            ctx.shadowBlur = 4;
            ctx.font = `bold ${canvasSize * 0.04}px Inter, sans-serif`;
            ctx.textAlign = 'right';
            ctx.fillText(`${segment.label} (${segment.points} pts)`, radius - 15, 5);
            ctx.restore();
        });

        // Draw circular axis with solid color
        const axisRadius = canvasSize * 0.1; // Axis circle radius
        ctx.beginPath();
        ctx.arc(centerX, centerY, axisRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#4B5563'; // Solid dark gray
        ctx.fill();
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw fixed pointer as a triangle on the circle's right edge, pointing right (90°)
        ctx.beginPath();
        ctx.moveTo(centerX + axisRadius + 10, centerY); // Right point of triangle
        ctx.lineTo(centerX + axisRadius - 5, centerY - 8); // Top left
        ctx.lineTo(centerX + axisRadius - 5, centerY + 8); // Bottom left
        ctx.closePath();
        ctx.fillStyle = '#E879F9'; // Match canvas border
        ctx.fill();
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1;
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawWheel(ctx, rotation);
            }
        }
    }, [rotation, canvasSize]);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const segmentAngle = 360 / segments.length;
        let finalAngle: number;

        if (targetSegmentIndex !== undefined && targetSegmentIndex >= 0 && targetSegmentIndex < segments.length) {
            // Center of target segment aligned with right pointer (90°)
            const segmentCenterAngle = targetSegmentIndex * segmentAngle + segmentAngle / 2;
            finalAngle = rotation + 3600 - (segmentCenterAngle - 90); // 10 full spins, land on target
        } else {
            // Random spin
            finalAngle = rotation + Math.floor(Math.random() * 360) + 3600; // 10 full spins
        }

        const duration = 6000;
        const startTime = performance.now();
        const startRotation = rotation;

        const easeInOut = (t: number) => {
            if (t < 0.2) {
                return 3 * t * t * t;
            } else if (t < 0.5) {
                return 0.024 + (t - 0.2) * 1.8;
            } else {
                const u = 1 - (t - 0.2) / 0.5;
                return 1 - 0.5 * u * u * u * u;
            }
        };

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOut(progress);
            setRotation(startRotation + (finalAngle - startRotation) * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsSpinning(false);
                const normalizedAngle = finalAngle % 360;
                // Segment under the right pointer (90°)
                const adjustedAngle = ((-normalizedAngle + 90) % 360 + 360) % 360;
                const segmentIndex = Math.floor(adjustedAngle / segmentAngle);
                onSpinEnd(segments[segmentIndex]);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center justify-center w-full max-w-[400px] p-4 bg-transparent rounded-2xl shadow-2xl"
        >
            <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                className="border-4 border-[#E879F9] rounded-full shadow-inner transition-transform duration-500 hover:scale-105"
            />
            <button
                onClick={spin}
                disabled={isSpinning}
                className={`mt-6 px-6 py-3 text-base font-bold text-white rounded-xl shadow-lg transition-all duration-300 ${isSpinning
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-[#E879F9]  active:scale-95'
                    }`}
            >
                {isSpinning ? (
                    <span className="flex items-center">
                        <svg
                            className="w-4 h-4 mr-2 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                            />
                        </svg>
                        Spinning...
                    </span>
                ) : (
                    'Spin Now'
                )}
            </button>
        </div>
    );
};

export default SpinWheel;