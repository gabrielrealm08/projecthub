type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function StatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-lg border border-slate-300 px-4 py-3"
    >
      <option value="all">All Status</option>
      <option value="active">Active</option>
      <option value="on hold">On Hold</option>
      <option value="completed">Completed</option>
    </select>
  );
}