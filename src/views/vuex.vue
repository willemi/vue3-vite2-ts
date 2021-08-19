<template>
  <div class="page-title">Vuex Test Page</div>
  <p>store Root is: {{ text }}</p>
  <p>store doubleCount is: {{ count }}</p>
  <el-button type="primary" @click="double">double</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

// import { NavItem, Router } from '../common/types'

export default defineComponent({
  name: 'Vuex',
  setup() {
    const store = useStore()
    const router: any = useRouter()
    const reactiveData = reactive({
      text: computed(() => store.state.text),
      count: computed(() => store.state.numFactoryModule.count)
    })
    const double = () => {
      store.commit('numFactoryModule/DOUBLE_COUNT')
    }

    watch(
      () => router.query,
      (query) => {
        console.log(router.path, query)
        // if (router.path !== '/') return
      }
    )

    // router.push({
    //   path: '/',
    //   query: {

    //   }
    // })

    //  navClick(e: NavItem) {
    //     router.push(e.path)
    //   }

    onMounted(async () => {
      await nextTick()
    })

    return {
      ...toRefs(reactiveData),
      double
    }
  }
})
</script>
