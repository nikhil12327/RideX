const EarningsCard = ({
  earnings,
  ridesCompleted,
}) => {

  return (

    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-3xl p-6 mb-6 shadow-xl">

      <p className="font-medium mb-2">
        Total Earnings
      </p>

      <h2 className="text-5xl font-bold mb-3">
        ₹{earnings || 0}
      </h2>

      <p className="text-sm font-semibold">
        {ridesCompleted || 0} rides completed
      </p>

    </div>

  );

};

export default EarningsCard;