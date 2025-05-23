import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { TicketType } from "@/types/Ticket";
import ScheduleSelector from "@/components/layouts/Organizer/Ticket/ScheduleSelector";
import ScheduleItem from "@/components/layouts/Organizer/Ticket/ScheduleItem";
import AddScheduleButton from "@/components/layouts/Organizer/Schedule/AddScheduleButton";
import TicketList from "@/components/layouts/Organizer/Ticket/TicketList";


interface FormState {
    id: number;
    expanded: boolean;
    startDate: Date | null;
    endDate: Date | null;
}

const ScheduleTickets: React.FC = () => {
    const [ticketForms, setTicketForms] = useState<FormState[]>([]);
    const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);

    useEffect(() => {
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
    }, []);

    const handleAddNewForm = useCallback(() => {
        setTicketForms((prev) => [
            {
                id: Date.now(),
                expanded: true,
                startDate: new Date("2025-05-14T07:00:00"),
                endDate: new Date("2025-05-16T07:07:00"),
            },
            ...prev.map((form) => ({ ...form, expanded: false })),
        ]);
    }, []);

    const toggleForm = useCallback((id: number) => {
        setTicketForms((prev) =>
            prev.map((f) => (f.id === id ? { ...f, expanded: !f.expanded } : f))
        );
    }, []);

    const removeForm = useCallback((id: number) => {
        setTicketForms((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const handleSaveTicket = useCallback((id: number, ticket: TicketType) => {
        setTicketTypes((prev) => [...prev, ticket]);
        removeForm(id);
    }, [removeForm]);

    const handleDateChange = useCallback((id: number, dateType: "startDate" | "endDate", date: Date | null) => {
        setTicketForms((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [dateType]: date } : f))
        );
    }, []);

    const handleEditTicket = useCallback((index: number) => {
        console.log("Edit ticket at index:", index);
        // Logic edit (mở form edit với ticket hiện tại)
    }, []);

    const handleDeleteTicket = useCallback((index: number) => {
        setTicketTypes((prev) => prev.filter((_, i) => i !== index));
        console.log("Delete ticket at index:", index);
        // Logic delete (gọi API xóa ticket)
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-8"
                >
                    <ScheduleSelector
                        ticketForms={ticketForms}
                        selectedSchedule={selectedSchedule}
                        onSelectSchedule={setSelectedSchedule}
                    />
                </motion.div>

                <div className="space-y-6">
                    {ticketForms.map((form, index) => (
                        <ScheduleItem
                            key={form.id}
                            form={form}
                            index={index}
                            toggleForm={toggleForm}
                            removeForm={removeForm}
                            handleSaveTicket={handleSaveTicket}
                            handleDateChange={handleDateChange}
                        />
                    ))}
                </div>

                <AddScheduleButton onAdd={handleAddNewForm} />

                <TicketList
                    ticketTypes={ticketTypes}
                    onEdit={handleEditTicket}
                    onDelete={handleDeleteTicket}
                />
            </div>
        </div>
    );
};

export default React.memo(ScheduleTickets);