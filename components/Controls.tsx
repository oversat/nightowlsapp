"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

interface ControlsProps {
  name: string;
  onNameChange: (name: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMove: (direction: "up" | "down" | "left" | "right") => void;
  onZoom: (delta: number) => void;
  rotation: number;
  onRotate: (value: number) => void;
  activeDirection: string | null;
}

export function Controls({
  name,
  onNameChange,
  onImageUpload,
  onMove,
  onZoom,
  rotation,
  onRotate,
  activeDirection
}: ControlsProps) {
  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="bg-zinc-800 border-zinc-700 text-zinc-100"
      />
      
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400"
      />

      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          onClick={() => onMove("up")}
          className={`w-full ${activeDirection === "up" ? "bg-blue-600" : ""}`}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onMove("down")}
          className={`w-full ${activeDirection === "down" ? "bg-blue-600" : ""}`}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onMove("left")}
          className={`w-full ${activeDirection === "left" ? "bg-blue-600" : ""}`}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onMove("right")}
          className={`w-full ${activeDirection === "right" ? "bg-blue-600" : ""}`}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onZoom(0.1)}
          className="w-full"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onZoom(-0.1)}
          className="w-full"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-zinc-300">Rotation</label>
        <div className="flex items-center gap-2">
          <RotateCw className="h-4 w-4 text-zinc-300" />
          <Slider
            value={[rotation]}
            onValueChange={([value]) => onRotate(value)}
            max={360}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}