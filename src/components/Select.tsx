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
  className: string;
};

export function Select(props: SelectProps) {
  const { label, id, options, value, onChange, className } = props;
  return (
    <div className={className}>
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
