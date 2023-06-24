import type React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="bg-white p-6 min-h-screen container mx-auto">
      <div>{children}</div>
    </div>
  );
};

export { Container };
