<script>
  import { extractDocText } from "./sheetUtil";
  import archieloader from "archieml";

  export let archie;
  
  const data = archieloader.load(extractDocText(archie));
  
  console.log(data);
  
</script>
{JSON.stringify(data)}
