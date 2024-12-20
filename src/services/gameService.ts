const boardHeight = 16;
const boardWidth = 30;

export function createEmptyBoard() {
	return new Array(boardHeight)
		.fill(0)
		.map(() =>
			new Array(boardWidth)
				.fill(0)
				.map(() => ({ isBomb: false, status: "hidden" as const })),
		);
}
