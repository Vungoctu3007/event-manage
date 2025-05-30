import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import type { TicketType } from "@/types/Ticket";
import TicketFormContent from "@/components/layouts/Organizer/Ticket/TicketFormContent";

interface TicketFormProps {
    onSave: (ticket: TicketType) => void;
    initialData?: TicketType;
}

const TicketForm: React.FC<TicketFormProps> = ({ onSave, initialData }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex justify-center">
                <DialogTrigger asChild>
                    <Button className="w-48 px-4 py-2 bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200 flex items-center justify-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Tạo loại vé mới
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent
                className="bg-gray-900 text-white border-gray-700 max-w-5xl"
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader className="flex justify-between items-center">
                    <DialogTitle className="text-center flex-1">
                        {initialData ? "Chỉnh sửa loại vé" : "Tạo loại vé mới"}
                    </DialogTitle>
                </DialogHeader>
                <TicketFormContent onSave={onSave} initialData={initialData} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
};

export default TicketForm;