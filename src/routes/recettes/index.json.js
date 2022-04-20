import recettes from "./recettes.json";

export function get() {
    return {
        // TODO:
        body: recettes.map(({ ingredients, steps, credit, ...rest }) => rest)
    };
}
