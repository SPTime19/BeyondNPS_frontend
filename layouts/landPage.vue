<template>
  <div>
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
  import Navbar from '~/components/general/Navbar'
  import Footer from '~/components/general/Footer'
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  },
  components:{
    Footer
  }
}
</script>
