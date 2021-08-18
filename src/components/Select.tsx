type SelectOption = {
  label: string;
  value: string;
};
type SelectProps = {
  label: string;
  id: string;
  options: SelectOption[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export function Select(props: SelectProps) {
  const { label, id, options, value, onChange } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <select onChange={onChange} id={id} value={value}>
        {options.map((item: SelectOption) => (
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
