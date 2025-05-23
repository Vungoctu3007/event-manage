import React, { useState, useCallback } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { TicketType } from "@/types/Ticket";
import TicketForm from "@/pages/organizer/event/TicketForm";

interface TicketListProps {
    ticketTypes: TicketType[];
    onEdit: (index: number, updatedTicket: TicketType) => void; // Cập nhật prop để nhận updatedTicket
    onDelete: (index: number) => void;
}

const TicketList: React.FC<TicketListProps> = ({
    ticketTypes,
    onEdit,
    onDelete,
}) => {
    const [openDialog, setOpenDialog] = useState<number | null>(null);
    const [editingTicket, setEditingTicket] = useState<{
        index: number;
        ticket: TicketType;
    } | null>(null);

    const handleConfirmDelete = useCallback(
        (index: number) => {
            onDelete(index);
            setOpenDialog(null);
        },
        [onDelete]
    );

    const handleEdit = (index: number) => {
        setEditingTicket({ index, ticket: ticketTypes[index] });
    };

    const handleSaveEdit = (updatedTicket: TicketType) => {
        if (editingTicket) {
            onEdit(editingTicket.index, updatedTicket); // Gọi onEdit để cập nhật danh sách
            setEditingTicket(null); // Đóng modal
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-12"
        >
            <h2 className="text-2xl font-semibold text-white mb-6 border-b-2 border-gray-700 pb-2">
                Vé đã tạo
            </h2>
            {ticketTypes.length === 0 ? (
                <p className="text-gray-400 text-center italic py-6">
                    Chưa có loại vé nào
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                            className="bg-gray-800/90 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-gray-600"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-white">
                                    {type.ticketName}
                                </h3>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-full p-2 transition-all hover:scale-110"
                                        onClick={() => handleEdit(idx)} // Gọi handleEdit thay vì onEdit trực tiếp
                                    >
                                        <Edit2 size={18} />
                                    </Button>
                                    <Dialog
                                        open={openDialog === idx}
                                        onOpenChange={(open) =>
                                            setOpenDialog(open ? idx : null)
                                        }
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-full p-2 transition-all hover:scale-110"
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-gray-800 border-gray-700 text-white">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Xác nhận xóa vé
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Bạn có chắc chắn muốn xóa vé
                                                    "{type.ticketName}" không?
                                                    Hành động này không thể hoàn
                                                    tác.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                                    onClick={() =>
                                                        setOpenDialog(null)
                                                    }
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    className="bg-red-600 hover:bg-red-700"
                                                    onClick={() =>
                                                        handleConfirmDelete(idx)
                                                    }
                                                >
                                                    Xóa
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>
                                    Giá:{" "}
                                    {type.isFree
                                        ? "Miễn phí"
                                        : `${type.price} VNĐ`}
                                </p>
                                <p>
                                    Bán từ:{" "}
                                    {type.startSaleDate
                                        ? format(
                                              typeof type.startSaleDate ===
                                                  "string"
                                                  ? new Date(type.startSaleDate)
                                                  : type.startSaleDate,
                                              "dd-MM-yyyy HH:mm"
                                          )
                                        : "N/A"}
                                </p>
                                <p>
                                    Đến:{" "}
                                    {type.endSaleDate
                                        ? format(
                                              typeof type.endSaleDate ===
                                                  "string"
                                                  ? new Date(type.endSaleDate)
                                                  : type.endSaleDate,
                                              "dd-MM-yyyy HH:mm"
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal chứa TicketForm để chỉnh sửa */}  
            {editingTicket && (
                <TicketForm
                    onSave={handleSaveEdit}
                    initialData={editingTicket.ticket}
                />
            )}
        </motion.div>
    );
};

export default React.memo(TicketList);
