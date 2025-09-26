import { cn } from "../../Components/lib/utils"

function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6", className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }) {
  return (
    <div className={cn("leading-none font-semibold", className)} {...props}>
      {children}
    </div>
  )
}

function CardDescription({ className, children, ...props }) {
  return (
    <div className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </div>
  )
}

function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("px-6", className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn("flex items-center px-6", className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
