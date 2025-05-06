import { urls } from "@/constants/urls";
import { apiService } from "@/services/apiService";
import { IOrderQuery } from "@/services/orderService";

const exelService = {
  async getAll(query?: IOrderQuery) {
    // console.log("url", urls.excel.get);
    const response = await apiService.get(urls.excel.get, {
      params: query,
      responseType: "blob", // ✅ отримуємо Excel у вигляді Blob
    });

    // ✅ Створюємо URL для завантаження
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);

    // ✅ Створюємо <a> і симулюємо клік
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.xlsx");
    document.body.appendChild(link);
    link.click();

    // ✅ Чистимо DOM
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};

export { exelService };
