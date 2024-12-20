import { useState } from "react";
import { Board } from "./Board";
import { Cursor, MouseButtons } from "~/models";
import { gameService, mouseService } from "~/services";
import styles from "./Application.module.css";

export function Application() {
	const [state, setState] = useState(() => gameService.createEmptyBoard());
	const [buttons, setButtons] = useState<MouseButtons>("none");
	const [isEmpty, setIsEmpty] = useState(true);
	const [cursor, setCursor] = useState<Cursor | null>(null);

	void setState;
	void isEmpty;
	void setIsEmpty;

	const handleButtonsChanged = (newButtons: MouseButtons) => {
		const gameEvent = mouseService.getMouseGameEvent(buttons, newButtons);
		setButtons(newButtons);
		if (gameEvent !== null) {
			console.log("event", gameEvent);
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
