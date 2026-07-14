type ButtonProps = {
    title: string;
    type?: "button" | "submit";
  };
  
  export default function Button({
    title,
    type = "button",
  }: ButtonProps) {
    return (
      <button
        type={type}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
      >
        {title}
      </button>
    );
  }