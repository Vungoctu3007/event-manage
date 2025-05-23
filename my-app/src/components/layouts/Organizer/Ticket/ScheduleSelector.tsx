import React from "react";
import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FormState {
    id: number;
    expanded: boolean;
    startDate: Date | null;
    endDate: Date | null;
}

interface ScheduleSelectorProps {
    ticketForms: FormState[];
    selectedSchedule: string | null;
    onSelectSchedule: (value: string | null) => void;
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
    ticketForms,
    selectedSchedule,
    onSelectSchedule,
}) => {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Thời Gian</h2>
            <Select onValueChange={(value) => onSelectSchedule(value)}>
                <SelectTrigger className="w-[300px] bg-white border-gray-600 text-white hover:bg-gray-200 hover:border-gray-500 transition-colors">
                    <SelectValue placeholder="Vui lòng chọn thời gian suất diễn" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-700 text-white">
                    {ticketForms.map((form) => (
                        <SelectItem key={form.id} value={form.id.toString()}>
                            {form.startDate && form.endDate
                                ? `${format(form.startDate, "dd-MM-yyyy HH:mm")} - ${format(
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
    );
};

export default React.memo(ScheduleSelector);