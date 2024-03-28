import { useUpdateOperatorRole } from "@/modules/operator/services/updateOperatorRole"
import { Operator, OperatorRole } from "@/modules/operator/types/operator"
import { Chip, ListItemText, Menu, MenuItem } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import React, { useRef, useState } from "react"
import toast from "react-hot-toast"

interface OperatorRoleMenuProps {
  data: Operator
}

const OperatorRoleMenu = ({ data }: OperatorRoleMenuProps): JSX.Element => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const qc = useQueryClient()
  const updateOperatorRole = useUpdateOperatorRole(data.walletAddress)

  const handleUpdate = (role: OperatorRole) => {
    updateOperatorRole.mutate(role, {
      onSuccess() {
        toast.success("Updated operator role")
        qc.invalidateQueries({
          queryKey: ["getOperators"],
        })
      },
    })
    setIsOpen(false)
  }

  return (
    <>
      <Chip ref={ref} label={data.role} onClick={() => setIsOpen(true)} />

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {Object.keys(OperatorRole).map((role) => (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={() => handleUpdate(role as OperatorRole)}
          >
            <ListItemText primary={role} primaryTypographyProps={{ variant: "body2" }} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default OperatorRoleMenu
