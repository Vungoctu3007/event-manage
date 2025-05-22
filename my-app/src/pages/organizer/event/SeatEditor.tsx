import { useState } from "react";

type Seat = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export default function SeatEditor() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const label = prompt("Nhập tên ghế (VD: A1, B2):");
    if (!label) return;

    setSeats([...seats, { id: crypto.randomUUID(), label, x, y }]);
  };

  const handleMouseDown = (id: string) => {
    setDraggingId(id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!draggingId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === draggingId ? { ...seat, x, y } : seat
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const exportSeats = () => {
    const blob = new Blob([JSON.stringify(seats, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seats.json";
    a.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">🎛️ Cấu hình sơ đồ ghế (kéo thả)</h2>
      <div
        className="relative w-[800px] h-auto border"
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <img
          src="https://res.cloudinary.com/dm1alq68q/image/upload/v1747828965/images/seating_map/682dc0e2c6589.png"
          alt="seatmap"
          className="w-full h-auto object-contain"
        />

        {seats.map((seat) => (
          <div
            key={seat.id}
            onMouseDown={() => handleMouseDown(seat.id)}
            className="absolute w-6 h-6 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full cursor-move"
            style={{
              left: `${seat.x}px`,
              top: `${seat.y}px`,
              transform: "translate(-50%, -50%)",
            }}
            title="Kéo để di chuyển"
          >
            {seat.label}
          </div>
        ))}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={exportSeats}
      >
        💾 Lưu JSON ghế
      </button>
    </div>
  );
}
