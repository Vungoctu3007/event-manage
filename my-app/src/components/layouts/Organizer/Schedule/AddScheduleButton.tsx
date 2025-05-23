import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface AddScheduleButtonProps {
    onAdd: () => void;
}

const AddScheduleButton: React.FC<AddScheduleButtonProps> = ({ onAdd }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center mt-8"
        >
            <Button
                onClick={onAdd}
                className="flex items-center space-x-2 w-48 justify-center bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 rounded-full font-semibold py-3 shadow-lg hover:shadow-green-500/20"
            >
                <Plus size={20} />
                <span>Tạo suất mới</span>
            </Button>
        </motion.div>
    );
};

export default React.memo(AddScheduleButton);