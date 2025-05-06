import { urls } from "@/constants/urls";
import { apiService } from "@/services/apiService";
import { IUser } from "@/services/authService";

export interface IComment {
  _id?: string;
  comment: string;
  order?: string;
  commentedBy?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

const commentService = {
  async getAll(id: string): Promise<IComment[]> {
    const { data } = await apiService.get(urls.comment.getAll(id));
    return data;
  },

  async create(id: string, dto: { comment: string }): Promise<IComment> {
    const { data } = await apiService.post(urls.comment.post(id), dto);
    return data;
  },
};

export { commentService };
