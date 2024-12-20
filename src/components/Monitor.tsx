import { bombCount, GameStatus } from "~/models";

export interface MonitorProps {
	gameStatus: GameStatus;
	flagCount: number;
	startTime: Date | null;
	endTime: Date;
}

export function Monitor({
	gameStatus,
	flagCount,
	startTime,
	endTime,
}: MonitorProps) {
	const durationMs =
		startTime === null ? 0 : endTime.getTime() - startTime.getTime();
	const durationS = Math.floor(durationMs / 1000);
	const minutes = Math.floor(durationS / 60);
	const seconds = durationS % 60;
	return (
		<>
			<div>
				{minutes.toString().padStart(2, "0")}:
				{seconds.toString().padStart(2, "0")}
			</div>
			<div>
				{gameStatus === "win"
					? "Victory!"
					: gameStatus === "lose"
						? "Defeat!"
						: bombCount - flagCount}
			</div>
		</>
	);
}
