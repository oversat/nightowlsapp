"use client";

import { useRef, useEffect } from "react";

interface ImagePreviewProps {
  userImage: string | null;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  onPositionChange: (x: number, y: number) => void;
}

export function ImagePreview({ userImage, position, scale, rotation, onPositionChange }: ImagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!userImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawCanvas = async () => {
      ctx.clearRect(0, 0, 1000, 1000);

      // Draw user image
      const img = new Image();
      img.src = userImage;
      await new Promise(resolve => { img.onload = resolve; });
      
      ctx.save();
      ctx.translate(500 + position.x, 500 + position.y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      // Draw owl overlay
      const owlImg = new Image();
      owlImg.src = "https://raw.githubusercontent.com/oversat/cassowaryadventure/master/assets/owlhead01.png";
      await new Promise(resolve => { owlImg.onload = resolve; });
      ctx.drawImage(owlImg, 0, 0, 1000, 1000);
    };

    drawCanvas();
  }, [userImage, position, scale, rotation]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastPositionRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const deltaX = x - lastPositionRef.current.x;
    const deltaY = y - lastPositionRef.current.y;
    onPositionChange(
      position.x + deltaX * (1000 / rect.width),
      position.y + deltaY * (1000 / rect.height)
    );
    lastPositionRef.current = { x, y };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      className="w-full h-full cursor-move touch-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}