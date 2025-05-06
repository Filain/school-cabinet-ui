import { urls } from "@/constants/urls";
import { apiService } from "@/services/apiService";

export interface IloginData {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  name?: string | null;
  surname?: string | null;
  email: string;
  password?: string | null;
  role: string;
  isActive: boolean;
  isBanned: boolean;
  inWork: number;
  total: number;
  activation?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  __v?: number;
}

const authService = {
  async login(dto: IloginData): Promise<IUser> {
    const { data } = await apiService.post(urls.auth.login, { email: dto.email, password: dto.password });
    return data;
  },
  async me(): Promise<IUser> {
    const { data } = await apiService.get(urls.auth.me);
    return data;
  },
  async logout() {
    await apiService.post(urls.auth.logout);
    return true;
  },
  async refresh() {
    const { data } = await apiService.post(urls.auth.refresh);
    // console.log(data);
    return data;
  },
};

export { authService };
