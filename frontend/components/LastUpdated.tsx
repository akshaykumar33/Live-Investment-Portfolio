import React from "react";

interface LastUpdatedProps {
  lastUpdated: Date | null;
}

export default function LastUpdated({ lastUpdated }: LastUpdatedProps) {
  if (!lastUpdated) return null;

  const timeString = lastUpdated.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="last-updated">
      Last Updated:
      {timeString}
    </div>
  );
}
