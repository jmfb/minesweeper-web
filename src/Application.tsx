import { Board } from "./Board";
import styles from "./Application.module.css";

const state = new Array(16)
	.fill(0)
	.map(() =>
		new Array(30)
			.fill(0)
			.map(() => ({ isBomb: false, status: "hidden" as const })),
	);

export function Application() {
	return (
		<div className={styles["root"]}>
			<Board state={state} />
		</div>
	);
}
