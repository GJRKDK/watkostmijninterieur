import { IFormDataType } from "../context/FormContext";

export const roomValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 0) {
    const roomIsSelected = selectedFormValues.rooms.some((room) => room.isSelected);
    if (!roomIsSelected) {
      setError({ rooms: "At least one room must be selected." });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const floorValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 1) {
    const floorIsSelected = selectedFormValues.rooms.every(
      (room) => !room.isSelected || room.floors.some((floor) => floor.isSelected),
    );
    if (!floorIsSelected) {
      setError({ floors: "At least one floor must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const roomSizeValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 2) {
    const roomSizeIsSelected = selectedFormValues.rooms.every(
      (room) => !room.isSelected || room.roomSizes.some((size) => size.isSelected),
    );
    if (!roomSizeIsSelected) {
      setError({ roomSizes: "At least one floor size must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const windowDecorationValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 3) {
    const windowDecorationSelected = selectedFormValues.rooms.every(
      (room) =>
        !room.isSelected || room.windowDecoration?.some((decoration) => decoration.isSelected),
    );
    if (!windowDecorationSelected) {
      setError({ windowDecoration: "At least one window decoration must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const windowDecorationDetailsValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 4) {
    const windowDecorationDetailsSelected = selectedFormValues.rooms.every(
      (room) =>
        !room.isSelected ||
        room.windowDecorationDetails?.some((detail) =>
          detail.details.some((details) => details.isSelected),
        ),
    );
    if (!windowDecorationDetailsSelected) {
      setError({
        windowDecorationDetails: "At least one window decoration detail must be selected",
      });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const amountWindowValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 5) {
    const amountWindowSelected = selectedFormValues.rooms.every(
      (room) => !room.isSelected || room.amountWindows?.some((amount) => amount.isSelected),
    );
    if (!amountWindowSelected) {
      setError({ amountWindows: "At least one amount of windows must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const windowSizeValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 6) {
    const validationResults = selectedFormValues.rooms.map((room) => {
      const requiredWindows = parseInt(
        room.amountWindows?.find((window) => window.isSelected)?.amount || "0",
      );

      const selectedWindowSizes = room.windowSizes || [];
      const missingSizes = requiredWindows - selectedWindowSizes.length;

      return {
        roomLabel: room.label,
        missingSizes: missingSizes > 0 ? missingSizes : 0,
      };
    });

    const hasErrors = validationResults.some((result) => result.missingSizes > 0);
    if (hasErrors) {
      setError({ windowSizes: "All windows must have sizes selected." });
      return false;
    } else {
      setError({});
      return true;
    }
  }
  return true;
};

export const curtainInbetweenValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 7) {
    const curtainInbetweenSizeSelected = selectedFormValues.rooms.every(
      (room) => !room.isSelected || room.curtainInbetweenSizes?.some((size) => size.isSelected),
    );

    if (!curtainInbetweenSizeSelected) {
      setError({
        curtainInbetweenSizes: "At least one curtain or inbetween size must be selected",
      });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const furnitureValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 8) {
    const furnitureSelected = selectedFormValues.rooms.every(
      (room) => !room.isSelected || room.furniture?.some((furniture) => furniture.isSelected),
    );

    if (!furnitureSelected) {
      setError({ furniture: "At least one furniture must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const furnitureDetailsValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 9) {
    const furnitureDetailsValid = selectedFormValues.rooms.every((room) => {
      if (!room.isSelected) return true; // Skip non-selected rooms

      const selectedFurniture = room.furniture?.filter((furniture) => furniture.isSelected);
      if (!selectedFurniture || selectedFurniture.length === 0) return true; // Skip if no furniture is selected

      const hasValidFurniture = selectedFurniture.some(
        (furniture) => furniture.label !== "No furniture",
      );
      if (!hasValidFurniture) return true; // Skip if "No furniture" is selected

      return room.furnitureDetails?.some((detail) => detail.isSelected) || false; // Validate furniture details
    });

    if (!furnitureDetailsValid) {
      setError({ furnitureDetails: "At least one furniture detail should be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};
