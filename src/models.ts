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
