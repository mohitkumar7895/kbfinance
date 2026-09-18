import { toast as baseToast } from "@/components/ui/toast"

export const toast = (props: any) => {
  return baseToast.add({
    title: props.title,
    description: props.description,
    type: props.variant === "destructive" ? "error" : "success",
  })
}

export const useToast = () => {
  return { toast }
}
