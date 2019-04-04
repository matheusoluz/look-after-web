<template>
  <q-layout class="bg-light">
    <q-layout-header>
      <q-toolbar
        class="q-py-none"
        color="teal-11"
      >
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="ToogleSidebar"
          color="pink-12"
        />
        <q-toolbar-title
          shrink
          class="text-pink-4"
        >
          <span>{{$NodePackage.productName}}</span>
        </q-toolbar-title>
        <q-toolbar-title />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      side="left"
      v-model="leftDrawer.show"
      :mini="leftDrawer.showMini"
      :width="200"
    >
      <q-scroll-area class="fit">
        <q-list
          highlight
          no-border
          style="padding: 0"
        >
          <q-item to="/">
            <q-item-side
              icon="home"
              color="pink-11"
            />
            <q-item-main label="Home" />
          </q-item>
          <q-item to="/products">
            <q-item-side
              icon="child_friendly"
              color="pink-11"
            />
            <q-item-main label="Inventory" />
          </q-item>
          <q-item to="/login/logout">
            <q-item-side
              icon="mdi-logout-variant"
              color="pink-11"
            />
            <q-item-main label="Log out" />
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      envDev: process.env.DEV,
      leftDrawer: {
        show: true,
        showMini: false
      }
    }
  },
  methods: {
    ToogleSidebar () {
      this.$q.platform.is.mobile
        ? this.leftDrawer.show = !this.leftDrawer.show
        : this.leftDrawer.showMini = !this.leftDrawer.showMini
    }
  }
}
</script>
