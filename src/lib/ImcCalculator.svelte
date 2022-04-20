<script>
	import Form from "./Form.svelte";
	import Imc from "./Imc.svelte";

	let historique = [];
	function sauvegarderIMC(event) {
		historique = [...historique, event.detail];
	}
</script>

<Form on:sauvegarder={sauvegarderIMC} />
<Imc />

<h3>Evolution de l'IMC</h3>
<ul>
	{#each historique as item, index}
		<li>{index + 1}: {item.toFixed(2)}</li>
	{/each}
</ul>
