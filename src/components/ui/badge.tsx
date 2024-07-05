import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2858141951.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1840603121.
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",

          // Creame los estilos para estos Badges por favor que sean distintos
          // para Status
          open: "bg-green-500 text-white hover:bg-green-600",
          closed: "bg-red-500 text-white hover:bg-red-600",
          inProgress: "bg-yellow-500 text-white hover:bg-yellow-600",
          done: "bg-blue-500 text-white hover:bg-blue-600",
          // Diferentes para Priority por favor
          low: "bg-gray-300 text-gray-800 hover:bg-gray-400",
          medium: "bg-yellow-300 text-yellow-800 hover:bg-yellow-400",
          // Quiero que tengan una animación
          high: "bg-red-500 text-red-800 hover:bg-red-700 animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
