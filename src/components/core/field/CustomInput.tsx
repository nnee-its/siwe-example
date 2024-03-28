import { OutlinedInput, OutlinedInputProps } from "@mui/material"
import React from "react"

export interface CustomInputProps extends OutlinedInputProps {
  t: "text"
}

export default function CustomInput({
  t, //eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}: CustomInputProps) {
  return <OutlinedInput {...props} />
}
