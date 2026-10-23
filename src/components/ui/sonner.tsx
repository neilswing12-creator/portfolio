
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  Toaster as Sonner,
  toast as sonnerToast,
  type ToasterProps,
} from "sonner"

type ToastError = {
  message?: unknown
  name?: unknown
  statusCode?: unknown
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message || "Something went wrong."
  }

  if (typeof error === "string") {
    return error
  }

  if (error && typeof error === "object") {
    const value = error as ToastError

    if (typeof value.message === "string" && value.message.trim()) {
      return value.message
    }

    if (
      typeof value.statusCode === "number" ||
      typeof value.statusCode === "string"
    ) {
      return `Request failed (${value.statusCode}).`
    }

    if (typeof value.name === "string" && value.name.trim()) {
      return value.name
    }
  }

  return "Something went wrong."
}

/**
 * Use this helper when displaying unknown errors:
 * showToastError(error)
 */
export function showToastError(error: unknown) {
  sonnerToast.error(getErrorMessage(error))
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
