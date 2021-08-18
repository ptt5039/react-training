type InputProps = {
  label: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "number" | "email" | "phone" | "date";
  className: string;
};

export function Input({
  label,
  id,
  value,
  onChange,
  type = "text",
  className,
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <br />
      <input onChange={onChange} value={value} id={id} type={type} />
    </div>
  );
}
