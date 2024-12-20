import { createRoot } from "react-dom/client";
import { Application } from "~/components/Application";

function start() {
	const rootContainer = document.getElementById("root");
	if (!rootContainer) {
		throw new Error("Root element not found");
	}
	const root = createRoot(rootContainer);
	const rootElement = <Application />;
	root.render(rootElement);
}

start();
