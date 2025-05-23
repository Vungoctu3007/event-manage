import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { TicketType } from "@/types/Ticket";
import TicketForm from "@/pages/organizer/event/TicketForm";

interface FormState {
    id: number;
    expanded: boolean;
    startDate: Date | null;
    endDate: Date | null;
}

interface ScheduleFormProps {
    form: FormState;
    handleSaveTicket: (id: number, ticket: TicketType) => void;
    handleDateChange: (
        id: number,
        dateType: "startDate" | "endDate",
        date: Date | null
    ) => void;
}

const contentVariants = {
    open: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
};

const ScheduleForm: React.FC<ScheduleFormProps> = ({
    form,
    handleSaveTicket,
    handleDateChange,
}) => {
    return (
        <motion.div
            variants={contentVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
            >
                <div>
                    <label className="block text-sm font-medium text-white mb-1">
                        Ngày bắt đầu
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-white border-gray-600 text-black hover:bg-gray-200 hover:border-gray-500 transition-colors",
                                    !form.startDate && "text-gray-400"
                                )}
                            >
                                <Calendar className="mr-2 h-4 w-4 text-gray-300" />
                                {form.startDate
                                    ? format(form.startDate, "dd-MM-yyyy HH:mm")
                                    : "Chọn ngày bắt đầu"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white">
                            <DatePicker
                                selected={form.startDate}
                                onChange={(date) =>
                                    handleDateChange(form.id, "startDate", date)
                                }
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="dd-MM-yyyy HH:mm"
                                inline
                                className="bg-gray-800 text-white border-gray-700"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-1">
                        Ngày kết thúc
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-white border-gray-600 text-black hover:bg-gray-200 hover:border-gray-500 transition-colors",
                                    !form.endDate && "text-gray-400"
                                )}
                            >
                                <Calendar className="mr-2 h-4 w-4 text-gray-300" />
                                {form.endDate
                                    ? format(form.endDate, "dd-MM-yyyy HH:mm")
                                    : "Chọn ngày kết thúc"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white">
                            <DatePicker
                                selected={form.endDate}
                                onChange={(date) =>
                                    handleDateChange(form.id, "endDate", date)
                                }
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="dd-MM-yyyy HH:mm"
                                inline
                                className="bg-gray-800 text-white border-gray-700"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <TicketForm
                    onSave={(ticket) =>
                        handleSaveTicket(form.id, {
                            ...ticket,
                            startSaleDate: form.startDate ?? undefined,
                            endSaleDate: form.endDate ?? undefined,
                        })
                    }
                />
            </motion.div>
        </motion.div>
    );
};

export default React.memo(ScheduleForm);
