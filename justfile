SERVICE := 'opire_front'

[private]
alias i := install

[private]
[doc('
    List all available commands.
    ex:
        just
')]
default:
    @just --list

[doc('
    Install the project dependencies.
    ex:
        just install
        just i
')]
install:
    @docker compose run --rm {{SERVICE}} npm install
    
[doc('
    Add a new dependency to the project.
    ex:
        just add "package"
        just add "package1 package2"
        just add "-D dev-package"
')]
add deps:
    @docker compose run --rm {{SERVICE}} npm install {{deps}}

[doc('
    Run the project in development mode.
    ex:
        just dev
')]
dev:
    @docker compose run --rm --service-ports {{SERVICE}} npm run dev

[doc('
    Build the project.
    ex:
        just build
')]
build:
	@docker compose run --rm {{SERVICE}} npm run build

[doc('
    Run the project from the generated build.
    ex:
        just start
')]
start:
	@docker compose run --rm --service-ports {{SERVICE}} npm run start

[doc('
    Run the linter.
    ex:
        just lint
')]
lint:
	@docker compose run --rm {{SERVICE}} npm run lint

[doc('
    Run the copy-paste detector.
    ex:
        just cpd
')]
cpd:
	@docker compose run --rm {{SERVICE}} npm run cpd