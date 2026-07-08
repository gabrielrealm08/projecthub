type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search project..."
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
    />
  );
}