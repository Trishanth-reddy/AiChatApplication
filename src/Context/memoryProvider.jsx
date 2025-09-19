import React, { useState } from "react";
import { MemoryContext } from "./maincontext.jsx";

export const MemoryProvider = ({ children }) => {
  const [memoryData, setMemoryData] = useState({
    wyd: "",
    know: "",
    trait: "",
    pdfFile: null,
    pdfText: "",
    structuredData: null,
  });

  return (
    <MemoryContext.Provider value={{ memoryData, setMemoryData }}>
      {children}
    </MemoryContext.Provider>
  );
};