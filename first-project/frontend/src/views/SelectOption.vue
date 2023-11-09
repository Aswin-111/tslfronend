<!-- <template>
    <div>
        <VueMultiselect
  v-model="taggingSelected"
  :options="taggingOptions"
  :multiple="true"
  :taggable="true"
  @tag="addTag"
  tag-placeholder="Add this as new tag"
  placeholder="Type to search or add tag"
  label="name"
  track-by="code"
/>
    </div>
  </template>
  
  <script>
  import VueMultiselect from 'vue-multiselect'
  
  export default {
    name: 'SelectOption',
    components: { VueMultiselect },
    data() {
      return {
        value: [
        { name: 'Javascript', code: 'js' }
      ],
      taggingOptions: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ],
        // : ["hi",'hoi', 'qwer'], // Initialize as an empty array
        taggingSelected: [] // Initialize as an empty array
      }
    },
    methods: {
      addTag(newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
        }
        this.taggingOptions.push(tag)
        this.taggingSelected.push(tag)
      }
    }
  }
  </script>
  
  
  <style src="vue-multiselect/dist/vue-multiselect.css"></style> -->

<template>
    <div>

        <VueMultiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag" v-bind:searchable = "false"></VueMultiselect>
  <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
</div>
</template>
  <script>
    import VueMultiselect from 'vue-multiselect'


  export default {
    name: 'SelectOption',
    components: {
        VueMultiselect
    },
    data () {
      return {
        value: [
          { name: 'Javascript', code: 'js' }
        ],
        options: [
          { name: 'Vue.js', code: 'vu' },
          { name: 'Javascript', code: 'js' },
          { name: 'Open Source', code: 'os' }
        ]
      }
    },
    methods: {
      addTag (newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.value.push(tag)
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style> 
