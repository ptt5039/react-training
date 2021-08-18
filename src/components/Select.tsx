type SelectOption = {
  label: string;
  value: string;
};
type SelectProps = {
  label: string;
  id: string;
  options: SelectOption[];
};

export function Select(props: SelectProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <select id={props.id}>
        {props.options.map((item: SelectOption) => (
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
