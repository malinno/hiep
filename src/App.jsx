// Canvas.js

import React, { useRef, useEffect, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Game loop
    let animationFrameId;
    const numSegments = 6;
    const anglePerSegment = (2 * Math.PI) / numSegments;
    let rotationCount = 0;

    const gameLoop = (timestamp) => {
      update(); // Handle game state updates
      draw(context, rotationCount); // Draw game elements on the canvas

      if (isRotating && rotationCount < 10) {
        animationFrameId = requestAnimationFrame(gameLoop); // Request the next animation frame
        rotationCount += 1;
      }
    };

    const update = () => {
      // Implement game state updates here
    };

    const draw = (context, rotationCount) => {
      // Clear canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      // Example: Draw a circle
      const centerX = context.canvas.width / 2;
      const centerY = context.canvas.height / 2;
      const radius = 300;

      context.save();
      context.translate(centerX, centerY);

      // Rotate the circle
      const angle = (performance.now() / 1000) * (Math.PI / 2); // Rotate 90 degrees per second
      const needleAngle = rotationCount * anglePerSegment + angle;

      // Draw 6 arcs to create 6 parts
      for (let i = 0; i < 6; i++) {
        if (i % 3 === 0) {
          context.fillStyle = "blue";
        } else if (i % 3 === 1) {
          context.fillStyle = "red";
        } else {
          context.fillStyle = "green";
        }

        const startAngle = (i * 2 * Math.PI) / 6 + angle;
        const endAngle = ((i + 1) * 2 * Math.PI) / 6 + angle;
        context.beginPath();
        context.moveTo(0, 0);
        context.arc(0, 0, radius, startAngle, endAngle);
        context.closePath();
        context.fill();
      }

      // Draw the fixed needle outside the circle
      const needleLength = 50; // Length of the needle (cái kim)
      context.strokeStyle = "black";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(radius + 10, 0); // Needle's position outside the circle
      context.lineTo(radius + 10 + needleLength, 0);
      context.stroke();

      // Draw the rotating needle outside the circle
      // context.strokeStyle = "red";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(radius + 10, 0); // Needle's position outside the circle
      context.lineTo(
        radius + 10 + Math.cos(needleAngle) * needleLength,
        Math.sin(needleAngle) * needleLength
      );
      context.stroke();

      context.restore();
    };

    if (isRotating && rotationCount < 10) {
      gameLoop();
    }

    return () => {
      // Clean up resources when the component unmounts
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRotating]);

  const handleStartClick = () => {
    setIsRotating(true);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      <button onClick={handleStartClick} disabled={isRotating}>
        Start
      </button>
    </div>
  );
};

export default Canvas;
