export interface Task {
  id: string; // Chuyển đổi kiểu dữ liệu của id thành string
  name: string;
  description: string;
  deadline: string;
  status: string;
  user_id: number;
}
