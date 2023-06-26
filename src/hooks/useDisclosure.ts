import { useState } from "react";

export interface useDisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function useDisclosure(): useDisclosureProps {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((val) => !val);

  return { isOpen, onOpen, onClose, onToggle };
}

export { useDisclosure };
