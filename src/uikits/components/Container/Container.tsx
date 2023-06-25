import type React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto min-h-screen bg-white p-6">
      <div>{children}</div>
    </div>
  );
};

export { Container };
