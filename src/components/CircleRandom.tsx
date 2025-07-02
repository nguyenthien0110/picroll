"use client";

import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";

const images = [
  "/images/pic1.jpg",
  "/images/pic2.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
  "/images/pic6.jpg",
  "/images/pic7.jpg",
  "/images/pic8.jpg",
];

export default function CircleRandom() {
  const [selected, setSelected] = useState<number | null>(null);
  const [rotating, setRotating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (rotating) return;
    setRotating(true);

    const randomIndex = Math.floor(Math.random() * images.length);
    const anglePerItem = 360 / images.length;
    const targetAngle = 360 * 5 + (360 - randomIndex * anglePerItem);

    if (circleRef.current) {
      circleRef.current.style.transition = "transform 3s ease-out";
      circleRef.current.style.transform = `rotate(${targetAngle}deg)`;
    }

    setTimeout(() => {
      setSelected(randomIndex);
      setShowModal(true);
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 },
      });
    }, 3100);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
    if (circleRef.current) {
      circleRef.current.style.transition = "none";
      circleRef.current.style.transform = `rotate(0deg)`;
    }
    setRotating(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <div className="relative w-[300px] h-[300px]">
        <div ref={circleRef} className="absolute inset-0 transition-transform">
          {images.map((src, index) => {
            const angle = (360 / images.length) * index;
            const radius = 120;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={index}
                className="absolute w-[60px] h-[60px] overflow-hidden rounded-xl border shadow"
                style={{
                  top: `calc(50% + ${y}px - 30px)`,
                  left: `calc(50% + ${x}px - 30px)`,
                }}
              >
                <Image
                  src={src}
                  alt={`img-${index}`}
                  width={60}
                  height={60}
                  objectFit="cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={rotating}
        className={`px-4 py-2 rounded-xl text-white transition ${
          rotating
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {rotating ? "Spinning..." : "Spin Wheel"}
      </button>

      {/* Modal */}
      {showModal && selected !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              🎉 Bộ nay nha Hai!
            </h2>
            <Image
              src={images[selected]}
              alt="Selected"
              width={300}
              height={200}
              className="rounded-xl shadow"
            />
            <button
              onClick={handleCloseModal}
              className="mt-6 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
