import {
	boardHeight,
	boardWidth,
	bombCount,
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

export function cloneBoard(state: BoardState): BoardState {
	return state.map((squares) => squares.map((square) => ({ ...square })));
}

export function generateBomb(state: BoardState, cursor: Cursor) {
	while (true) {
		const { row, column } = mouseService.randomCursor();
		if (mouseService.isAdjacent(cursor, row, column)) {
			continue;
		}
		if (state[row][column].isBomb) {
			continue;
		}
		state[row][column].isBomb = true;
		return;
	}
}

export function generateBoard(state: BoardState, cursor: Cursor): BoardState {
	const clone = cloneBoard(state);
	for (let index = 0; index < bombCount; ++index) {
		generateBomb(clone, cursor);
	}
	clickSquare(clone, cursor);
	return clone;
}

export function doClick(state: BoardState, cursor: Cursor) {
	const { row, column } = cursor;
	if (state[row][column].status !== "hidden") {
		return state;
	}
	const clone = cloneBoard(state);
	clickSquare(clone, cursor);
	return clone;
}

export function clickSquare(state: BoardState, { row, column }: Cursor) {
	const { isBomb, status } = state[row][column];
	if (status !== "hidden") {
		return;
	}
	if (isBomb) {
		state[row][column].status = "exploded";
		return;
	}
	state[row][column].status = "cleared";
	const count = countAdjacentBombs(state, row, column);
	if (count === 0) {
		const fromRow = Math.max(0, row - 1);
		const toRow = Math.min(boardHeight - 1, row + 1);
		const fromCol = Math.max(0, column - 1);
		const toCol = Math.min(boardWidth - 1, column + 1);
		for (let otherRow = fromRow; otherRow <= toRow; otherRow++) {
			for (let otherCol = fromCol; otherCol <= toCol; otherCol++) {
				const isSameSquare = otherRow === row && otherCol === column;
				if (!isSameSquare) {
					clickSquare(state, { row: otherRow, column: otherCol });
				}
			}
		}
	}
}

export function changeMark(state: BoardState, { row, column }: Cursor) {
	const { status } = state[row][column];
	if (status !== "hidden" && status !== "flagged") {
		return state;
	}
	const clone = cloneBoard(state);
	clone[row][column].status = status === "hidden" ? "flagged" : "hidden";
	return clone;
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
