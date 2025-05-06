"use client";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    <div
      className={`fixed z-20 w-full h-full top-0 left-0 backdrop-blur overflow-x-hidden overflow-y-auto 
      flex flex-col items-center justify-center 
      transition-opacity duration-300
      ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
    >
      <div
        className={` bg-white bg-opacity-90 rounded-xl  transition-transform duration-400
              ${isOpen ? "scale-100" : "scale-10"}`}
        onClick={(event) => event.stopPropagation()}
      >
        {/*onClick={(event) => event.stopPropagation()} - Потрібно для того якщо клікаємо в середині вікна модалка не закривалась*/}
        {children}
      </div>
    </div>
  );
}
