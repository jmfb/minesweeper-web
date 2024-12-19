import { SquareState } from "~/models";
import { Square } from "./Square";
import styles from "./Board.module.css";

export interface BoardProps {
	state: SquareState[][];
}

export function Board({ state }: BoardProps) {
	return (
		<div>
			{state.map((row, index) => (
				<div key={index} className={styles["row"]}>
					{row.map((square, column) => (
						<Square key={column} square={square} />
					))}
				</div>
			))}
		</div>
	);
}
