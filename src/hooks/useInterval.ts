import { useRef, useEffect } from "react";

type Action = () => void;

export function useInterval(callback: Action, timeoutMilliseconds: number) {
	const callbackRef = useRef<Action>();

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const intervalId = window.setInterval(
			() => callbackRef.current(),
			timeoutMilliseconds,
		);
		return () => window.clearInterval(intervalId);
	}, [timeoutMilliseconds]);
}
