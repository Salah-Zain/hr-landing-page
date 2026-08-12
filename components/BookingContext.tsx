"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BookingContextType {
  isOpen: boolean;
  selectedProgram: string;
  openBookingModal: (programName?: string) => void;
  closeBookingModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("Practical HR Management & Payroll");

  const openBookingModal = (programName?: string) => {
    if (programName) {
      setSelectedProgram(programName);
    }
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        selectedProgram,
        openBookingModal,
        closeBookingModal
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
