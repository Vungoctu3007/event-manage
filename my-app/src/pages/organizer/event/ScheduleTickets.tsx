import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { TicketType } from "@/types/Ticket";
import ScheduleSelector from "@/components/layouts/Organizer/Schedule/ScheduleSelector";
import ScheduleItem from "@/components/layouts/Organizer/Schedule/ScheduleItem";
import AddScheduleButton from "@/components/layouts/Organizer/Schedule/AddScheduleButton";

interface FormState {
    id: number;
    expanded: boolean;
    startDate: Date | null;
    endDate: Date | null;
    tickets: TicketType[];
}

const ScheduleTickets: React.FC = () => {
    const [ticketForms, setTicketForms] = useState<FormState[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(
        null
    );

    useEffect(() => {
        if (ticketForms.length === 0) {
            setTicketForms([
                {
                    id: Date.now(),
                    expanded: true,
                    startDate: new Date("2025-05-14T07:00:00"),
                    endDate: new Date("2025-05-16T07:07:00"),
                    tickets: [],
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
                tickets: [],
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
        setTicketForms((prev) =>
            prev.map((form) =>
                form.id === id
                    ? { ...form, tickets: [...form.tickets, ticket] }
                    : form
            )
        );
    }, []);

    const handleDateChange = useCallback(
        (id: number, dateType: "startDate" | "endDate", date: Date | null) => {
            setTicketForms((prev) =>
                prev.map((f) => (f.id === id ? { ...f, [dateType]: date } : f))
            );
        },
        []
    );

    const handleEditTicket = useCallback(
        (scheduleId: number, index: number, updatedTicket: TicketType) => {
            setTicketForms((prev) =>
                prev.map((form) =>
                    form.id === scheduleId
                        ? {
                              ...form,
                              tickets: form.tickets.map((ticket, i) =>
                                  i === index ? updatedTicket : ticket
                              ),
                          }
                        : form
                )
            );
        },
        []
    );

    const handleDeleteTicket = useCallback(
        (scheduleId: number, index: number) => {
            setTicketForms((prev) =>
                prev.map((form) =>
                    form.id === scheduleId
                        ? {
                              ...form,
                              tickets: form.tickets.filter(
                                  (_, i) => i !== index
                              ),
                          }
                        : form
                )
            );
        },
        []
    );

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

                <motion.div layout className="space-y-6 ">
                    {ticketForms.map((form, index) => (
                        <ScheduleItem
                            key={form.id}
                            form={form}
                            index={index}
                            toggleForm={toggleForm}
                            removeForm={removeForm}
                            handleSaveTicket={handleSaveTicket}
                            handleDateChange={handleDateChange}
                            handleEditTicket={handleEditTicket}
                            handleDeleteTicket={handleDeleteTicket}
                        />
                    ))}
                </motion.div>

                <AddScheduleButton onAdd={handleAddNewForm} />
            </div>
        </div>
    );
};

export default React.memo(ScheduleTickets);
