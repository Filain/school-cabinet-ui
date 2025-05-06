"use client";

import OrderFormComponent from "@/components/OrderFormComponent";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useModalStore } from "@/store/useModalStore";

export default function CreateOrderComponent() {
  const { modal, setModal } = useModalStore();
  return (
    <div className="flex justify-start p-4 w-full max-w-[1494px] mx-auto">
      <Button type={"button"} onClick={() => setModal(true)}>
        CREATE ORDER
      </Button>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <OrderFormComponent isNew={true} />
      </Modal>
    </div>
  );
}
