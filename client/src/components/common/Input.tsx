type InputProps = {
  type: string;
  placeholder: string;
};

export default function Input({
  type,
  placeholder,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-400"
    />
  );
}
