import { Collapse, FormControl, FormHelperText, InputLabel } from "@mui/material"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import CustomInput, { CustomInputProps } from "./CustomInput"
import CustomSelect, { CustomSelectProps } from "./CustomSelect"

interface FieldBaseProps {
  name: string
  label?: string
}

type FieldProps = (CustomInputProps | CustomSelectProps) & FieldBaseProps

export default function Field(props: FieldProps) {
  const { t, name, label } = props
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          ref, //eslint-disable-line @typescript-eslint/no-unused-vars
          ...field
        },
        fieldState: { invalid, error },
      }) => (
        <FormControl variant="outlined" size="small" fullWidth error={invalid}>
          {label && <InputLabel>{label}</InputLabel>}
          {t === "text" && <CustomInput {...props} {...field} />}
          {t === "select" && <CustomSelect {...props} {...field} />}
          <Collapse in={!!error?.message}>
            <FormHelperText className="h-[20px]">{error?.message}</FormHelperText>
          </Collapse>
        </FormControl>
      )}
    />
  )
}
