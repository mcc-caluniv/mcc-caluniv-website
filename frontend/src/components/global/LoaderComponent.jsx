import { AtSign } from "lucide-react";
import React from "react";
import BG from "../../assets/img/mcc.png";

export default function LoaderComponent() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <img src={BG} className="h-16 animate-ping" />
    </div>
  );
}