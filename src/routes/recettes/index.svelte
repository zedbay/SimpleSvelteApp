<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ fetch }) {
        const url = `/recettes.json`;
        const res = await fetch(url);

        if (res.ok) {
            return {
                props: {
                    recettes: await res.json(),
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
    export let recettes = [];
</script>

<section class="recettes">
    {#each recettes as item, index (item.name)}
        <article>
            <div>
                <h2>
                    <a sveltekit:prefetch href="/recettes/{index}"
                        >{item.name}</a
                    >
                </h2>
                <p>
                    ⏱ {item.totalTime} min 👨‍🍳 {[
                        "",
                        "Très Facile",
                        "Facile",
                        "Moyenne",
                        "Difficile",
                    ][item.difficulty || 0]} € {[
                        "",
                        "Bon marché",
                        "Moyen",
                        "Assez cher",
                    ][item.budget || 0]} 😋 {item.people} Personnes
                </p>
            </div>
            <img src={item.image} alt={item.name} />
        </article>
    {/each}
</section>
