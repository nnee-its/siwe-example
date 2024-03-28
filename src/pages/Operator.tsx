import Page from "@/components/Page"
import Scrollbar from "@/components/Scrollbar"
import {
  OperatorListHead,
  OperatorListToolbar,
  OperatorMoreMenu,
  OperatorRoleMenu,
} from "@/components/_dashboard/operator"
import { HeaderLabel, IUser } from "@/models"
import { useGetOperators } from "@/modules/operator/services/getOperators"
import {
  Avatar,
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
import { filter } from "lodash"
import React, { useState } from "react"

const TABLE_HEAD: HeaderLabel[] = [
  { id: "name", label: "Name", alignRight: false },
  { id: "walletAddress", label: "Wallet address", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "actions", label: "Actions", alignRight: false },
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el[0])
}

const Operator = (): JSX.Element => {
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const operators = useGetOperators({
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
    <Page title="Operator | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Operator
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button> */}
        </Stack>

        <Card>
          <OperatorListToolbar
            numSelected={selected.length}
            filterName={keyword}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OperatorListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {operators.data?.data?.map((row) => {
                    return (
                      <TableRow hover key={row.walletAddress} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={row.name || "Unnamed"} />
                            <Typography variant="subtitle2" noWrap>
                              {row.name || "Unnamed"}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{row.walletAddress}</TableCell>
                        <TableCell align="left">{row.email || "Not set"}</TableCell>
                        <TableCell align="left">
                          <OperatorRoleMenu data={row} />
                        </TableCell>
                        <TableCell align="right">
                          <OperatorMoreMenu data={row} />
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
            count={operators.data?.meta.total || 0}
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

export default Operator
