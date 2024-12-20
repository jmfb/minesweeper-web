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
	const isHidden = status === "hidden";
	return (
		<div
			className={clsx(
				styles["root"],
				isHidden && styles["hidden"],
				isPressed && styles["pressed"],
			)}
			onMouseEnter={onMouseEnter}
		>
			{!isHidden && isBomb ? (
				"💣"
			) : !isHidden && !isBomb && adjacentBombs > 0 ? (
				adjacentBombs
			) : (
				<>&nbsp;</>
			)}
		</div>
	);
}
