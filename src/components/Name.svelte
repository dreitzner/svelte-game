<script lang="ts">
    export let name: IName;

    const add = (num: number) => name.points += num;
</script>
<div>
    <h2>
        {name.name}
        <sup>({name.points})</sup>
    </h2>
    <footer>
        <button on:click={() => add(3)}>🥇</button>
        <button on:click={() => add(2)}>🥈</button>
        <button on:click={() => add(1)}>🥉</button>
    </footer>
</div>

<style>
    div {
        padding: 10px;
        border: 1px solid rgba(78, 78, 78, .5);
        background: seashell;
        color: darkblue;
        margin: 10px;
        min-width: 80px;
        min-width: 180px;
        box-shadow: 0 3px 10px grey;
        justify-content: center;
    }
    h2 {
        display: block;
    }
    button {
        background: none;
        border: none;
        outline: none;
        display: inline-block;
        font-size: 24px;
    }

    @media screen and (max-width: 640px) {
        div {
            width: 100%;
        }
        
    }
</style>