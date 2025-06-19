import "./select.scss";
type valuesKey = "id" | "text" | "object" | any;

interface ISwSelectProps {
  id?: any;
  defaultValue?: any;
  value?: any;
  placeholder?: string;
  label?: string | JSX.Element;
  options: any[];
  renderItem?: (op: any) => void;
  onChange?: Function;
  isRequired?: boolean;
  noMargin?: boolean;
  isDisabled?: boolean;
  registerProperty?: any;
  valuesKey?: valuesKey;
  textKey?: string;
  style?: any;
  errorMessage?: any;
  color?: any;
}

const Select = ({
  id,
  label,
  defaultValue,
  value,
  placeholder,
  options,
  renderItem,
  onChange,
  isRequired,
  noMargin,
  registerProperty,
  valuesKey = "object",
  textKey = "text",
  style,
  isDisabled,
  errorMessage,
  color = "secondary",
}: ISwSelectProps) => {
  return (
    <div className={`sw-select-form ${noMargin ? "m-0" : ""}`}>
      {label ? (
        <label>
          {label} {isRequired && <span>*</span>}
        </label>
      ) : null}
      <select
        id={id}
        className={`form-select input_${color} Sw__m-0`}
        style={{ ...style, padding: "0px 10px" }}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        {...registerProperty}
      >
        {placeholder ? (
          <option value="">{placeholder || "Choose"}</option>
        ) : null}

        {options?.length > 0
          ? options.map((option: any, index: number) => {
              return (
                <option
                  value={
                    valuesKey === "object"
                      ? JSON.stringify(options[index])
                      : option[valuesKey]
                  }
                  key={index}
                >
                  {renderItem
                    ? renderItem(option)
                    : option?.[textKey as string]}

                  {console.log('first',renderItem
                    ? renderItem(option)
                    : option?.[textKey as string])}
                </option>
              );
            })
          : null}
      </select>
      {errorMessage ? (
        typeof errorMessage === "string" ? (
          <span className={`note_text ${color === "danger" && "text-danger"}`}>
            {errorMessage}
          </span>
        ) : (
          <>{errorMessage}</>
        )
      ) : null}
    </div>
  );
};

export default Select;
