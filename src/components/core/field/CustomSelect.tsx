import { Select } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import React from "react"

interface SelectOption {
  label: string
  value: number | string
}

export interface CustomSelectProps {
  t: "select"
  options: SelectOption[]
}

export default function CustomSelect({
  t = "select", //eslint-disable-line @typescript-eslint/no-unused-vars
  options,
  ...props
}: any) {
  return (
    <Select {...props}>
      {options.map(({ label, value }: any) => (
        <MenuItem value={value} key={label}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
