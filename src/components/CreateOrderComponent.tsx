"use client";

import CreateOrderFormComponent from "@/components/CreateOrderFormComponent";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useModalStore } from "@/store/useModalStore";

export default function CreateOrderComponent() {
  const { modal, setModal } = useModalStore();
  return (
    <div className="flex justify-start p-4 w-full max-w-[1494px] mx-auto">
      <Button type={"button"} onClick={() => setModal("create")}>
        CREATE ORDER
      </Button>
      <Modal onClose={() => setModal("create")} isOpen={modal === "create"}>
        <CreateOrderFormComponent />
      </Modal>
    </div>
  );
}
