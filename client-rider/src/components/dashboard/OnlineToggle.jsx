import { useState } from "react";

const OnlineToggle = ({
  online,
  onToggle,
}) => {

  const [loading, setLoading] =
    useState(false);

  const handleClick = async () => {

    setLoading(true);

    await onToggle(!online);

    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-4 mb-6">

      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          online
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      >
        {loading
          ? "Updating..."
          : online
          ? "Go Offline"
          : "Go Online"}
      </button>

    </div>
  );
};

export default OnlineToggle;