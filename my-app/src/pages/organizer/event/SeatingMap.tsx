import React, { useRef, useEffect, useState } from 'react';

interface Seat {
  id: string;
  x: number;
  y: number;
  radius: number;
  status: 'available' | 'selected' | 'unavailable';
  row: string;
}

interface SeatingMapProps {
  imageSrc: string;
  mapId?: number; // Thêm mapId để cập nhật đúng bản ghi
}

const SeatingMap: React.FC<SeatingMapProps> = ({ imageSrc, mapId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image] = useState<HTMLImageElement>(new Image());
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [configuration, setConfiguration] = useState<string>('');

  useEffect(() => {
    image.src = imageSrc;
    image.onload = () => {
      generateSeats();
      drawCanvas();
    };
  }, [image, imageSrc]);

  useEffect(() => {
    drawCanvas();
  }, [position, scale, selectedSeats]);

  const generateSeats = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const seatRadius = 10;
    const spacing = 40; // Khoảng cách giữa các ghế
    const startX = 100; // Bắt đầu từ x
    const startY = 150; // Bắt đầu từ y
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
    const seatsPerRow = [5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5]; // Số ghế mỗi hàng (dựa trên ảnh ví dụ)

    const newSeats: Seat[] = [];
    let seatId = 0;

    rows.forEach((row, rowIndex) => {
      const seatsInRow = seatsPerRow[rowIndex];
      for (let i = 0; i < seatsInRow; i++) {
        const x = startX + i * spacing + (rowIndex < 8 ? 0 : 200); // Phân chia hai bên
        const y = startY + rowIndex * spacing;
        const status = Math.random() > 0.2 ? 'available' : 'unavailable'; // 80% trống, 20% không chọn được
        newSeats.push({
          id: `${row}${i + 1}`,
          x,
          y,
          radius: seatRadius,
          status,
          row,
        });
        seatId++;
      }
    });

    setSeats(newSeats);
    const config = JSON.stringify(newSeats);
    setConfiguration(config);
    console.log('Configuration JSON:', config); // Hiển thị để bạn lưu vào DB
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.scale(scale, scale);
    ctx.drawImage(image, 0, 0);

    seats.forEach(seat => {
      const isSelected = selectedSeats.includes(seat.id);
      ctx.beginPath();
      ctx.arc(seat.x, seat.y, seat.radius, 0, Math.PI * 2);
      ctx.fillStyle = seat.status === 'unavailable' ? '#FF0000' : isSelected ? '#00FF00' : '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1 / scale;
      ctx.stroke();
    });

    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left - position.x,
      y: e.clientY - rect.top - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left - dragStart.x,
      y: e.clientY - rect.top - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - position.x) / scale;
    const clickY = (e.clientY - rect.top - position.y) / scale;

    seats.forEach(seat => {
      const distance = Math.sqrt((clickX - seat.x) ** 2 + (clickY - seat.y) ** 2);
      if (distance <= seat.radius && seat.status === 'available') {
        setSelectedSeats(prev =>
          prev.includes(seat.id)
            ? prev.filter(id => id !== seat.id)
            : [...prev, seat.id]
        );
      }
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const newScale = scale + (e.deltaY > 0 ? -zoomSpeed : zoomSpeed);
    if (newScale >= 0.5 && newScale <= 3) {
      setScale(newScale);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative bg-black min-h-screen flex flex-col items-center p-4">
      <button className="absolute top-4 left-4 text-green-500 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Trở về
      </button>

      <div className="absolute top-4 right-4 flex space-x-4 text-white">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white rounded-full mr-2"></div>
          Đang trống
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          Đang chọn
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          Không chọn được
        </div>
      </div>

      <div className="text-white text-lg font-bold mb-2">SÂN KHẤU</div>

      <div className="absolute left-4 top-1/4 flex flex-col space-y-2">
        <button onClick={zoomIn} className="bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center">
          +
        </button>
        <button onClick={resetZoom} className="bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center">
          ↺
        </button>
        <button onClick={zoomOut} className="bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center">
          -
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={800}
        className="border border-gray-300 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        onWheel={handleWheel}
      />

      <div className="mt-4 text-white">
        <h3 className="text-lg font-semibold">Ghế đã chọn:</h3>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn ghế'}</p>
      </div>

      <div className="mt-4 text-white">
        <h3 className="text-lg font-semibold">Configuration (sao chép để lưu vào DB):</h3>
        <textarea
          value={configuration}
          readOnly
          className="w-full p-2 bg-gray-800 text-white rounded"
          rows={5}
        />
      </div>
    </div>
  );
};

export default SeatingMap;