import { useState } from "react";
import "./styles.css";
import Editor from "./components/editor/Editor";
import EditorTextParser from "./components/editor-parser/EditorTextParser";
import exampleData from "./components/editor/data/exampleData";

export default function App() {
	const [isEditMode, setIsEditMode] = useState(true);
	const [data, setData] = useState(exampleData);

	function toggleEditMode() {
		if (isEditMode) {
			setIsEditMode(false);
			console.log("Edit mode is now disabled");
		} else {
			setIsEditMode(true);
			console.log("Edit mode is now enabled");
		}
	}

	return (
		<div className="App">
			<button id="toggle-edit-btn" onClick={toggleEditMode}>
				Toggle Edit Mode
			</button>

			<div className="app-content">
				{isEditMode ? (
					<Editor data={data} setData={setData} />
				) : (
					<EditorTextParser data={data} setData={setData} />
				)}
			</div>
		</div>
	);
}
