import DashboardNavbar from "@/layouts/dashboard/DashboardNavbar"
import DashboardSidebar from "@/layouts/dashboard/DashboardSidebar"
import { useOperator } from "@/store/operator"
import { styled } from "@mui/material/styles"
import React, { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
})

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

const DashboardLayout = () => {
  const { operator } = useOperator()
  const [open, setOpen] = useState(false)

  return operator ? (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  ) : (
    <Navigate to="/login" />
  )
}

export default DashboardLayout
