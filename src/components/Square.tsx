import { MouseEvent } from "react";
import { SquareState } from "~/models";
import { clsx } from "clsx";
import styles from "./Square.module.css";

export interface SquareProps {
	square: SquareState;
	isPressed: boolean;
	adjacentBombs: number;
	onMouseEnter(event: MouseEvent<HTMLDivElement>): void;
}

export function Square({
	square: { isBomb, status },
	isPressed,
	adjacentBombs,
	onMouseEnter,
}: SquareProps) {
	return (
		<div
			className={clsx(
				styles["root"],
				styles[`status-${status}`],
				isPressed && styles["pressed"],
				adjacentBombs > 0 && styles[`count-${adjacentBombs}`],
			)}
			onMouseEnter={onMouseEnter}
		>
			{status === "flagged" ? (
				"🚩"
			) : status === "mistake" ? (
				"❌"
			) : status === "cleared" && isBomb ? (
				"💣"
			) : status === "exploded" ? (
				"💥"
			) : status === "cleared" && adjacentBombs > 0 ? (
				adjacentBombs
			) : (
				<>&nbsp;</>
			)}
		</div>
	);
}
