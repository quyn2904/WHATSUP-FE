import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister
} from "react-hook-form";

interface TextFieldControlProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name" | "error"> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

const TextFieldControl = <T extends FieldValues>({
  register,
  error,
  name,
  color,
  ...rest
}: TextFieldControlProps<T>) => {
  return (
    <TextField
      {...register(name)}
      error={!!error}
      {...rest}
      helperText={error?.message}
      color={error ? "error" : color || "primary"}
    />
  );
};

export default TextFieldControl;
