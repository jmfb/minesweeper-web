import { MouseEvent } from "react";
import { SquareState, MouseButtons } from "~/models";
import { mouseService } from "~/services";

export interface SquareProps {
	square: SquareState;
	buttons: MouseButtons;
	onMouseDown(newButtons: MouseButtons): void;
	onMouseUp(newButtons: MouseButtons): void;
}

export function Square({
	square: { isBomb, status },
	buttons,
	onMouseDown,
	onMouseUp,
}: SquareProps) {
	void buttons;

	const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		onMouseDown(mouseService.mapMouseButtons(event));
	};
	const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
		onMouseUp(mouseService.mapMouseButtons(event));
	};
	const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	return (
		<div
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onContextMenu={handleContextMenu}
		>
			{isBomb ? "💣" : status === "hidden" ? "🟦" : "🟩"}
		</div>
	);
}
