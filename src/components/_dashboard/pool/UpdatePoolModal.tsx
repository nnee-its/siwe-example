import Field from "@/components/core/field"
import { CreatePoolRequest } from "@/modules/pool/services/createPool"
import { useUpdatePool } from "@/modules/pool/services/updatePool"
import { Pool, PoolSocial } from "@/modules/pool/types/pool"
import { joiResolver } from "@hookform/resolvers/joi"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import Joi from "joi"
import React, { useEffect } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface UpdatePoolModalProps {
  open: boolean
  onClose(): void
  data: Pool | null
}

export default function UpdatePoolModal({ open, onClose, data }: UpdatePoolModalProps) {
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
        socials: Joi.array().items(
          Joi.object<PoolSocial>({
            type: Joi.string().label("Social type").required(),
            url: Joi.string().label("Social url").uri().required(),
          }),
        ),
      }),
    ),
  })
  const socialFields = useFieldArray({
    control: form.control,
    name: "socials",
  })
  const qc = useQueryClient()
  const updatePool = useUpdatePool(String(data?.id))

  const handleSubmit = form.handleSubmit((values: CreatePoolRequest) => {
    updatePool.mutate(values, {
      onSuccess() {
        toast.success("Updated pool")
        qc.invalidateQueries({
          queryKey: ["getPools"],
        })
        onClose()
      },
    })
  })

  useEffect(() => {
    if (open && data)
      form.reset({
        projectName: data.projectName,
        idoPrice: data.idoPrice,
        totalRaise: data.totalRaise,
        tokenName: data.tokenName,
        tokenNetwork: data.tokenNetwork,
        idoNetwork: data.idoNetwork,
        description: data.description,
      })
  }, [open, data, form.reset])

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="alert-dialog-title">Update pool</DialogTitle>
          <DialogContent className="space-y-2">
            <Field t="text" name="projectName" label="Project name" />
            <Field t="text" name="idoPrice" label="IDO price" />
            <Field t="text" name="totalRaise" label="Total raise" />
            <Field t="text" name="tokenName" label="Token name" />
            <Field t="text" name="tokenNetwork" label="Token network" />
            <Field t="text" name="idoNetwork" label="IDO network" />
            <Field t="text" name="description" label="Description" />
            {socialFields.fields.map((field, idx) => (
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-start" key={field.id}>
                <Field t="text" name={`socials.${idx}.type`} label={`Social type ${idx + 1}`} />
                <Field t="text" name={`socials.${idx}.url`} label={`Social url ${idx + 1}`} />
                <Button variant="outlined" color="error" onClick={() => socialFields.remove(idx)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="contained"
              fullWidth
              onClick={() =>
                socialFields.append({
                  type: "",
                  url: "",
                })
              }
            >
              Add social url
            </Button>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Update
            </Button>
            <Button onClick={onClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  )
}
