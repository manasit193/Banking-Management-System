"use client";

type Props = {
  currentStep: number;
};

const steps = [
  "Personal",
  "Account",
  "Security",
];

export default function RegisterStepper({
  currentStep,
}: Props) {
  return (
    <div className="mb-10 flex items-center justify-between">

      {steps.map((step, index) => {

        const active = index + 1 <= currentStep;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-white ${
                active
                  ? "bg-blue-700"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>

            <div className="ml-3">

              <p
                className={`font-semibold ${
                  active
                    ? "text-blue-700"
                    : "text-gray-400"
                }`}
              >
                {step}
              </p>

            </div>

            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-1 flex-1 rounded ${
                  active
                    ? "bg-blue-700"
                    : "bg-gray-300"
                }`}
              />
            )}

          </div>
        );
      })}

    </div>
  );
}