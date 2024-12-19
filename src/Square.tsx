import { SquareState } from "./models";

export interface SquareProps {
	square: SquareState;
}

export function Square({ square: { isBomb, status } }: SquareProps) {
	return <div>{isBomb ? "💣" : status === "hidden" ? "🟦" : "🟩"}</div>;
}
