<script>
  import Content from "./Content.svelte";
  import { fly } from "svelte/transition";
  import { getDocData } from "./sheetUtil";

  const PublicKey = "2PACX-1vT6duKtZOWV8eCbdBfmynj9F9cf_Eob7A7VNJ7v9o1wOSnvv0vlXIVlCEB25Yh6dL21Ey7AeyOBjcj6";
  const promise = getDocData(PublicKey);
  
  let archie ="asd"
</script>

<style>
  main{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>

<main>
  {#await promise}
    <div>..LOadIng!...</div>
  {:then archie}
    <div in:fly class="content">
      <Content {archie}/>
    </div>
  {:catch error}
    <div>{error}</div>
  {/await}
</main>
