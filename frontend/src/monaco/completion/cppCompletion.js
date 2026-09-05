let registered = false;

export function registerCppCompletionProvider(monaco) {
  if (registered) return;
  registered = true;

  monaco.languages.registerCompletionItemProvider("cpp", {
    triggerCharacters: [".", ":", " ", "("],

    provideCompletionItems: () => {
      const suggestions = [
        // ===========================
        // Keywords
        // ===========================

        "alignas",
        "alignof",
        "asm",
        "auto",
        "bool",
        "break",
        "case",
        "catch",
        "char",
        "class",
        "const",
        "constexpr",
        "continue",
        "default",
        "delete",
        "do",
        "double",
        "else",
        "enum",
        "explicit",
        "export",
        "extern",
        "false",
        "float",
        "for",
        "friend",
        "goto",
        "if",
        "inline",
        "int",
        "long",
        "mutable",
        "namespace",
        "new",
        "nullptr",
        "operator",
        "private",
        "protected",
        "public",
        "return",
        "short",
        "signed",
        "sizeof",
        "static",
        "struct",
        "switch",
        "template",
        "this",
        "throw",
        "true",
        "try",
        "typedef",
        "typename",
        "union",
        "unsigned",
        "using",
        "virtual",
        "void",
        "volatile",
        "while",
      ].map((keyword) => ({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
      }));

      // ===========================
      // STL / Functions
      // ===========================

      [
        "cout",
        "cin",
        "endl",
        "vector",
        "string",
        "map",
        "unordered_map",
        "set",
        "unordered_set",
        "queue",
        "stack",
        "priority_queue",
        "pair",
        "sort",
        "reverse",
        "push_back",
        "size",
        "begin",
        "end",
      ].forEach((item) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: item,
        });
      });

      // ===========================
      // Snippets
      // ===========================

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
          label: "cpp",
          kind: monaco.languages.CompletionItemKind.Snippet,

          insertText: [
            "#include <bits/stdc++.h>",
            "",
            "using namespace std;",
            "",
            "int main(){",
            "\t$0",
            "",
            "\treturn 0;",
            "}",
          ].join("\n"),

          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "cout",
          kind: monaco.languages.CompletionItemKind.Snippet,

          insertText: "cout << ${1} << endl;",

          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "cin",
          kind: monaco.languages.CompletionItemKind.Snippet,

          insertText: "cin >> ${1};",

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
          label: "rangefor",
          kind: monaco.languages.CompletionItemKind.Snippet,

          insertText: ["for(auto &x : ${1:container}){", "\t$0", "}"].join(
            "\n",
          ),

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
          label: "while",
          kind: monaco.languages.CompletionItemKind.Snippet,

          insertText: ["while(${1:condition}){", "\t$0", "}"].join("\n"),

          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "class",
          kind: monaco.languages.CompletionItemKind.Snippet,

          insertText: ["class ${1:ClassName}{", "public:", "\t$0", "};"].join(
            "\n",
          ),

          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "vector",
          kind: monaco.languages.CompletionItemKind.Snippet,

          insertText: "vector<int> ${1:v};",

          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        {
          label: "unordered_map",
          kind: monaco.languages.CompletionItemKind.Snippet,

          insertText: "unordered_map<${1:int}, ${2:int}> ${3:mp};",

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
