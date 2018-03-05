<template>
  <div style="border:1px solid gray;height:800px;">
    <div>---appframe---</div>
    <div style="border:1px solid gray;margin:10px; padding:10px;">
    <el-button  @click='$irouter("/")'>Home</el-button> 
    <el-button v-for='comp in $allcomponent' :key='comp.name' @click='$irouter(comp.path)'>{{comp.name}}</el-button> 
    <el-button  @click='$irouter("/errorpath")'>errorpath</el-button> 
    </div>
    <div style="border:1px solid gray;margin:10px; padding:10px; height:500px; ">
      <div>---router-view---</div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
div {
  padding: 10px;
}
</style>