import { cn } from "../../Components/lib/utils"

function Progress({ className, value = 0, ...props }) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)} {...props}>
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}

export { Progress }
