import * as ts from "typescript";

/**
 * Generate the file source as a string.
 * @param nodes An array of nodes.
 */
export async function generate(nodes: Array<ts.Node>): Promise<string> {
	const file = ts.createSourceFile("", "", ts.ScriptTarget.ESNext, true);
	const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

	return new Promise((resolve, reject) => {
		try {
			setImmediate(() => {
				const printedNodes = printer.printList(
					ts.ListFormat.MultiLine,
					ts.factory.createNodeArray(nodes),
					file
				);

				resolve(printedNodes);
			});
		} catch (error) {
			reject(error);
		}
	});
}
