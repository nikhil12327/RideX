import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  delta,
  hint,
}) => {
  const hasDelta = delta !== undefined;
  const positive = delta >= 0;

  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-5
        hover:border-yellow-400/30
        hover:shadow-lg
        hover:shadow-yellow-400/5
        transition-all
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-bold
              text-white
            "
          >
            {value}
          </h2>
        </div>
      </div>

      {(hasDelta || hint) && (
        <div className="mt-4 flex items-center gap-2">
          {hasDelta && (
            <span
              className={`
                flex
                items-center
                gap-1
                px-2
                py-1
                rounded-md
                text-xs
                font-medium
                ${
                  positive
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }
              `}
            >
              {positive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}

              {Math.abs(delta)}%
            </span>
          )}

          {hint && (
            <span className="text-xs text-slate-400">
              {hint}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;