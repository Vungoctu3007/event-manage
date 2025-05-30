import React, { useState, useCallback } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Ticket } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";
import type { TicketType } from "@/types/Ticket";
import TicketFormContent from "./TicketFormContent";

interface TicketListProps {
    ticketTypes: TicketType[];
    onEdit: (index: number, updatedTicket: TicketType) => void;
    onDelete: (index: number) => void;
}

const TicketList: React.FC<TicketListProps> = ({
    ticketTypes,
    onEdit,
    onDelete,
}) => {
    const [openDialog, setOpenDialog] = useState<number | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [editingTicket, setEditingTicket] = useState<{
        index: number;
        ticket: TicketType;
    } | null>(null);

    const handleConfirmDelete = useCallback(
        (index: number) => {
            onDelete(index);
            setOpenDialog(null);
            toast.success("Đã xóa vé thành công!", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "#1f2937",
                    color: "#fff",
                    border: "1px solid #374151",
                },
            });
        },
        [onDelete]
    );

    const handleEdit = (index: number) => {
        setEditingTicket({ index, ticket: ticketTypes[index] });
        setEditDialogOpen(true);
    };

    const handleSaveEdit = (updatedTicket: TicketType) => {
        if (editingTicket) {
            onEdit(editingTicket.index, updatedTicket);
            setEditingTicket(null);
            setEditDialogOpen(false);
            toast.success("Cập nhật vé thành công!", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "#1f2937",
                    color: "#fff",
                    border: "1px solid #374151",
                },
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-12"
        >
            <Toaster />
            <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-gray-700 pb-3 flex items-center">
                <Ticket className="w-8 h-8 mr-3 text-green-400" />
                Danh Sách Vé
            </h2>
            {ticketTypes.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-400 text-center italic py-8 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                    <p>Chưa có loại vé nào được tạo.</p>
                    <p className="mt-2">Hãy thêm vé để bắt đầu!</p>
                </motion.div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {ticketTypes.map((type, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{
                                    duration: 0.3,
                                    delay: idx * 0.1,
                                    ease: "easeOut",
                                }}
                            >
                                <Card className="bg-gray-800/90 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                    <CardHeader className="border-b border-gray-700 pb-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-white truncate">
                                                {type.ticketName}
                                            </h3>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-blue-400 hover:text-blue-300 hover:bg-gray-700/50 rounded-full p-2 transition-all hover:scale-105"
                                                    onClick={() => handleEdit(idx)}
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
                                                            className="text-red-400 hover:text-red-300 hover:bg-gray-700/50 rounded-full p-2 transition-all hover:scale-105"
                                                        >
                                                            <Trash2 size={18} />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="bg-gray-800 border-gray-700 text-white rounded-lg">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-lg font-semibold">
                                                                Xác Nhận Xóa Vé
                                                            </DialogTitle>
                                                            <DialogDescription className="text-gray-300">
                                                                Bạn có chắc chắn muốn xóa vé{" "}
                                                                <span className="font-medium text-white">
                                                                    "{type.ticketName}"
                                                                </span>{" "}
                                                                không? Hành động này không thể hoàn tác.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter className="mt-4">
                                                            <Button
                                                                variant="outline"
                                                                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                                onClick={() => setOpenDialog(null)}
                                                            >
                                                                Hủy
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                className="bg-red-600 hover:bg-red-700 text-white"
                                                                onClick={() => handleConfirmDelete(idx)}
                                                            >
                                                                Xóa
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-4 space-y-3 text-gray-300">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Giá:</span>
                                            <Badge
                                                variant={type.isFree ? "secondary" : "default"}
                                                className={
                                                    type.isFree
                                                        ? "bg-green-500/20 text-green-300 border-green-500/50"
                                                        : "bg-blue-500/20 text-blue-300 border-blue-500/50"
                                                }
                                            >
                                                {type.isFree ? "Miễn phí" : `${type.price.toLocaleString()} VNĐ`}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Bán từ:</span>
                                            <span className="text-sm">
                                                {type.startSaleDate
                                                    ? format(
                                                          typeof type.startSaleDate === "string"
                                                              ? new Date(type.startSaleDate)
                                                              : type.startSaleDate,
                                                          "dd-MM-yyyy HH:mm"
                                                      )
                                                    : "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Đến:</span>
                                            <span className="text-sm">
                                                {type.endSaleDate
                                                    ? format(
                                                          typeof type.endSaleDate === "string"
                                                              ? new Date(type.endSaleDate)
                                                              : type.endSaleDate,
                                                          "dd-MM-yyyy HH:mm"
                                                      )
                                                    : "N/A"}
                                            </span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t border-gray-700 pt-4">
                                        <div className="flex w-full justify-between items-center text-xs text-gray-400">
                                            <span>Ngày tạo: {new Date().toLocaleDateString()}</span>
                                            <span>Mã vé: #{String(idx + 1).padStart(4, "0")}</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Dialog for editing ticket */}
            {editingTicket && (
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent
                        className="bg-gray-900 text-white border-gray-700 max-w-5xl rounded-lg"
                        onPointerDownOutside={(e) => e.preventDefault()}
                        onInteractOutside={(e) => e.preventDefault()}
                    >
                        <DialogHeader className="flex justify-between items-center">
                            <DialogTitle className="text-xl font-semibold text-center flex-1">
                                Chỉnh Sửa Loại Vé
                            </DialogTitle>
                        </DialogHeader>
                        <TicketFormContent
                            onSave={handleSaveEdit}
                            initialData={editingTicket.ticket}
                            setOpen={setEditDialogOpen}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </motion.div>
    );
};

export default React.memo(TicketList);