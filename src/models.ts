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

export type MouseButtons = "none" | "left" | "right" | "both";

export type MouseGameEvent = "click" | "mark" | "chord";
