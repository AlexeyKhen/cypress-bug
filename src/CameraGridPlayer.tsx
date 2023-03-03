import { useEffect } from "react";
import {useResizeObserver} from "./utils/staff";
import {MegaMenu} from "./MegaMenu";


const MIN_EXPANDED_WIDTH = 1100;

export const CameraGridPlayer = () => {
    const { containerRef, dimensions } = useResizeObserver();

    return (
        <>
            <div ref={containerRef}>
                <CameraGridPlayerControls width={dimensions.width} />
            </div>
        </>
    );
};

interface CameraGridPlayerControlsProps {
    width: number;
}

const CameraGridPlayerControls = ({ width }: CameraGridPlayerControlsProps) => {
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
            <MegaMenu />
        </div>
    );
};
