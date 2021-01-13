<script lang="ts">
    export let name: IName;

    const add = (num: number) => name.points += num;
</script>
<div class="flex">
    <h2>
        {name.name}
        <sup>({name.points})</sup>
    </h2>
    
    <button on:click={() => add(3)}>🥇</button>
    <button on:click={() => add(2)}>🥈</button>
    <button on:click={() => add(1)}>🥉</button>
</div>

<style>
    div {
        padding: 10px;
        border: 1px solid rgba(78, 78, 78, .5);
        background: seashell;
        color: darkblue;
        margin: 10px;
        min-width: 80px;
        align-items: center;
        flex-direction: column;
        width: 100%;
        box-shadow: 0 3px 10px grey;
    }
    button {
        background: none;
        border: none;
        outline: none;
        display: block;
        font-size: 24px;
    }
</style>