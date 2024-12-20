import { MouseEvent } from "react";
import { MouseButtons, MouseGameEvent } from "~/models";

export function mapMouseButtons({
	buttons,
}: MouseEvent<HTMLDivElement>): MouseButtons {
	const left = !!(buttons & 1);
	const right = !!(buttons & 2);
	return left && right ? "both" : left ? "left" : right ? "right" : "none";
}

export function getMouseGameEvent(
	oldButtons: MouseButtons,
	newButtons: MouseButtons,
): MouseGameEvent | null {
	if (oldButtons === "none" && newButtons === "right") {
		return "mark";
	}
	if (oldButtons === "both" && newButtons === "right") {
		return "chord";
	}
	if (oldButtons === "left" && newButtons === "none") {
		return "click";
	}
	return null;
}
