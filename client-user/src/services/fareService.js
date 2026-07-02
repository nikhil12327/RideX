export const calculateFare =
  (distance) => {

    const km =
      Number(distance);

    if (!km || km <= 0)
      return 0;

    const baseFare = 30;

    if (km <= 3)
      return baseFare;

    return Math.round(

      baseFare +

      ((km - 3) * 12)

    );

  };