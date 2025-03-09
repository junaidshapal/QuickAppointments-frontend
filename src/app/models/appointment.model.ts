export interface Appointment {
    id: number;
    doctorId: string;
    customerId: number;
    appointmentDate: string; // Format: YYYY-MM-DD
    startTime: string; // Format: HH:mm:ss
    endTime: string; // Format: HH:mm:ss
    status: string; // "Pending", "Confirmed", "Completed", "Canceled"
  }
  