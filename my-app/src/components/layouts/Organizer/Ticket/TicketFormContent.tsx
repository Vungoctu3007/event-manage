import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import type { TicketType } from "@/types/Ticket";
import ImageUpload from "../Event/ImageUpload";

interface DateTimePickerProps {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    label: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
    value,
    onChange,
    label,
}) => {
    const [date, setDate] = useState<Date | undefined>(value);
    const [time, setTime] = useState<string>(
        value ? format(value, "HH:mm") : "14:14"
    );

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        if (newDate && time) {
            const [hours, minutes] = time.split(":");
            const updatedDate = new Date(
                newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10))
            );
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

interface TicketFormContentProps {
    onSave: (ticket: TicketType) => void;
    initialData?: TicketType;
    setOpen: (open: boolean) => void;
}

const TicketFormContent: React.FC<TicketFormContentProps> = ({
    onSave,
    initialData,
    setOpen,
}) => {
    const [ticketName, setTicketName] = useState(initialData?.ticketName || "");
    const [price, setPrice] = useState(initialData?.price || 0);
    const [isFree, setIsFree] = useState(initialData?.isFree || false);
    const [totalQuantity, setTotalQuantity] = useState(
        initialData?.totalQuantity || 10
    );
    const [minPerOrder, setMinPerOrder] = useState(
        initialData?.minPerOrder || 1
    );
    const [maxPerOrder, setMaxPerOrder] = useState(
        initialData?.maxPerOrder || 10
    );
    const [startSaleDate, setStartSaleDate] = useState<Date | undefined>(
        initialData?.startSaleDate
            ? typeof initialData.startSaleDate === "string"
                ? new Date(initialData.startSaleDate)
                : initialData.startSaleDate
            : new Date(2025, 4, 16, 14, 14)
    );
    const [endSaleDate, setEndSaleDate] = useState<Date | undefined>(
        initialData?.endSaleDate
            ? typeof initialData.endSaleDate === "string"
                ? new Date(initialData.endSaleDate)
                : initialData.endSaleDate
            : new Date(2025, 4, 15, 7, 0)
    );
    const [description, setDescription] = useState(
        initialData?.description || ""
    );
    const [image, setImage] = useState<File | null>(initialData?.image || null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setTicketName(initialData.ticketName || "");
            setPrice(initialData.price || 0);
            setIsFree(initialData.isFree || false);
            setTotalQuantity(initialData.totalQuantity || 10);
            setMinPerOrder(initialData.minPerOrder || 1);
            setMaxPerOrder(initialData.maxPerOrder || 10);
            setStartSaleDate(
                initialData.startSaleDate
                    ? typeof initialData.startSaleDate === "string"
                        ? new Date(initialData.startSaleDate)
                        : initialData.startSaleDate
                    : new Date(2025, 4, 16, 14, 14)
            );
            setEndSaleDate(
                initialData.endSaleDate
                    ? typeof initialData.endSaleDate === "string"
                        ? new Date(initialData.endSaleDate)
                        : initialData.endSaleDate
                    : new Date(2025, 4, 15, 7, 0)
            );
            setDescription(initialData.description || "");
            setImage(initialData.image || null);
            if (initialData.image) {
                setImagePreview(URL.createObjectURL(initialData.image));
            }
        }
    }, [initialData]);

    const handleSave = () => {
        if (!ticketName) {
            alert("Vui lòng nhập tên vé!");
            return;
        }
        if (!isFree && price <= 0) {
            alert("Giá vé phải lớn hơn 0 nếu không phải vé miễn phí!");
            return;
        }
        if (totalQuantity <= 0) {
            alert("Tổng số lượng vé phải lớn hơn 0!");
            return;
        }
        if (minPerOrder <= 0) {
            alert("Số lượng tối thiểu mỗi đơn phải lớn hơn 0!");
            return;
        }
        if (maxPerOrder < minPerOrder) {
            alert(
                "Số lượng tối đa mỗi đơn phải lớn hơn hoặc bằng số lượng tối thiểu!"
            );
            return;
        }
        if (totalQuantity < maxPerOrder) {
            alert(
                "Tổng số lượng vé phải lớn hơn hoặc bằng số lượng tối đa mỗi đơn!"
            );
            return;
        }
        if (!startSaleDate || !endSaleDate) {
            alert("Vui lòng chọn thời gian bắt đầu và kết thúc bán vé!");
            return;
        }
        if (endSaleDate < startSaleDate) {
            alert("Thời gian kết thúc bán vé phải sau thời gian bắt đầu!");
            return;
        }

        const newTicket: TicketType = {
            ticketId: initialData?.ticketId,
            ticketName,
            price: isFree ? 0 : price,
            isFree,
            totalQuantity,
            minPerOrder,
            maxPerOrder,
            startSaleDate: startSaleDate.toISOString(),
            endSaleDate: endSaleDate.toISOString(),
            description,
            image,
        };
        onSave(newTicket);
        setOpen(false);
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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

                <div className="md:col-span-2">
                    <Label className="text-sm mb-1 block text-white">
                        <span className="text-red-500">*</span> Tổng số lượng vé
                    </Label>
                    <Input
                        type="number"
                        value={totalQuantity}
                        onChange={(e) =>
                            setTotalQuantity(parseInt(e.target.value) || 0)
                        }
                        className="bg-white text-black border-gray-300 w-full"
                    />
                </div>

                <div className="md:col-span-2">
                    <Label className="text-sm mb-1 block text-white">
                        <span className="text-red-500">*</span> Số vé tối thiểu
                        trong một đơn hàng
                    </Label>
                    <Input
                        type="number"
                        value={minPerOrder}
                        onChange={(e) =>
                            setMinPerOrder(parseInt(e.target.value) || 0)
                        }
                        className="bg-white text-black border-gray-300 w-full"
                    />
                </div>

                <div className="md:col-span-2">
                    <Label className="text-sm mb-1 block text-white">
                        <span className="text-red-500">*</span> Số vé tối đa
                        trong một đơn hàng
                    </Label>
                    <Input
                        type="number"
                        value={maxPerOrder}
                        onChange={(e) =>
                            setMaxPerOrder(parseInt(e.target.value) || 0)
                        }
                        className="bg-white text-black border-gray-300 w-full"
                    />
                </div>

                <div className="md:col-span-2">
                    <DateTimePicker
                        value={startSaleDate}
                        onChange={setStartSaleDate}
                        label="Thời gian bắt đầu bán vé"
                    />
                </div>

                <div className="md:col-span-2">
                    <DateTimePicker
                        value={endSaleDate}
                        onChange={setEndSaleDate}
                        label="Thời gian kết thúc bán vé"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-3">
                    <Label className="text-sm mb-1 block text-white">
                        Thông tin vé
                    </Label>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        maxLength={1000}
                        className="bg-white text-black border-gray-300 w-full h-24 resize-y"
                        style={{ maxHeight: "160px" }}
                    />
                    <span className="text-xs text-gray-500 float-right">
                        {description.length}/1000
                    </span>
                </div>

                <div className="md:col-span-1">
                    <Label className="text-sm mb-1 block text-white">
                        Hình ảnh vé
                    </Label>
                    <ImageUpload
                        onFileChange={setImage}
                        preview={imagePreview}
                        setPreview={setImagePreview}
                        width="100%"
                        height="100px"
                        label=""
                        dimensions="Tối đa 1MB"
                    />
                </div>
            </div>

            <div className="w-full">
                <Button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-none"
                >
                    {initialData ? "Cập nhật" : "Lưu"}
                </Button>
            </div>
        </div>
    );
};

export default TicketFormContent;
