"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Controls } from "@/components/Controls";
import { ImagePreview } from "@/components/ImagePreview";

export default function Home() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setIsComplete(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const moveImage = (direction: "up" | "down" | "left" | "right") => {
    setActiveDirection(direction);
    setTimeout(() => setActiveDirection(null), 200);

    const step = 10;
    const moves = {
      up: { x: 0, y: -step },
      down: { x: 0, y: step },
      left: { x: -step, y: 0 },
      right: { x: step, y: 0 },
    };
    setPosition(prev => ({
      x: prev.x + moves[direction].x,
      y: prev.y + moves[direction].y,
    }));
  };

  const handlePositionChange = (x: number, y: number) => {
    setPosition({ x, y });
  };

  const generateImage = async () => {
    if (!canvasRef.current || !userImage) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 1000, 1000);

    // Load and draw user image
    const userImg = new Image();
    userImg.crossOrigin = "anonymous";
    userImg.src = userImage;
    await new Promise(resolve => { userImg.onload = resolve; });

    // Load and draw owl template
    const owlTemplate = new Image();
    owlTemplate.crossOrigin = "anonymous";
    owlTemplate.src = "https://raw.githubusercontent.com/oversat/cassowaryadventure/master/assets/owlhead01.png";
    owlTemplate.src = "https://raw.githubusercontent.com/oversat/cassowaryadventure/master/assets/owlhead01.png";
    await new Promise(resolve => { owlTemplate.onload = resolve; });

    // Apply transformations for user image
    ctx.save();
    ctx.translate(500 + position.x, 500 + position.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(userImg, -userImg.width / 2, -userImg.height / 2);
    ctx.restore();

    // Draw owl template
    ctx.drawImage(owlTemplate, 0, 0, 1000, 1000);

    // Add name with improved contrast
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.strokeText(name, 500, 950);
    ctx.fillText(name, 500, 950);

    setIsComplete(true);
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${name}night-owl-profile.jpg`;
    link.href = canvasRef.current.toDataURL("image/jpeg");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 text-transparent bg-clip-text">
          ABC Night Owls
        </h1>

        <Card className="p-4 sm:p-6 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-zinc-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Controls
              name={name}
              onNameChange={setName}
              onImageUpload={handleImageUpload}
              onMove={moveImage}
              onZoom={(delta) => setScale(s => Math.max(0.1, s + delta))}
              rotation={rotation}
              onRotate={setRotation}
                activeDirection={activeDirection}
              />
            

            <div className="relative aspect-square bg-zinc-800 rounded-lg overflow-hidden">
              {userImage ? (
                <ImagePreview
                  userImage={userImage}
                  position={position}
                  scale={scale}
                  rotation={rotation}
                  onPositionChange={handlePositionChange}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                  Upload an image to begin
                </div>
              )}
              <canvas
                ref={canvasRef}
                width={1000}
                height={1000}
                className="hidden"
              />
            </div>
          </div>

          <div className="mt-6">
            {userImage && !isComplete ? (
              <Button onClick={generateImage} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Generate Profile
              </Button>
            ) : isComplete ? (
              <Button onClick={downloadImage} className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Download className="h-4 w-4 mr-2" /> Download Profile
              </Button>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}