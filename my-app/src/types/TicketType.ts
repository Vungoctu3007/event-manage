export interface TicketType {
  ticketName: string;
  price: number;
  isFree: boolean;
  totalQuantity: number;
  minPerOrder: number;
  maxPerOrder: number;
  startSaleDate: Date | undefined;
  endSaleDate: Date | undefined;
  description: string;
  image: File | null;
}
