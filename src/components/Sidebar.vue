<template>
  <div>
    <b-sidebar
      id="sidebar-backdrop"
      title="Menu"
      backdrop-variant="dark"
      backdrop
      shadow
    >
    <div class="p-3">
          <h4 id="sidebar-no-header-title" style="text-align: left">AIFMRM blah blah</h4>
          <p style="text-align: left">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item href="/" @click="hide" style="text-align: left">Summary</b-nav-item>
              <b-nav-item href="/downloads" @click="hide" style="text-align: left">Downloads</b-nav-item>
              <b-nav-item href="#link-2" @click="hide" style="text-align: left">Betas</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
    </b-sidebar>
  </div>
</template>
