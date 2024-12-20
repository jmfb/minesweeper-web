import { bombCount, GameStatus } from "~/models";

export interface MonitorProps {
	gameStatus: GameStatus;
	flagCount: number;
}

export function Monitor({ gameStatus, flagCount }: MonitorProps) {
	return (
		<div>
			{gameStatus === "win"
				? "Victory!"
				: gameStatus === "lose"
					? "Defeat!"
					: bombCount - flagCount}
		</div>
	);
}
