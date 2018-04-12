<template>
  <div>welcome</div>
</template>
<script>
export default {
  mounted() {
    axios.post("/app1/getinfo").then(({ data }) => {
      console.log(data);
    });
    axios.post("/app2/getinfo").then(({ data }) => {
      console.log(data);
    });
  }
};
</script>