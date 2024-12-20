import {
	boardHeight,
	boardWidth,
	BoardState,
	Cursor,
	MouseButtons,
} from "~/models";
import { mouseService } from ".";

export function createEmptyBoard() {
	return new Array(boardHeight)
		.fill(0)
		.map(() =>
			new Array(boardWidth)
				.fill(0)
				.map(() => ({ isBomb: false, status: "hidden" as const })),
		);
}

export function countAdjacentBombs(
	state: BoardState,
	row: number,
	column: number,
) {
	let count = 0;
	const fromRow = Math.max(0, row - 1);
	const toRow = Math.min(boardHeight - 1, row + 1);
	const fromCol = Math.max(0, column - 1);
	const toCol = Math.min(boardWidth - 1, column + 1);
	for (let otherRow = fromRow; otherRow <= toRow; otherRow++) {
		for (let otherCol = fromCol; otherCol <= toCol; otherCol++) {
			const isSameSquare = otherRow === row && otherCol === column;
			if (!isSameSquare && state[otherRow][otherCol].isBomb) {
				count++;
			}
		}
	}
	return count;
}

export function showPressed(
	buttons: MouseButtons,
	cursor: Cursor,
	row: number,
	column: number,
) {
	if (cursor === null) {
		return false;
	}
	if (buttons === "none" || buttons === "right") {
		return false;
	}
	if (mouseService.isCursor(cursor, row, column)) {
		return true;
	}
	return buttons === "both" && mouseService.isAdjacent(cursor, row, column);
}
