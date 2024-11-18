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
        "Kotlin",
        "Lua",
        "Matlab",
        "MDX",
        "Objective-C",
        "Pascal",
        "Perl",
        "PHP",
        "Python",
        "R",
        "Ruby",
        "Rust",
        "Scala",
        "SCSS",
        "Shell",
        "SQL",
        "Swift",
        "TypeScript",
        "Vue",
        "Others",
    ] as const;

    public static readonly ValidValues = ProgrammingLanguage.OPTIONS as Mutable<typeof ProgrammingLanguage.OPTIONS>;

}
