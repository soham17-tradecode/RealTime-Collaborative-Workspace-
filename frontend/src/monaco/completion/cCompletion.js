let registered = false;

export function registerCCompletionProvider(monaco) {
  if (registered) return;
  registered = true;

  monaco.languages.registerCompletionItemProvider("c", {
    triggerCharacters: [".", " ", "("],

    provideCompletionItems: () => {
      const suggestions = [
        // ==========================
        // Keywords
        // ==========================

        "auto",
        "break",
        "case",
        "char",
        "const",
        "continue",
        "default",
        "do",
        "double",
        "else",
        "enum",
        "extern",
        "float",
        "for",
        "goto",
        "if",
        "int",
        "long",
        "register",
        "return",
        "short",
        "signed",
        "sizeof",
        "static",
        "struct",
        "switch",
        "typedef",
        "union",
        "unsigned",
        "void",
        "volatile",
        "while",
      ].map((keyword) => ({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
      }));

      // ==========================
      // Standard Functions
      // ==========================

      [
        "printf",
        "scanf",
        "malloc",
        "calloc",
        "realloc",
        "free",
        "strlen",
        "strcpy",
        "strcmp",
        "fopen",
        "fclose",
        "fgets",
        "fprintf",
        "fscanf",
        "exit",
        "sizeof",
      ].forEach((fn) => {
        suggestions.push({
          label: fn,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: fn + "()",
        });
      });

      // ==========================
      // Snippets
      // ==========================

      suggestions.push(
        {
          label: "main",
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: "Main Function",
          insertText: ["int main(){", "\t$0", "", "\treturn 0;", "}"].join(
            "\n",
          ),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "printf",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'printf("${1}");',
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "scanf",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'scanf("${1}", &${2});',
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "for",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["for(int i=0;i<${1:n};i++){", "\t$0", "}"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "while",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["while(${1:condition}){", "\t$0", "}"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "if",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["if(${1:condition}){", "\t$0", "}"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "switch",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "switch(${1:variable}){",
            "",
            "case ${2:value}:",
            "\tbreak;",
            "",
            "default:",
            "\tbreak;",
            "}",
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "struct",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["struct ${1:Name}{", "\t$0", "};"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "#include",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["#include <stdio.h>", "#include <stdlib.h>"].join("\n"),
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
