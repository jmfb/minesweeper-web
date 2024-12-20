import { MouseEvent } from "react";
import {
	boardHeight,
	boardWidth,
	Cursor,
	MouseButtons,
	MouseGameEvent,
} from "~/models";

export function mapMouseButtons({
	buttons,
}: MouseEvent<HTMLDivElement>): MouseButtons {
	const left = !!(buttons & 1);
	const right = !!(buttons & 2);
	return left && right ? "both" : left ? "left" : right ? "right" : "none";
}

export function getMouseGameEvent(
	oldButtons: MouseButtons,
	newButtons: MouseButtons,
): MouseGameEvent | null {
	if (oldButtons === "none" && newButtons === "right") {
		return "mark";
	}
	if (oldButtons === "both" && newButtons === "right") {
		return "chord";
	}
	if (oldButtons === "left" && newButtons === "none") {
		return "click";
	}
	return null;
}

export function randomCursor() {
	const row = Math.floor(Math.random() * boardHeight);
	const column = Math.floor(Math.random() * boardWidth);
	return { row, column };
}

export function isCursor(cursor: Cursor, row: number, column: number) {
	return cursor.row === row && cursor.column === column;
}

export function isAdjacent(cursor: Cursor, row: number, column: number) {
	const fromRow = Math.max(0, row - 1);
	const toRow = Math.min(boardHeight - 1, row + 1);
	const fromCol = Math.max(0, column - 1);
	const toCol = Math.min(boardWidth - 1, column + 1);
	return (
		cursor.row >= fromRow &&
		cursor.row <= toRow &&
		cursor.column >= fromCol &&
		cursor.column <= toCol
	);
}
