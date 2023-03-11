import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Input = (props) => {
  const [focused, setFocused] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const { id, name, label, type, ref, errormessage, ...rest } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-gray-400 text-sm font-medium">
        {label}
      </label>
      <input
        {...rest}
        id={id}
        name={name}
        onChange={props.onChange}
        className="mb-3 rounded-md h-9 border-gray-200 border-2 px-2 focus:border-teal-600 focus:outline-none"
        type={type === "password" ? (visible ? "text" : "password") : type}
        ref={ref}
        onBlur={handleFocus}
        focused={focused.toString()}
        onFocus={() => {
          name === "confirmpassword" && setFocused(true);
        }}
        required
      />
      <span className="err">{errormessage}</span>
      {/* Eye Icon */}
      {label === "Password" && (
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className={`${visible ? "text-teal-600" : "text-gray-400"}`}
        >
          <VisibilityIcon
            style={{
              position: "absolute",
              marginLeft: "145",
              marginTop: "-46",
              scale: "0.9",
              cursor: "pointer",
            }}
            className="hover:opacity-70"
          />
        </button>
      )}
    </div>
  );
};

export default Input;
