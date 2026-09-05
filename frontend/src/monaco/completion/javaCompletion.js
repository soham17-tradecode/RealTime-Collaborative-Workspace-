let registered = false;

export function registerJavaCompletionProvider(monaco) {
  console.log("Registering Java Completion Provider");

  if (registered) return;
  registered = true;

  monaco.languages.registerCompletionItemProvider("java", {
    triggerCharacters: [".", " ", "("],

    provideCompletionItems: () => {
      const suggestions = [
        // =========================
        // Keywords
        // =========================
        "abstract",
        "assert",
        "boolean",
        "break",
        "byte",
        "case",
        "catch",
        "char",
        "class",
        "const",
        "continue",
        "default",
        "do",
        "double",
        "else",
        "enum",
        "extends",
        "false",
        "final",
        "finally",
        "float",
        "for",
        "if",
        "implements",
        "import",
        "instanceof",
        "int",
        "interface",
        "long",
        "native",
        "new",
        "null",
        "package",
        "private",
        "protected",
        "public",
        "return",
        "short",
        "static",
        "String",
        "super",
        "switch",
        "System",
        "this",
        "throw",
        "throws",
        "true",
        "try",
        "void",
        "while",
      ].map((keyword) => ({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
      }));

      suggestions.push(
        {
          label: "psvm",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "public static void main(String[] args) {",
            "\t$0",
            "}",
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Main Method",
        },
        {
          label: "sout",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "System.out.println($1);",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Print Line",
        },
        {
          label: "fori",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["for (int i = 0; i < $1; i++) {", "\t$0", "}"].join(
            "\n",
          ),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "For Loop",
        },
        {
          label: "if",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["if ($1) {", "\t$0", "}"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "while",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["while ($1) {", "\t$0", "}"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
      );

      return { suggestions };
    },
  });
}
