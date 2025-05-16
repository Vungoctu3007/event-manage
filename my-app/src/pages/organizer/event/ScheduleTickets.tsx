import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronUp, X, Calendar } from "lucide-react";
import TicketForm from "./TicketForm";
import { format } from "date-fns";
import type { TicketType } from "@/types/TicketType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ScheduleTickets: React.FC = () => {
    const [ticketForms, setTicketForms] = useState<
        {
            id: number;
            expanded: boolean;
            startDate: Date | null;
            endDate: Date | null;
        }[]
    >([]);

    const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(
        null
    );

    useEffect(() => {
        // Only add a new form if ticketForms is empty
        if (ticketForms.length === 0) {
            setTicketForms([
                {
                    id: Date.now(),
                    expanded: true,
                    startDate: new Date("2025-05-14T07:00:00"),
                    endDate: new Date("2025-05-16T07:07:00"),
                },
            ]);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleAddNewForm = () => {
        // Close all existing forms and open only the new one
        setTicketForms((prev) => [
            {
                id: Date.now(),
                expanded: true,
                startDate: new Date("2025-05-14T07:00:00"),
                endDate: new Date("2025-05-16T07:07:00"),
            },
            ...prev.map((form) => ({ ...form, expanded: false })),
        ]);
    };

    const toggleForm = (id: number) => {
        setTicketForms((prev) =>
            prev.map((f) => (f.id === id ? { ...f, expanded: !f.expanded } : f))
        );
    };

    const removeForm = (id: number) => {
        setTicketForms((prev) => prev.filter((f) => f.id !== id));
    };

    const handleSaveTicket = (id: number, ticket: TicketType) => {
        setTicketTypes((prev) => [...prev, ticket]);
        removeForm(id);
    };

    const handleDateChange = (
        id: number,
        dateType: "startDate" | "endDate",
        date: Date | null
    ) => {
        setTicketForms((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [dateType]: date } : f))
        );
    };

    // Animation variants for form container
    const formVariants = {
        initial: { opacity: 0, y: -20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
    };

    // Animation variants for expanded content
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            Thời Gian
                        </h2>
                        <Select
                            onValueChange={(value) =>
                                setSelectedSchedule(value)
                            }
                        >
                            <SelectTrigger className="w-[300px] bg-white border-gray-600 text-white hover:bg-gray-200 hover:border-gray-500 transition-colors">
                                <SelectValue placeholder="Vui lòng chọn thời gian suất diễn" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-700 text-white">
                                {ticketForms.map((form) => (
                                    <SelectItem
                                        key={form.id}
                                        value={form.id.toString()}
                                    >
                                        {form.startDate && form.endDate
                                            ? `${format(
                                                  form.startDate,
                                                  "dd-MM-yyyy HH:mm"
                                              )} - ${format(
                                                  form.endDate,
                                                  "dd-MM-yyyy HH:mm"
                                              )}`
                                            : "Chưa chọn thời gian"}
                                    </SelectItem>
                                ))}
                                {ticketForms.length === 0 && (
                                    <SelectItem value="none" disabled>
                                        Chưa có suất diễn nào
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </motion.div>
                {/* Form List */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {ticketForms.map(
                            ({ id, expanded, startDate, endDate }, index) => (
                                <motion.div
                                    key={id}
                                    variants={formVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.4, 0, 0.2, 1],
                                        delay: index * 0.05, // Stagger for smooth entry
                                    }}
                                    className={cn(
                                        "border border-gray-700 rounded-xl p-6 shadow-lg transition-all duration-300",
                                        expanded
                                            ? "bg-gray-800/90 backdrop-blur-sm"
                                            : "bg-gradient-to-r from-gray-700/70 to-gray-800/60 border-gray-600 hover:shadow-md hover:border-gray-500 cursor-pointer"
                                    )}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold text-lg text-white">
                                            {expanded
                                                ? "Ngày Sự Kiện"
                                                : "Vui lòng nhập thông tin suất diễn"}
                                        </h3>
                                        <div className="flex items-center space-x-3">
                                            <Button
                                                onClick={() => toggleForm(id)}
                                                variant="ghost"
                                                size="sm"
                                                className="text-green-400 hover:text-green-300 hover:bg-gray-700 rounded-full transition-transform hover:scale-110 focus:ring-2 ring-green-400"
                                                aria-label={
                                                    expanded
                                                        ? "Thu gọn form"
                                                        : "Mở rộng form"
                                                }
                                            >
                                                {expanded ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => removeForm(id)}
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-full transition-transform hover:scale-110 focus:ring-2 ring-red-400"
                                                aria-label="Xóa form"
                                            >
                                                <X size={20} />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Expanded content */}
                                    <AnimatePresence>
                                        {expanded && (
                                            <motion.div
                                                variants={contentVariants}
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                                className="overflow-hidden"
                                            >
                                                {/* Date Pickers */}
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeOut",
                                                    }}
                                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
                                                >
                                                    {/* Start Date */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-white mb-1">
                                                            Ngày bắt đầu
                                                        </label>
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className={cn(
                                                                        "w-full justify-start text-left font-normal bg-white border-gray-600 text-black hover:bg-gray-200 hover:border-gray-500 transition-colors",
                                                                        !startDate &&
                                                                            "text-gray-400"
                                                                    )}
                                                                >
                                                                    <Calendar className="mr-2 h-4 w-4 text-gray-300" />
                                                                    {startDate
                                                                        ? format(
                                                                              startDate,
                                                                              "dd-MM-yyyy HH:mm"
                                                                          )
                                                                        : "Chọn ngày bắt đầu"}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white">
                                                                <DatePicker
                                                                    selected={
                                                                        startDate
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) =>
                                                                        handleDateChange(
                                                                            id,
                                                                            "startDate",
                                                                            date
                                                                        )
                                                                    }
                                                                    showTimeSelect
                                                                    timeFormat="HH:mm"
                                                                    timeIntervals={
                                                                        15
                                                                    }
                                                                    dateFormat="dd-MM-yyyy HH:mm"
                                                                    inline
                                                                    className="bg-gray-800 text-white border-gray-700"
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>

                                                    {/* End Date */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-white mb-1">
                                                            Ngày kết thúc
                                                        </label>
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className={cn(
                                                                        "w-full justify-start text-left font-normal bg-white border-gray-600 text-black hover:bg-gray-200 hover:border-gray-500 transition-colors",
                                                                        !endDate &&
                                                                            "text-gray-400"
                                                                    )}
                                                                >
                                                                    <Calendar className="mr-2 h-4 w-4 text-gray-300" />
                                                                    {endDate
                                                                        ? format(
                                                                              endDate,
                                                                              "dd-MM-yyyy HH:mm"
                                                                          )
                                                                        : "Chọn ngày kết thúc"}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white">
                                                                <DatePicker
                                                                    selected={
                                                                        endDate
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) =>
                                                                        handleDateChange(
                                                                            id,
                                                                            "endDate",
                                                                            date
                                                                        )
                                                                    }
                                                                    showTimeSelect
                                                                    timeFormat="HH:mm"
                                                                    timeIntervals={
                                                                        15
                                                                    }
                                                                    dateFormat="dd-MM-yyyy HH:mm"
                                                                    inline
                                                                    className="bg-gray-800 text-white border-gray-700"
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </motion.div>

                                                {/* Ticket Form */}
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeOut",
                                                    }}
                                                >
                                                    <TicketForm
                                                        onSave={(ticket) =>
                                                            handleSaveTicket(
                                                                id,
                                                                {
                                                                    ...ticket,
                                                                    startSaleDate:
                                                                        startDate ??
                                                                        undefined,
                                                                    endSaleDate:
                                                                        endDate ??
                                                                        undefined,
                                                                }
                                                            )
                                                        }
                                                    />
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>

                {/* Add New Schedule Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="flex justify-center mt-8"
                >
                    <Button
                        onClick={handleAddNewForm}
                        className="flex items-center space-x-2 w-48 justify-center bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 rounded-full font-semibold py-3 shadow-lg hover:shadow-green-500/20"
                    >
                        <Plus size={20} />
                        <span>Tạo suất mới</span>
                    </Button>
                </motion.div>

                {/* Created Tickets List */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    className="mt-12"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Vé đã tạo
                    </h2>
                    {ticketTypes.length === 0 ? (
                        <p className="text-gray-400 text-center italic">
                            Chưa có loại vé nào
                        </p>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {ticketTypes.map((type, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: idx * 0.1,
                                        ease: "easeOut",
                                    }}
                                    className="p-4 bg-gray-800/80 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="font-medium text-white">
                                        {type.ticketName}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Giá:{" "}
                                        {type.isFree
                                            ? "Miễn phí"
                                            : `${type.price} VNĐ`}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Bán từ:{" "}
                                        {type.startSaleDate
                                            ? format(
                                                  type.startSaleDate,
                                                  "dd-MM-yyyy HH:mm"
                                              )
                                            : "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Đến:{" "}
                                        {type.endSaleDate
                                            ? format(
                                                  type.endSaleDate,
                                                  "dd-MM-yyyy HH:mm"
                                              )
                                            : "N/A"}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ScheduleTickets;
