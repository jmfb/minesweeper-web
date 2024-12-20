import { useState } from "react";
import { Board } from "./Board";
import { MouseButtons } from "~/models";
import { gameService, mouseService } from "~/services";
import styles from "./Application.module.css";

export function Application() {
	const [state, setState] = useState(() => gameService.createEmptyBoard());
	const [buttons, setButtons] = useState<MouseButtons>("none");
	const [isEmpty, setIsEmpty] = useState(true);

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

	return (
		<div className={styles["root"]}>
			<Board
				state={state}
				buttons={buttons}
				onButtonsChanged={handleButtonsChanged}
			/>
		</div>
	);
}
