export type SquareStatus =
	| "hidden"
	| "flagged"
	| "cleared"
	| "mistake"
	| "exploded";

export interface SquareState {
	isBomb: boolean;
	status: SquareStatus;
}

export type BoardState = SquareState[][];

export type MouseButtons = "none" | "left" | "right" | "both";

export type MouseGameEvent = "click" | "mark" | "chord";

export interface Cursor {
	row: number;
	column: number;
}

export const boardHeight = 16;
export const boardWidth = 30;
