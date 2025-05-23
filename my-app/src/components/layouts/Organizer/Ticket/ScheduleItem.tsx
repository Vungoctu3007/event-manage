import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TicketType } from "@/types/Ticket";
import ScheduleForm from "./ScheduleForm";


interface FormState {
    id: number;
    expanded: boolean;
    startDate: Date | null;
    endDate: Date | null;
}

interface ScheduleItemProps {
    form: FormState;
    index: number;
    toggleForm: (id: number) => void;
    removeForm: (id: number) => void;
    handleSaveTicket: (id: number, ticket: TicketType) => void;
    handleDateChange: (id: number, dateType: "startDate" | "endDate", date: Date | null) => void;
}

const formVariants = {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 },
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({
    form,
    index,
    toggleForm,
    removeForm,
    handleSaveTicket,
    handleDateChange,
}) => {
    return (
        <motion.div
            key={form.id}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
                delay: index * 0.05,
            }}
            className={cn(
                "border border-gray-700 rounded-xl p-6 shadow-lg transition-all duration-300",
                form.expanded
                    ? "bg-gray-800/90 backdrop-blur-sm"
                    : "bg-gradient-to-r from-gray-700/70 to-gray-800/60 border-gray-600 hover:shadow-md hover:border-gray-500 cursor-pointer"
            )}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-white">
                    {form.expanded ? "Ngày Sự Kiện" : "Vui lòng nhập thông tin suất diễn"}
                </h3>
                <div className="flex items-center space-x-3">
                    <Button
                        onClick={() => toggleForm(form.id)}
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300 hover:bg-gray-700 rounded-full transition-transform hover:scale-110 focus:ring-2 ring-green-400"
                        aria-label={form.expanded ? "Thu gọn form" : "Mở rộng form"}
                    >
                        {form.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                    <Button
                        onClick={() => removeForm(form.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-full transition-transform hover:scale-110 focus:ring-2 ring-red-400"
                        aria-label="Xóa form"
                    >
                        <X size={20} />
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {form.expanded && (
                    <ScheduleForm
                        form={form}
                        handleSaveTicket={handleSaveTicket}
                        handleDateChange={handleDateChange}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default React.memo(ScheduleItem);