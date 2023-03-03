import {useFloating, offset, autoUpdate} from "@floating-ui/react";
import {useSelect} from "downshift";
import {useCallback, useEffect, useRef, useState} from "react";


const MIN_EXPANDED_WIDTH = 1100;

export const Menu = () => {
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
            Menu button
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

const MainContainer = ({width}: {
    width: number;
}) => {
    const expanded = width > MIN_EXPANDED_WIDTH;

    useEffect(() => {
        if (width !== 0 && !expanded) {
            window.history.replaceState(
                null,
                "",
                "/some#eyJjYW1lcmFJZHMiOlsiZTk3OTk4ZDUtOGU3My00MTQ2LTlhYzYtYTE",
            );
        }
    }, [expanded]);

    return (
        <div>
            <button data-cy="button-backward">Backward button</button>
            <Menu/>
        </div>
    );
};


function App() {
    const {containerRef, dimensions} = useResizeObserver();

    return (
        <>
            <div ref={containerRef}>
                <MainContainer width={dimensions.width}/>
            </div>
        </>
    );
}

export default App


