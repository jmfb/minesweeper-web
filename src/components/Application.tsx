import { useState, useMemo, useEffect } from "react";
import { useInterval } from "~/hooks";
import { Board } from "./Board";
import { Monitor } from "./Monitor";
import { BoardState, Cursor, MouseButtons } from "~/models";
import { gameService, mouseService } from "~/services";
import styles from "./Application.module.css";

export function Application() {
	const [state, setState] = useState<BoardState>(() =>
		gameService.createEmptyBoard(),
	);
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [now, setNow] = useState<Date>(new Date());
	const [buttons, setButtons] = useState<MouseButtons>("none");
	const [isEmpty, setIsEmpty] = useState(true);
	const [cursor, setCursor] = useState<Cursor | null>(null);

	const gameStatus = useMemo(() => gameService.getGameStatus(state), [state]);
	const isGameOver = gameStatus !== "in-progress";

	useEffect(() => {
		const newEndTime = new Date();
		switch (gameStatus) {
			case "win":
				setState(gameService.winGame(state));
				setEndTime(newEndTime);
				console.log("win");
				break;
			case "lose":
				setState(gameService.loseGame(state));
				setEndTime(newEndTime);
				console.log("lose");
				break;
		}
	}, [gameStatus]);

	useInterval(() => {
		setNow(new Date());
	}, 500);

	const handleButtonsChanged = (newButtons: MouseButtons) => {
		setButtons(newButtons);
		if (isGameOver) {
			return;
		}
		const gameEvent = mouseService.getMouseGameEvent(buttons, newButtons);
		switch (gameEvent) {
			case "click":
				if (isEmpty) {
					setIsEmpty(false);
					setState(gameService.generateBoard(state, cursor));
					const newStartTime = new Date();
					setStartTime(newStartTime);
					setNow(newStartTime);
				} else {
					setState(gameService.doClick(state, cursor));
				}
				break;
			case "mark":
				setState(gameService.changeMark(state, cursor));
				break;
			case "chord":
				setState(gameService.doChord(state, cursor));
				break;
		}
	};
	const handleCursorChanged = (
		newCursor: Cursor,
		newButtons: MouseButtons,
	) => {
		setCursor(newCursor);
		if (cursor === null) {
			setButtons(newButtons);
		}
	};
	const handleMouseLeave = () => {
		setButtons("none");
		setCursor(null);
	};
	const handleNewGameClicked = () => {
		setState(gameService.createEmptyBoard());
		setIsEmpty(true);
		setStartTime(null);
		setEndTime(null);
	};

	return (
		<div className={styles["root"]}>
			<Monitor
				gameStatus={gameStatus}
				flagCount={gameService.getFlagCount(state)}
				startTime={startTime}
				endTime={endTime ?? now}
			/>
			<Board
				state={state}
				buttons={isGameOver ? "none" : buttons}
				cursor={cursor}
				onButtonsChanged={handleButtonsChanged}
				onCursorChanged={handleCursorChanged}
				onMouseLeave={handleMouseLeave}
			/>
			<button onClick={handleNewGameClicked}>New Game</button>
		</div>
	);
}
