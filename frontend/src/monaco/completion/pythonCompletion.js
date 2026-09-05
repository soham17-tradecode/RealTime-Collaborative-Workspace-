let registered = false;

export function registerPythonCompletionProvider(monaco) {
  if (registered) return;
  registered = true;

  monaco.languages.registerCompletionItemProvider("python", {
    triggerCharacters: [".", " ", "("],

    provideCompletionItems: () => {
      const suggestions = [
        // ===========================
        // Keywords
        // ===========================
        "False",
        "None",
        "True",
        "and",
        "as",
        "assert",
        "async",
        "await",
        "break",
        "class",
        "continue",
        "def",
        "del",
        "elif",
        "else",
        "except",
        "finally",
        "for",
        "from",
        "global",
        "if",
        "import",
        "in",
        "is",
        "lambda",
        "nonlocal",
        "not",
        "or",
        "pass",
        "raise",
        "return",
        "try",
        "while",
        "with",
        "yield",
      ].map((keyword) => ({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
      }));

      // ===========================
      // Built-in Functions
      // ===========================

      const builtins = [
        "print",
        "input",
        "len",
        "range",
        "int",
        "float",
        "str",
        "list",
        "dict",
        "set",
        "tuple",
        "type",
        "open",
        "enumerate",
        "zip",
        "sum",
        "max",
        "min",
        "abs",
        "sorted",
      ];

      builtins.forEach((fn) => {
        suggestions.push({
          label: fn,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: fn + "()",
        });
      });

      // ===========================
      // Snippets
      // ===========================

      suggestions.push(
        {
          label: "ifmain",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['if __name__ == "__main__":', "    $0"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "def",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["def ${1:function_name}(${2}):", "    $0"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "class",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "class ${1:ClassName}:",
            "    def __init__(self):",
            "        $0",
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "for",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["for ${1:i} in range(${2:n}):", "    $0"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "while",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["while ${1:condition}:", "    $0"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "if",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["if ${1:condition}:", "    $0"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "try",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "try:",
            "    $1",
            "except Exception as e:",
            "    print(e)",
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
      );

      return {
        suggestions,
      };
    },
  });
}
