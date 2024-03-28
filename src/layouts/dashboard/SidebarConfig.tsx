import { NavItemConfig } from "@/models"
import fileTextFill from "@iconify/icons-eva/file-text-fill"
import lockFill from "@iconify/icons-eva/lock-fill"
import peopleFill from "@iconify/icons-eva/people-fill"
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill"
import { Icon } from "@iconify/react"
import React from "react"

const getIcon = (name) => <Icon icon={name} width={22} height={22} />

const sidebarConfig: NavItemConfig[] = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "opeator",
    path: "/dashboard/operator",
    icon: getIcon(peopleFill),
  },
  // {
  //   title: "product",
  //   path: "/dashboard/products",
  //   icon: getIcon(shoppingBagFill),
  // },
  // {
  //   title: "blog",
  //   path: "/dashboard/blog",
  //   icon: getIcon(fileTextFill),
  // },
  {
    title: "pool",
    path: "/dashboard/pool",
    icon: getIcon(fileTextFill),
  },
  {
    title: "login",
    path: "/login",
    icon: getIcon(lockFill),
  },
  // {
  //   title: "register",
  //   path: "/register",
  //   icon: getIcon(personAddFill),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: getIcon(alertTriangleFill),
  // },
]

export default sidebarConfig
