import { useState } from "react";

type SeatStatus = "available" | "selected" | "unavailable";

// Define the structure of the seating chart: rows A-P, with varying numbers of seats per row
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
const seatsPerRow = 20; // Approximate number of seats per row based on the screenshot

// Initialize the seat statuses (for demo purposes, randomly set some as unavailable)
const initialSeats: SeatStatus[][] = rows.map((_, rowIndex) =>
  Array(seatsPerRow).fill("available").map((_, colIndex) => {
    // Simulate unavailable seats (red) for rows A-D and some in E-F, as in the screenshot
    if (rowIndex <= 3 || (rowIndex <= 5 && colIndex >= 10 && colIndex <= 15)) {
      return "unavailable";
    }
    return "available";
  })
);

export default function SeatingChart() {
  const [seats, setSeats] = useState<SeatStatus[][]>(initialSeats);

  const toggleSeat = (rowIndex: number, colIndex: number) => {
    if (seats[rowIndex][colIndex] === "unavailable") return; // Cannot select unavailable seats

    const newSeats = [...seats];
    newSeats[rowIndex][colIndex] = seats[rowIndex][colIndex] === "available" ? "selected" : "available";
    setSeats(newSeats);
  };

  return (
    <div className="p-4 bg-black text-white rounded-lg">
      {/* Title and Legend */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chọn vé</h2>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-white mr-2"></span> Đang trống
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span> Đang chọn
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span> Không chọn được
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="bg-gray-500 text-center py-4 rounded-t-lg mb-4">
        <span className="text-lg font-bold">STAGE / SÂN KHẤU</span>
      </div>

      {/* Seating Chart */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Section */}
        <div className="relative">
          {rows.map((row, rowIndex) => (
            <div key={row} className="flex items-center mb-2">
              <span className="w-8 text-center font-bold">{row}</span>
              <div className="flex flex-wrap">
                {seats[rowIndex].slice(0, seatsPerRow / 2).map((status, colIndex) => (
                  <button
                    key={colIndex}
                    onClick={() => toggleSeat(rowIndex, colIndex)}
                    className={`w-6 h-6 rounded-full m-1 ${
                      status === "available"
                        ? "bg-white hover:bg-gray-300"
                        : status === "selected"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 cursor-not-allowed"
                    }`}
                    disabled={status === "unavailable"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="relative">
          {rows.map((row, rowIndex) => (
            <div key={row} className="flex items-center mb-2">
              <div className="flex flex-wrap">
                {seats[rowIndex].slice(seatsPerRow / 2).map((status, colIndex) => (
                  <button
                    key={colIndex}
                    onClick={() => toggleSeat(rowIndex, colIndex + seatsPerRow / 2)}
                    className={`w-6 h-6 rounded-full m-1 ${
                      status === "available"
                        ? "bg-white hover:bg-gray-300"
                        : status === "selected"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 cursor-not-allowed"
                    }`}
                    disabled={status === "unavailable"}
                  />
                ))}
              </div>
              <span className="w-8 text-center font-bold">{row}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}