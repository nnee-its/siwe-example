import { HeaderLabel } from "@/models"
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { visuallyHidden } from "@mui/utils"
import React from "react"

interface Props {
  order?
  orderBy: string

  headLabel: HeaderLabel[]
  onRequestSort
  onSelectAllClick
}

const OperatorListHead = (props: Props): JSX.Element => {
  const { order, orderBy, headLabel, onRequestSort, onSelectAllClick } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default OperatorListHead
