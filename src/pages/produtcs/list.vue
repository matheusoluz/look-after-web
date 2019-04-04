<template>
  <q-page class="row justify-center items-start q-pa-md">
    <q-modal
      v-model="modal"
      minimized
    >
      <edit-product
        v-if="modal"
        :productId="productId"
      />
    </q-modal>
    <q-card class="col-12 bg-white">
      <q-card-title class="flex-center text-white bg-pink-11 q-pa-sm">
        Inventory
        <div
          class="row flex-center fit"
          slot="right"
        >
          <q-btn
            class="no-shadow q-mx-md"
            round
            dense
            color="dark"
            icon="add"
            @click="OpenModal(0)"
          >
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
              :offset="[0, 8]"
            >Add product</q-tooltip>
          </q-btn>
          <q-search
            v-model="searchFilter"
            inverted-light
            color="white"
            clearable
            :class="this.$q.platform.is.mobile ? 'search-box-m' : 'search-box-web'"
            rounded
          />
        </div>
      </q-card-title>
      <q-card-main class="q-pa-none">
        <q-table
          dense
          no-data-label="Sem dados."
          :pagination.sync="Tabela.pagination"
          :data="Tabela.tableData"
          :columns="Tabela.columns"
          :filter="searchFilter"
          row-key="id"
        >
          <q-tr
            slot="body"
            slot-scope="props"
            :props="props"
          >
            <q-td
              key="model"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="uppercase text-weight-medium">{{props.row.model}}</span>
              </div>
            </q-td>
            <q-td
              key="description"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="uppercase text-weight-medium">{{props.row.description}}</span>
              </div>
            </q-td>
            <q-td
              key="sizes"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="uppercase text-weight-medium">{{props.row.sizes}}</span>
              </div>
            </q-td>
            <q-td
              key="availableQty"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="uppercase text-weight-medium">{{props.row.availableQty}}</span>
              </div>
            </q-td>
            <q-td
              key="id"
              :props="props"
            >
              <q-btn
                class="no-shadow q-mx-md"
                round
                dense
                color="dark"
                icon="edit"
                @click="OpenModal(props.row.id)"
              >
                <q-tooltip
                  anchor="bottom middle"
                  self="top middle"
                  :offset="[0, 8]"
                >
                  Edit product
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </q-table>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import { AxiosCatchMixin } from '../../mixins/AxiosCatch'
import editProduct from './edit'
export default {
  name: 'ListInventory',
  components: { editProduct },
  mixins: [AxiosCatchMixin],
  data () {
    return {
      Tabela: {
        loading: true,
        pagination: {
          rowsPerPage: 10,
          page: 1
        },
        tableData: [],
        columns: [
          { field: 'model', name: 'model', label: 'Model', align: 'left', style: 'width: 20%', sortable: true },
          { field: 'description', name: 'description', label: 'Description', align: 'left', style: 'width: 25%', sortable: true },
          { field: 'sizes', name: 'sizes', label: 'Size', align: 'left', style: 'width: 25%', sortable: true },
          { field: 'availableQty', name: 'availableQty', label: 'Stock', align: 'left', style: 'width: 20%', sortable: true },
          { field: 'id', name: 'id', label: 'Edit', align: 'left', style: 'width: 10%' }
        ]
      },
      searchFilter: '',
      modal: false,
      productId: 0
    }
  },
  mounted () {
    this.Load()
  },
  methods: {
    Load () {
      this.$axios.get('/Products')
        .then(Res => { this.Tabela.tableData = Res.data })
        .catch(this.AxiosCatch)
    },
    OpenModal (id) {
      this.modal = true
      this.productId = id || 0
    }
  }
}
</script>

<style>
</style>
