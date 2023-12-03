<template>
     <div id="footer-fixed" class="footer-copyright">
      <div class="container_foot">
          <p class="coyright">{{ apiversion }}: {{ version }}</p>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

    const apiversion = ref('API Version');
    const version = ref([]);

    onMounted(() => {
        fetch("http://localhost:3001/api/version")
            .then((response) => response.json())
            .then((json) => {
                version.value = json.version;
            });
            
    })

</script>

<style>

#footer-fixed {
  width: 100%;
  height: 40px;
  background-color:  #F6F7F7;
  color:  #4B5C68;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
    .container_foot {
        display: flex;
        align-items: center;
        justify-content: end;
        height: -webkit-fill-available;
        .coyright {
            margin-right: 40px;
            color: #4B5C68;
        }
    }
}

</style>