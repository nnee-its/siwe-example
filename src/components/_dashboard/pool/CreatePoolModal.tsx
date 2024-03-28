import Field from "@/components/core/field"
import { CreatePoolRequest, useCreatePool } from "@/modules/pool/services/createPool"
import { joiResolver } from "@hookform/resolvers/joi"
import plusFill from "@iconify/icons-eva/plus-fill"
import { Icon } from "@iconify/react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import Joi from "joi"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function CreatePoolModal() {
  const form = useForm<CreatePoolRequest>({
    resolver: joiResolver(
      Joi.object<CreatePoolRequest>({
        projectName: Joi.string().label("Project name").required(),
        idoPrice: Joi.number().label("IDO price").required().min(0),
        totalRaise: Joi.number().label("Total raise").required().min(0),
        tokenName: Joi.string().label("Token name").required(),
        tokenNetwork: Joi.string().label("Token network").required(),
        idoNetwork: Joi.string().label("IDO network").required(),
        description: Joi.string().label("Description").required(),
      }),
    ),
  })
  const qc = useQueryClient()
  const createPool = useCreatePool()
  const [open, setOpen] = React.useState(false)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const handleSubmit = form.handleSubmit((values: CreatePoolRequest) => {
    createPool.mutate(
      {
        ...values,
        socials: [],
      },
      {
        onSuccess() {
          toast.success("Created pool")
          qc.invalidateQueries({
            queryKey: ["getPools"],
          })
          handleClose()
        },
      },
    )
  })

  return (
    <div>
      <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleOpen}>
        Create pool
      </Button>
      <FormProvider {...form}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleSubmit}>
            <DialogTitle id="alert-dialog-title">Create pool</DialogTitle>
            <DialogContent className="space-y-2">
              <Field t="text" name="projectName" label="Project name" />
              <Field t="text" name="idoPrice" label="IDO price" />
              <Field t="text" name="totalRaise" label="Total raise" />
              <Field t="text" name="tokenName" label="Token name" />
              <Field t="text" name="tokenNetwork" label="Token network" />
              <Field t="text" name="idoNetwork" label="IDO network" />
              <Field t="text" name="description" label="Description" />
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained">
                Create
              </Button>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </FormProvider>
    </div>
  )
}
