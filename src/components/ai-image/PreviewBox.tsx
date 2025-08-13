import React from "react";

interface PreviewBoxProps {
  className?: string;
  label?: string;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ className, label = "Preview" }) => {
  return (
    <div className={"relative rounded-md border border-lime-400/60 p-2 " + (className || "") }>
      <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-lime-400/60" />
      <div className="flex h-full min-h-[360px] items-center justify-center text-sm text-gray-400">
        {label}
      </div>
    </div>
  );
};

export default PreviewBox;


