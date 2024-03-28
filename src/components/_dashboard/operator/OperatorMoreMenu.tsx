import { useDeleteOperator } from "@/modules/operator/services/deleteOperator"
import { Operator } from "@/modules/operator/types/operator"
import editFill from "@iconify/icons-eva/edit-fill"
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill"
import trash2Outline from "@iconify/icons-eva/trash-2-outline"
import { Icon } from "@iconify/react"
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import React, { useRef, useState } from "react"
import toast from "react-hot-toast"
import { Link as RouterLink } from "react-router-dom"

interface OperatorMoreMenuProps {
  data: Operator
}

const OperatorMoreMenu = ({ data }: OperatorMoreMenuProps): JSX.Element => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const qc = useQueryClient()
  const deleteOperator = useDeleteOperator()

  const handleDeleteOperator = () => {
    deleteOperator.mutate(data.walletAddress, {
      onSuccess() {
        toast.success("Deleted operator")
        qc.invalidateQueries({
          queryKey: ["getOperators"],
        })
      },
    })
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

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
        <MenuItem sx={{ color: "text.secondary" }} onClick={handleDeleteOperator}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: "body2" }} />
        </MenuItem>
      </Menu>
    </>
  )
}

export default OperatorMoreMenu
