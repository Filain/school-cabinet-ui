"use client";

import CreateOrderComponent from "@/components/CreateOrderComponent.tsx";
import FilterComponent from "@/components/FilterComponent";
import OrdersComponent from "@/components/OrderContainer/OrdersComponent";
import PaginationComponent from "@/components/PaginationComponent";

export default function Order() {
  return (
    <>
      <FilterComponent />
      <CreateOrderComponent />
      <OrdersComponent />
      <PaginationComponent />
    </>
  );
}
