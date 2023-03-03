import {useFloating, offset, autoUpdate} from "@floating-ui/react";
import {useSelect} from "downshift";
import {useCallback, useEffect, useRef, useState} from "react";


export const MegaMenu = () => {
    const {reference} = useFloating<HTMLButtonElement>({
        placement: "top",
        open: false,
        whileElementsMounted: autoUpdate,
        middleware: [offset(10)],
    });

    const {getToggleButtonProps} = useSelect({
        selectedItem: null,
        items: [],
    });

    return (
        <button
            {...getToggleButtonProps({
                ref: reference,
                onClick: () => {
                },
            })}
        >
            12312
        </button>
    );
};


export const getEntryWidth = (entry: any) => {
    return (
        (entry.contentRect.width ||
            entry?.contentBoxSize?.[0]?.inlineSize ||
            entry?.borderBoxSize?.[0]?.inlineSize) ??
        0
    );
};

export const getEntryHeight = (entry: any) => {
    return (
        (entry.contentRect.height ||
            entry?.contentBoxSize?.[0]?.blockSize ||
            entry?.borderBoxSize?.[0]?.blockSize) ??
        0
    );
};

export const useResizeObserver = () => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const containerRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) setContainer(node);
    }, []);

    useEffect(() => {
        if (!container) return;

        const elementObserver = new window.ResizeObserver((entries) => {
            const entry = entries[0];

            if (entry) {
                setDimensions({
                    width: getEntryWidth(entry),
                    height: getEntryHeight(entry),
                });
            }
        });
        elementObserver.observe(container);

        return () => elementObserver.disconnect();
    }, [container]);

    return {
        containerRef,
        dimensions,
        container,
    };
};

const DATA_ATTRIBUTE_NAME = "data-uco-hook";
const IGNORE = "_ignore_";

const isDescendant = (root: Element, child: Element) => {
    let el: Element | null = child;

    while (true) {
        if (!el) return false;
        if (root === el) return true;
        if (el.getAttribute(DATA_ATTRIBUTE_NAME) === IGNORE) return true;

        el = el.parentElement;
    }
};

export function useClickOutsideIgnore() {
    return {[DATA_ATTRIBUTE_NAME]: IGNORE};
}

export function useClickOutside(
    ref: React.RefObject<HTMLElement>,
    onClick: () => void,
) {
    const isOutsideRef = useRef(false);

    useEffect(() => {
        const mouseDownListener = (event: MouseEvent) => {
            if (
                ref.current &&
                event.target instanceof Element &&
                !isDescendant(ref.current, event.target)
            ) {
                isOutsideRef.current = true;
            }
        };
        const mouseUpListener = () => {
            if (isOutsideRef.current) {
                onClick();
                isOutsideRef.current = false;
            }
        };

        document.addEventListener("mousedown", mouseDownListener);
        document.addEventListener("mouseup", mouseUpListener);

        return () => {
            document.removeEventListener("mousedown", mouseDownListener);
            document.removeEventListener("mouseup", mouseUpListener);
        };
    }, [ref]);

    return {[DATA_ATTRIBUTE_NAME]: IGNORE};
}

const MIN_EXPANDED_WIDTH = 1100;

export const CameraGridPlayer = () => {
    const {containerRef, dimensions} = useResizeObserver();

    return (
        <>
            <div ref={containerRef}>
                <CameraGridPlayerControls width={dimensions.width}/>
            </div>
        </>
    );
};

interface CameraGridPlayerControlsProps {
    width: number;
}

const CameraGridPlayerControls = ({width}: CameraGridPlayerControlsProps) => {
    const expanded = width > MIN_EXPANDED_WIDTH;

    useEffect(() => {
        if (width !== 0 && !expanded) {
            window.history.replaceState(
                null,
                "",
                "/player#eyJjYW1lcmFJZHMiOlsiZTk3OTk4ZDUtOGU3My00MTQ2LTlhYzYtYTE3MTI0YTBhNThjIl0sInRzIjoxNjc3NzYyNTk4NjIzfQ%3D%3D",
            );
        }
    }, [expanded]);

    return (
        <div>
            <button data-cy="grid-player-button-backward">backward</button>
            <MegaMenu/>
        </div>
    );
};


function App() {
    return <CameraGridPlayer/>
}

export default App


