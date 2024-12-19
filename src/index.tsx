import { createRoot } from "react-dom/client";

function start() {
	const rootContainer = document.getElementById("root");
	if (!rootContainer) {
		throw new Error("Root element not found");
	}
	const root = createRoot(rootContainer);
	const rootElement = <div>Hello World</div>;
	root.render(rootElement);
}

start();
