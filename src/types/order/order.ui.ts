export interface Course {
  title: string;
}

export interface OrderItem {
  id: string;
  course: Course;
}

export interface Order {
  id: string;
  orderNumber: string | null;
  status: string;
  currency: string;
  totalCents: number;
  items: OrderItem[];
}
