"use client";
import { useQuery } from "@tanstack/react-query";

import { adminService } from "@/services/adminService";

export default function StatisticComponent() {
  const { data } = useQuery({ queryKey: ["statistic"], queryFn: () => adminService.getStatic(), retry: false });
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">Orders statistic:</h2>
      <div className="flex flex-row">
        {" "}
        <p className="mx-4">
          Total: <span className="font-bold"> {data?.total}</span>
        </p>
        <p className="mx-4">
          In work: <span className="font-bold"> {data?.inWork}</span>
        </p>
        <p className="mx-4">
          Agree: <span className="font-bold"> {data?.agree}</span>
        </p>
        <p className="mx-4">
          Disagree: <span className="font-bold"> {data?.disagree}</span>
        </p>
        <p className="mx-4">
          New orders: <span className="font-bold"> {data?.newOrders}</span>
        </p>
      </div>
    </div>
  );
}
