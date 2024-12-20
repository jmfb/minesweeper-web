import { Square } from "./Square";
import { MouseButtons, SquareState } from "~/models";
import styles from "./Board.module.css";

export interface BoardProps {
	state: SquareState[][];
	buttons: MouseButtons;
	onButtonsChanged(newButtons: MouseButtons): void;
}

export function Board({ state, buttons, onButtonsChanged }: BoardProps) {
	const createMouseDownHandler =
		(row: number, column: number) => (newButtons: MouseButtons) => {
			void row, column;
			onButtonsChanged(newButtons);
		};
	const createMouseUpHandler =
		(row: number, column: number) => (newButtons: MouseButtons) => {
			void row, column;
			onButtonsChanged(newButtons);
		};
	return (
		<div>
			{state.map((squares, row) => (
				<div key={row} className={styles["row"]}>
					{squares.map((square, column) => (
						<Square
							key={column}
							square={square}
							buttons={buttons}
							onMouseDown={createMouseDownHandler(row, column)}
							onMouseUp={createMouseUpHandler(row, column)}
						/>
					))}
				</div>
			))}
		</div>
	);
}
