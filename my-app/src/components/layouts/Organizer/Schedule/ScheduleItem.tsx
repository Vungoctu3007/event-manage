import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    ChevronUp,
    X,
    Edit2,
    Trash2,
    GripVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TicketType } from "@/types/Ticket";
import ScheduleForm from "./ScheduleForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import TicketFormContent from "../Ticket/TicketFormContent";
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult,
    type DroppableProvided,
    type DraggableProvided,
} from "@hello-pangea/dnd";
import { format } from "date-fns";

interface FormState {
    id: number;
    expanded: boolean;
    startDate: Date | null;
    endDate: Date | null;
    tickets: TicketType[];
}

interface ScheduleItemProps {
    form: FormState;
    index: number;
    toggleForm: (id: number) => void;
    removeForm: (id: number) => void;
    handleSaveTicket: (id: number, ticket: TicketType) => void;
    handleDateChange: (
        id: number,
        dateType: "startDate" | "endDate",
        date: Date | null
    ) => void;
    handleEditTicket?: (
        scheduleId: number,
        index: number,
        updatedTicket: TicketType
    ) => void;
    handleDeleteTicket?: (scheduleId: number, index: number) => void;
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
    handleEditTicket,
    handleDeleteTicket,
}) => {
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [editingTicketIndex, setEditingTicketIndex] = useState<number | null>(
        null
    );
    const [tickets, setTickets] = useState<TicketType[]>(form.tickets);

    // Đồng bộ trạng thái tickets với form.tickets
    React.useEffect(() => {
        setTickets(form.tickets);
    }, [form.tickets]);

    const handleEdit = (index: number) => {
        setEditingTicketIndex(index);
        setEditDialogOpen(true);
    };

    const handleSaveEdit = (updatedTicket: TicketType) => {
        if (editingTicketIndex !== null && handleEditTicket) {
            handleEditTicket(form.id, editingTicketIndex, updatedTicket);
            setEditDialogOpen(false);
            setEditingTicketIndex(null);
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination || !handleEditTicket) return;

        const reorderedTickets = Array.from(tickets);
        const [movedTicket] = reorderedTickets.splice(result.source.index, 1);
        reorderedTickets.splice(result.destination.index, 0, movedTicket);

        // Cập nhật trạng thái cục bộ
        setTickets(reorderedTickets);

        // Cập nhật trạng thái cha với danh sách vé đã sắp xếp lại
        reorderedTickets.forEach((ticket, idx) => {
            handleEditTicket(form.id, idx, {
                ...ticket,
                ticketId: ticket.ticketId || `temp-${form.id}-${idx}`,
            });
        }); 
    };

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
            <div
                className="flex justify-between items-center mb-4"
                onClick={() => toggleForm(form.id)}
            >
                <h3 className="font-semibold text-lg text-white">
                    {form.expanded
                        ? "Ngày Sự Kiện"
                        : form.tickets.length > 0
                        ? `${form.tickets.length} Loại Vé`
                        : "Vui lòng nhập thông tin suất diễn"}
                </h3>
                <div className="flex items-center space-x-3">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleForm(form.id);
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300 hover:bg-gray-700 rounded-full transition-transform hover:scale-110 focus:ring-2 ring-green-400"
                        aria-label={
                            form.expanded ? "Thu gọn form" : "Mở rộng form"
                        }
                    >
                        {form.expanded ? (
                            <ChevronUp size={20} />
                        ) : (
                            <ChevronDown size={20} />
                        )}
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            removeForm(form.id);
                        }}
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
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ScheduleForm
                            form={form}
                            handleSaveTicket={handleSaveTicket}
                            handleDateChange={handleDateChange}
                        />
                        {tickets.length > 0 && (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId={`tickets-${form.id}`}>
                                    {(provided: DroppableProvided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="mt-4 space-y-4"
                                        >
                                            {tickets.map((ticket, idx) => (
                                                <Draggable
                                                    key={
                                                        ticket.ticketId ||
                                                        `temp-${form.id}-${idx}`
                                                    }
                                                    draggableId={`ticket-${
                                                        form.id
                                                    }-${
                                                        ticket.ticketId ||
                                                        `temp-${form.id}-${idx}`
                                                    }`}
                                                    index={idx}
                                                >
                                                    {(
                                                        provided: DraggableProvided,
                                                        snapshot
                                                    ) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={cn(
                                                                "bg-gray-700 p-4 rounded-lg flex items-center justify-between shadow-md border border-gray-600 hover:shadow-lg transition-shadow duration-200",
                                                                snapshot.isDragging &&
                                                                    "bg-gray-600 shadow-xl scale-105 transition-transform"
                                                            )}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div className="text-gray-400 cursor-move">
                                                                    <GripVertical
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-white font-medium">
                                                                        {
                                                                            ticket.ticketName
                                                                        }
                                                                    </h4>
                                                                    <p className="text-gray-300 text-sm">
                                                                        Giá:{" "}
                                                                        {ticket.isFree
                                                                            ? "Miễn phí"
                                                                            : `${ticket.price.toLocaleString()} VNĐ`}
                                                                    </p>
                                                                    <p className="text-gray-400 text-sm">
                                                                        Bán từ:{" "}
                                                                        {ticket.startSaleDate
                                                                            ? format(
                                                                                  typeof ticket.startSaleDate ===
                                                                                      "string"
                                                                                      ? new Date(
                                                                                            ticket.startSaleDate
                                                                                        )
                                                                                      : ticket.startSaleDate,
                                                                                  "dd-MM-yyyy HH:mm"
                                                                              )
                                                                            : "N/A"}
                                                                    </p>
                                                                    <p className="text-gray-400 text-sm">
                                                                        Đến:{" "}
                                                                        {ticket.endSaleDate
                                                                            ? format(
                                                                                  typeof ticket.endSaleDate ===
                                                                                      "string"
                                                                                      ? new Date(
                                                                                            ticket.endSaleDate
                                                                                        )
                                                                                      : ticket.endSaleDate,
                                                                                  "dd-MM-yyyy HH:mm"
                                                                              )
                                                                            : "N/A"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {handleEditTicket &&
                                                                handleDeleteTicket && (
                                                                    <div className="flex space-x-2">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                handleEdit(
                                                                                    idx
                                                                                );
                                                                            }}
                                                                            className="text-blue-400 hover:text-blue-300 hover:bg-gray-600 rounded-full p-2"
                                                                            disabled={
                                                                                snapshot.isDragging
                                                                            }
                                                                        >
                                                                            <Edit2
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        </Button>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                handleDeleteTicket(
                                                                                    form.id,
                                                                                    idx
                                                                                );
                                                                            }}
                                                                            className="text-red-400 hover:text-red-300 hover:bg-gray-600 rounded-full p-2"
                                                                            disabled={
                                                                                snapshot.isDragging
                                                                            }
                                                                        >
                                                                            <Trash2
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {editingTicketIndex !== null && (
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent
                        className="bg-gray-900 text-white border-gray-700 max-w-5xl"
                        onPointerDownOutside={(e) => e.preventDefault()}
                        onInteractOutside={(e) => e.preventDefault()}
                    >
                        <DialogHeader className="flex justify-between items-center">
                            <DialogTitle className="text-center flex-1">
                                Chỉnh sửa loại vé
                            </DialogTitle>
                        </DialogHeader>
                        <TicketFormContent
                            onSave={handleSaveEdit}
                            initialData={form.tickets[editingTicketIndex]}
                            setOpen={setEditDialogOpen}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </motion.div>
    );
};

export default React.memo(ScheduleItem);
