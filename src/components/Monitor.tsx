import { Display } from "react-7-segment-display";
import { bombCount, GameStatus, MouseButtons } from "~/models";
import styles from "./Monitor.module.css";

export interface MonitorProps {
	gameStatus: GameStatus;
	flagCount: number;
	buttons: MouseButtons;
	startTime: Date | null;
	endTime: Date;
	onNewGame(): void;
}

export function Monitor({
	gameStatus,
	flagCount,
	buttons,
	startTime,
	endTime,
	onNewGame,
}: MonitorProps) {
	const durationMs =
		startTime === null ? 0 : endTime.getTime() - startTime.getTime();
	const durationS = Math.floor(durationMs / 1000);
	const isPressing = buttons === "both" || buttons === "left";
	return (
		<div className={styles["root"]}>
			<div className={styles["display-container"]}>
				<Display
					value={bombCount - flagCount}
					count={3}
					color="red"
					backgroundColor="black"
					height={32}
					skew={false}
				/>
			</div>
			<button onClick={onNewGame}>
				{startTime === null
					? "😐"
					: gameStatus === "win"
						? "😎"
						: gameStatus === "lose"
							? "😡"
							: isPressing
								? "😮"
								: "🙂"}
			</button>
			<div className={styles["display-container"]}>
				<Display
					value={durationS}
					count={3}
					color="red"
					backgroundColor="black"
					height={32}
					skew={false}
				/>
			</div>
		</div>
	);
}
