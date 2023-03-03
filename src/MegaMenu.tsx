import { useFloating, offset, autoUpdate } from "@floating-ui/react";
import { useSelect } from "downshift";


export const MegaMenu = () => {
    const { reference } = useFloating<HTMLButtonElement>({
        placement: "top",
        open: false,
        whileElementsMounted: autoUpdate,
        middleware: [offset(10)],
    });

    const { getToggleButtonProps } = useSelect({
        selectedItem: null,
        items: [],
    });

    return (
        <button
            {...getToggleButtonProps({
                ref: reference,
                onClick: () => {},
            })}
        >
            12312
        </button>
    );
};
