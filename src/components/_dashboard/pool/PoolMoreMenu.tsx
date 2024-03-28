import { useDeletePool } from "@/modules/pool/services/deletePool"
import { Pool } from "@/modules/pool/types/pool"
import editFill from "@iconify/icons-eva/edit-fill"
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill"
import trash2Outline from "@iconify/icons-eva/trash-2-outline"
import { Icon } from "@iconify/react"
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import React, { useRef, useState } from "react"
import toast from "react-hot-toast"
import { Link as RouterLink } from "react-router-dom"

interface PoolMoreMenuProps {
  data: Pool
}

const PoolMoreMenu = ({ data }: PoolMoreMenuProps): JSX.Element => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const qc = useQueryClient()
  const deletePool = useDeletePool()

  const handleDelete = () => {
    deletePool.mutate(data.id, {
      onSuccess() {
        toast.success("Deleted pool")
        qc.invalidateQueries({
          queryKey: ["getPools"],
        })
      },
    })
    setIsOpen(false)
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
        <MenuItem sx={{ color: "text.secondary" }} onClick={handleDelete}>
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

export default PoolMoreMenu
