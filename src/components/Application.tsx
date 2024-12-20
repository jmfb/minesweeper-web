import { useState } from "react";
import { Board } from "./Board";
import { BoardState, Cursor, MouseButtons } from "~/models";
import { gameService, mouseService } from "~/services";
import styles from "./Application.module.css";

export function Application() {
	const [state, setState] = useState<BoardState>(() =>
		gameService.createEmptyBoard(),
	);
	const [buttons, setButtons] = useState<MouseButtons>("none");
	const [isEmpty, setIsEmpty] = useState(true);
	const [cursor, setCursor] = useState<Cursor | null>(null);

	const handleButtonsChanged = (newButtons: MouseButtons) => {
		const gameEvent = mouseService.getMouseGameEvent(buttons, newButtons);
		setButtons(newButtons);
		switch (gameEvent) {
			case "click":
				if (isEmpty) {
					setIsEmpty(false);
					setState(gameService.generateBoard(state, cursor));
				} else {
					console.log("TODO: click");
				}
				break;
			case "mark":
				setState(gameService.changeMark(state, cursor));
				break;
			case "chord":
				console.log("TODO: chord");
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

	return (
		<div className={styles["root"]}>
			<Board
				state={state}
				buttons={buttons}
				cursor={cursor}
				onButtonsChanged={handleButtonsChanged}
				onCursorChanged={handleCursorChanged}
				onMouseLeave={handleMouseLeave}
			/>
		</div>
	);
}
