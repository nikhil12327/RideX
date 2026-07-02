import {
  CheckCircle2
} from "lucide-react";

const steps = [

  {
    key: "accepted",
    label: "Ride Accepted"
  },

  {
    key: "arrived",
    label: "Rider Arriving"
  },

  {
    key: "started",
    label: "Ride Started"
  },

  {
    key: "completed",
    label: "Ride Completed"
  }

];

const RideTimeline = ({
  status
}) => {

  const currentIndex =

    steps.findIndex(
      step =>
        step.key === status
    );

  return (

    <div className="
    ridex-card
    p-5
    mb-6
    ">

      <h2 className="
      text-xl
      font-bold
      mb-5
      ">

        Ride Progress

      </h2>

      <div className="space-y-5">

        {

          steps.map(

            (step, index) => (

              <div

                key={step.key}

                className="
                flex
                gap-4
                items-center
                "

              >

                <CheckCircle2

                  className={

                    index <=
                    currentIndex

                    ?

                    "text-yellow-400"

                    :

                    "text-zinc-600"

                  }

                />

                <span>

                  {step.label}

                </span>

              </div>

            )

          )

        }

      </div>

    </div>

  );

};

export default RideTimeline;