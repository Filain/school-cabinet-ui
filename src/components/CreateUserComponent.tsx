"use client";

import CreateUserFormComponent from "@/components/CreateUserFormComponent";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useModalStore } from "@/store/useModalStore";

export default function CreateUserComponent() {
  const { modal, setModal } = useModalStore();
  return (
    <div className="flex justify-start p-4 w-full max-w-[1300px] mx-auto">
      <Button type={"button"} onClick={() => setModal("create")}>
        CREATE USER
      </Button>
      <Modal isOpen={modal === "create"} onClose={() => setModal(null)}>
        <CreateUserFormComponent />
      </Modal>
    </div>
  );
}
