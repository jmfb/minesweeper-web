import { MouseEvent } from "react";
import { Square } from "./Square";
import { MouseButtons, BoardState, Cursor } from "~/models";
import { gameService, mouseService } from "~/services";
import styles from "./Board.module.css";

export interface BoardProps {
	state: BoardState;
	buttons: MouseButtons;
	cursor: Cursor;
	onButtonsChanged(newButtons: MouseButtons): void;
	onCursorChanged(newCursor: Cursor, newButtons: MouseButtons): void;
	onMouseLeave(): void;
}

export function Board({
	state,
	buttons,
	cursor,
	onCursorChanged,
	onButtonsChanged,
	onMouseLeave,
}: BoardProps) {
	const createMouseEnterHandler =
		(row: number, column: number) =>
		(event: MouseEvent<HTMLDivElement>) => {
			onCursorChanged(
				{ row, column },
				mouseService.mapMouseButtons(event),
			);
		};
	const handleMouseButtons = (event: MouseEvent<HTMLDivElement>) => {
		onButtonsChanged(mouseService.mapMouseButtons(event));
	};
	const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	return (
		<div
			className={styles["root"]}
			onMouseLeave={onMouseLeave}
			onMouseDown={handleMouseButtons}
			onMouseUp={handleMouseButtons}
			onContextMenu={handleContextMenu}
		>
			{state.map((squares, row) => (
				<div key={row} className={styles["row"]}>
					{squares.map((square, column) => (
						<Square
							key={column}
							square={square}
							isPressed={mouseService.showPressed(
								buttons,
								cursor,
								row,
								column,
							)}
							adjacentBombs={gameService.countAdjacentBombs(
								state,
								row,
								column,
							)}
							onMouseEnter={createMouseEnterHandler(row, column)}
						/>
					))}
				</div>
			))}
		</div>
	);
}
