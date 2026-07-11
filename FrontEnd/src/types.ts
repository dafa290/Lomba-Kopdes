export interface CommodityPrice {
  id: string;
  name: string;
  price: number;
  unit: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  info: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface LoanSimResult {
  loanAmount: number;
  tenureMonths: number;
  monthlyInstallment: number;
  totalInterest: number;
  totalRepayment: number;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  role: string;
  status: 'Aktif' | 'Menunggu' | 'Non-aktif' | string;
  joinDate: string;
  location?: string;
}

export interface Loan {
  id: string;
  name: string;
  phone: string;
  amount: number;
  type: 'yarnen' | 'umkm' | string;
  tenure: number;
  status: 'Menunggu' | 'Disetujui' | 'Ditolak' | string;
  date: string;
  purpose: string;
  quorum?: { setuju: number; total: number };
}
