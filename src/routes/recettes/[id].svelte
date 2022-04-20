<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ params, fetch }) {
        const url = `/recettes/${params.id}.json`;
        const res = await fetch(url);

        if (res.ok) {
            return {
                props: {
                    recette: await res.json(),
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load ${url}`),
        };
    }
</script>

<script>
    import { page } from "$app/stores";

    export let recette;
</script>

<section class="recette">
    <img src={recette.image} alt="recette-img" />
    <h2>{recette.name}</h2>
    <h3>
        ⏱ {recette.totalTime} min 👨‍🍳 {[
            "",
            "Très Facile",
            "Facile",
            "Moyenne",
            "Difficile",
        ][recette.difficulty || 0]} € {[
            "",
            "Bon marché",
            "Moyen",
            "Assez cher",
        ][recette.budget || 0]} 😋 {recette.people} Personnes
    </h3>

    <ul>
        {#each recette?.ingredients as ingredient}
            <li>{ingredient}</li>
        {/each}
    </ul>
    <dl>
        {#each recette?.steps as step, index}
            <dt>Etape {index + 1}</dt>
            <dd>{step}</dd>
        {/each}
    </dl>
</section>

<nav class="recette-nav">
    {#if $page.params.id > 0}
        <a href="/recettes/{Number($page.params.id) - 1}">Précédent</a>
    {/if}
    {#if $page.params.id < 2}
        <a href="/recettes/{Number($page.params.id) + 1}">Suivant</a>
    {/if}
</nav>
