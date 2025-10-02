import { CircleAlert, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

export function Error({ active, onClose, text }: { active: boolean; onClose: () => void, text: string }) {
    // fecha sozinho depois de 5s
    useEffect(() => {
        if (active) {
            const timer = setTimeout(() => {
                onClose()
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [active, onClose])

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="
            fixed right-4 top-12    /* canto sup esq, um pouco abaixo do topo */
            bg-background dark:bg-gray-900 z-50 max-w-[400px]
            rounded-md border px-4 py-3 shadow-lg
          "
                >
                    <div className="flex gap-2 ">
                        <p className="grow text-sm flex items-center">
                            <CircleAlert
                                className="me-3 -mt-0.5 inline-flex text-red-600"
                                size={16}
                                aria-hidden="true"
                            />
                           {text}
                        </p>
                        <Button
                            variant="ghost"
                            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                            aria-label="Close notification"
                            onClick={onClose}
                        >
                            
                            <XIcon
                                size={16}
                                className="opacity-60 transition-opacity group-hover:opacity-100"
                                aria-hidden="false"
                            />
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
