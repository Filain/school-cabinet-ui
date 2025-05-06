import { urls } from "@/constants/urls";
import { apiService } from "@/services/apiService";
import { IUser } from "@/services/authService";

export interface IStatic {
  total: number;
  agree: number;
  inWork: number;
  disagree: number;
  newOrders: number;
}

export interface IUserResponseData {
  data: IUser[];
  total: number;
}

export interface ICreateUser {
  name: string;
  surname: string;
  email: string;
}

const adminService = {
  async getStatic(): Promise<IStatic> {
    const { data } = await apiService.get(urls.admin.static);
    return data;
  },
  async getAll(page: string): Promise<IUserResponseData> {
    const { data } = await apiService.get(urls.admin.getAll, { params: { page } });
    return data;
  },
  async create(dto: ICreateUser): Promise<IUser> {
    const { data } = await apiService.post(urls.admin.create, dto);
    return data;
  },
  async ban(id: string): Promise<IUser> {
    const { data } = await apiService.patch(urls.admin.ban(id));
    return data;
  },
  async unban(id: string): Promise<IUser> {
    const { data } = await apiService.patch(urls.admin.unban(id));
    return data;
  },
  async getActivationToken(id: string): Promise<boolean> {
    const { data } = await apiService.post(urls.admin.getActivationToken(id));
    return data;
  },
  async changePassword(token: string, password: string): Promise<boolean> {
    // console.log("adminService.changePassword", token, password);
    const { data } = await apiService.patch(urls.admin.changePassword, { token, password });
    return data;
  },
};

export { adminService };
