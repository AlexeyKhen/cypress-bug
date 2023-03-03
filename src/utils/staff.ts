import {useCallback, useEffect, useRef, useState} from "react";

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
    return { [DATA_ATTRIBUTE_NAME]: IGNORE };
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

    return { [DATA_ATTRIBUTE_NAME]: IGNORE };
}