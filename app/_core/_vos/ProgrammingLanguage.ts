import { Mutable } from "../../_utils/mutable";

export class ProgrammingLanguage {

    protected static readonly OPTIONS = [
        "ANTLR",
        "Assembly",
        "Astro",
        "Blade",
        "C",
        "C#",
        "C++",
        "Clojure",
        "CMake",
        "Cobol",
        "CSS",
        "Dart",
        "Elixir",
        "Erlang",
        "Go",
        "Groovy",
        "Haskell",
        "HTML",
        "Java",
        "JavaScript",
        "Jupyter Notebook",
        "Kotlin",
        "Lua",
        "Makefile",
        "Matlab",
        "MDX",
        "Nix",
        "Objective-C",
        "Objective-C++",
        "Pascal",
        "Pawn",
        "Perl",
        "PHP",
        "Python",
        "R",
        "Roff",
        "Ruby",
        "Rust",
        "Scala",
        "Scheme",
        "SCSS",
        "Shell",
        "Solidity",
        "SourcePawn",
        "SQL",
        "Swift",
        "TypeScript",
        "Vue",
        "Others",
    ] as const;

    public static readonly ValidValues = ProgrammingLanguage.OPTIONS as Mutable<typeof ProgrammingLanguage.OPTIONS>;

}
