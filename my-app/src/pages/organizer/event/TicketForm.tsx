import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Plus } from "lucide-react";
import type { TicketType } from "@/types/TicketType";

interface TicketFormProps {
    onSave: (ticket: TicketType) => void;
}

const DateTimePicker: React.FC<{
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    label: string;
}> = ({ value, onChange, label }) => {
    const [date, setDate] = useState<Date | undefined>(value);
    const [time, setTime] = useState<string>(
        value ? format(value, "HH:mm") : "14:14"
    );

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        if (newDate && time) {
            const [hours, minutes] = time.split(":");
            const updatedDate = newDate
                ? new Date(
                      newDate.setHours(
                          parseInt(hours, 10),
                          parseInt(minutes, 10)
                      )
                  )
                : undefined;
            onChange(updatedDate);
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
        if (date && e.target.value) {
            const [hours, minutes] = e.target.value.split(":");
            const updatedDate = new Date(
                date.setHours(parseInt(hours, 10), parseInt(minutes, 10))
            );
            onChange(updatedDate);
        }
    };

    return (
        <div>
            <Label className="text-sm mb-1 block text-white">
                <span className="text-red-500">*</span> {label}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal bg-white text-black border-gray-300",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? (
                            format(date, "dd-MM-yyyy HH:mm")
                        ) : (
                            <span>Chọn ngày</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                    />
                    <div className="p-2 border-t">
                        <Input
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            className="w-full bg-white text-black border-gray-300"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

const TicketForm: React.FC<TicketFormProps> = ({ onSave }) => {
    const [open, setOpen] = useState(false);
    const [ticketName, setTicketName] = useState("");
    const [price, setPrice] = useState(0);
    const [isFree, setIsFree] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(10);
    const [minPerOrder, setMinPerOrder] = useState(1);
    const [maxPerOrder, setMaxPerOrder] = useState(10);
    const [startSaleDate, setStartSaleDate] = useState<Date | undefined>(
        new Date(2025, 4, 16, 14, 14)
    );
    const [endSaleDate, setEndSaleDate] = useState<Date | undefined>(
        new Date(2025, 4, 15, 7, 0)
    );
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSave = () => {
        const newTicket: TicketType = {
            ticketName,
            price,
            isFree,
            totalQuantity,
            minPerOrder,
            maxPerOrder,
            startSaleDate,
            endSaleDate,
            description,
            image,
        };
        onSave(newTicket);
        setOpen(false); // Close only on save, but this will be overridden by the close button logic
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

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
                onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on outside click
                onInteractOutside={(e) => e.preventDefault()} // Prevent closing on Escape key
            >
                <DialogHeader className="flex justify-between items-center">
                    <DialogTitle className="text-center flex-1">
                        Tạo loại vé mới
                    </DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    {/* Form Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        {/* Ticket Name */}
                        <div className="md:col-span-4">
                            <Label className="text-sm mb-1 block text-white">
                                <span className="text-red-500">*</span> Tên vé
                            </Label>
                            <Input
                                value={ticketName}
                                onChange={(e) => setTicketName(e.target.value)}
                                placeholder="Tên vé"
                                maxLength={50}
                                className="bg-white text-black border-gray-300 w-full"
                            />
                            <span className="text-xs text-gray-500 float-right">
                                {ticketName.length}/50
                            </span>
                        </div>

                        {/* Price and Free Checkbox */}
                        <div className="md:col-span-2">
                            <Label className="text-sm mb-1 block text-white">
                                <span className="text-red-500">*</span> Giá vé
                            </Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="number"
                                    value={isFree ? 0 : price}
                                    onChange={(e) =>
                                        setPrice(parseInt(e.target.value) || 0)
                                    }
                                    disabled={isFree}
                                    className="bg-white text-black border-gray-300 w-3/4"
                                />
                                <div className="flex items-center space-x-1">
                                    <Checkbox
                                        checked={isFree}
                                        onCheckedChange={(checked) =>
                                            setIsFree(checked === true)
                                        }
                                        className="border-gray-300"
                                    />
                                    <span className="text-gray-300 text-sm">
                                        Miễn phí
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Total Quantity */}
                        <div className="md:col-span-2">
                            <Label className="text-sm mb-1 block text-white">
                                <span className="text-red-500">*</span> Tổng số
                                lượng vé
                            </Label>
                            <Input
                                type="number"
                                value={totalQuantity}
                                onChange={(e) =>
                                    setTotalQuantity(
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                className="bg-white text-black border-gray-300 w-full"
                            />
                        </div>

                        {/* Min Tickets per Order */}
                        <div className="md:col-span-2">
                            <Label className="text-sm mb-1 block text-white">
                                <span className="text-red-500">*</span> Số vé
                                tối thiểu trong một đơn hàng
                            </Label>
                            <Input
                                type="number"
                                value={minPerOrder}
                                onChange={(e) =>
                                    setMinPerOrder(
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                className="bg-white text-black border-gray-300 w-full"
                            />
                        </div>

                        {/* Max Tickets per Order */}
                        <div className="md:col-span-2">
                            <Label className="text-sm mb-1 block text-white">
                                <span className="text-red-500">*</span> Số vé
                                tối đa trong một đơn hàng
                            </Label>
                            <Input
                                type="number"
                                value={maxPerOrder}
                                onChange={(e) =>
                                    setMaxPerOrder(
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                className="bg-white text-black border-gray-300 w-full"
                            />
                        </div>

                        {/* Start Sale Date */}
                        <div className="md:col-span-2">
                            <DateTimePicker
                                value={startSaleDate}
                                onChange={setStartSaleDate}
                                label="Thời gian bắt đầu bán vé"
                            />
                        </div>

                        {/* End Sale Date */}
                        <div className="md:col-span-2">
                            <DateTimePicker
                                value={endSaleDate}
                                onChange={setEndSaleDate}
                                label="Thời gian kết thúc bán vé"
                            />
                        </div>
                    </div>

                    {/* Description and Image Upload in a separate row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        {/* Description */}
                        <div className="md:col-span-3">
                            <Label className="text-sm mb-1 block text-white">
                                Thông tin vé
                            </Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                maxLength={1000}
                                className="bg-white text-black border-gray-300 w-full h-24"
                            />
                            <span className="text-xs text-gray-500 float-right">
                                {description.length}/1000
                            </span>
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-1">
                            <Label className="text-sm mb-1 block text-white">
                                Hình ảnh vé
                            </Label>
                            <div className="border-2 border-dashed border-gray-500 p-4 text-center bg-gray-800 rounded-lg h-24 flex items-center justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="imageUpload"
                                />
                                <label
                                    htmlFor="imageUpload"
                                    className="cursor-pointer text-gray-400 hover:text-green-500 flex flex-col items-center"
                                >
                                    <svg
                                        className="w-6 h-6 mb-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <span>Thêm</span>
                                    <p className="text-xs text-gray-400">1MB</p>
                                </label>
                                {image && (
                                    <p className="text-green-500 mt-2">
                                        {image.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="w-full">
                    <Button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-none"
                    >
                        Lưu
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TicketForm;
