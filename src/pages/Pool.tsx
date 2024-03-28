import Page from "@/components/Page"
import Scrollbar from "@/components/Scrollbar"
import PoolListHead from "@/components/_dashboard/pool/PoolListHead"
import PoolListToolbar from "@/components/_dashboard/pool/PoolListToolbar"
import PoolMoreMenu from "@/components/_dashboard/pool/PoolMoreMenu"
import { HeaderLabel, IUser } from "@/models"
import { useGetPools } from "@/modules/pool/services/getPools"
import plusFill from "@iconify/icons-eva/plus-fill"
import { Icon } from "@iconify/react"

import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { NavLink as RouterLink } from "react-router-dom"

const TABLE_HEAD: HeaderLabel[] = [
  { id: "projectName", label: "Project name", alignRight: false },
  { id: "idoPrice", label: "IDO price", alignRight: false },
  { id: "totalRaise", label: "Total raise", alignRight: false },
  { id: "tokenName", label: "Token name", alignRight: false },
  { id: "tokenNetwork", label: "Token network", alignRight: false },
  { id: "idoNetwork", label: "IDO network", alignRight: false },
  { id: "actions", label: "Actions", alignRight: false },
]

const Pool = (): JSX.Element => {
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const pools = useGetPools({
    page,
    take: rowsPerPage,
    keyword,
  })
  const [order, setOrder] = useState("asc")
  const [selected, setSelected] = useState<IUser[]>([])
  const [orderBy, setOrderBy] = useState("name")

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  const handleFilterByName = (event) => {
    setKeyword(event.target.value)
  }

  return (
    <Page title="Pool | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Pool
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New pool
          </Button>
        </Stack>

        <Card>
          <PoolListToolbar
            numSelected={selected.length}
            filterName={keyword}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <PoolListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {pools.data?.data?.map((row) => {
                    return (
                      <TableRow hover key={row.id} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row" padding="none">
                          {row.projectName}
                        </TableCell>
                        <TableCell align="left">{row.idoPrice}</TableCell>
                        <TableCell align="left">{row.totalRaise}</TableCell>
                        <TableCell align="left">{row.tokenName}</TableCell>
                        <TableCell align="left">{row.tokenNetwork}</TableCell>{" "}
                        <TableCell align="left">{row.idoNetwork}</TableCell>
                        <TableCell align="right">
                          <PoolMoreMenu data={row} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pools.data?.meta.total || 0}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  )
}

export default Pool
