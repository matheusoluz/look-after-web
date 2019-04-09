<template>
  <q-page class="row justify-center items-start q-pa-md">
    <q-modal
      :value="Boolean(modal)"
      :content-css="{maxWidth: '40vw', maxHeight: '80vh'}"
      minimized
      @hide="() => modal = 0"
    >
      <edit-product
        v-if="modal === 1"
        :productId="product.id"
        @refresh="Refresh"
      />
      <edit-quantity
        v-if="modal === 2"
        :product="product"
        @refresh="Refresh"
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
            @click="OpenModal({id: 0}, 1)"
          >
            <q-tooltip
              v-if="!this.$q.platform.is.mobile"
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
          :loading="Tabela.loading"
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
                <span class="text-weight-medium">{{props.row.model}}</span>
              </div>
            </q-td>
            <q-td
              key="description"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="text-weight-medium">{{props.row.description}}</span>
              </div>
            </q-td>
            <q-td
              key="sizes"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="text-weight-medium">{{props.row.sizes}}</span>
              </div>
            </q-td>
            <q-td
              key="availableQty"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="text-weight-medium">{{props.row.availableQty}}</span>
              </div>
            </q-td>
            <q-td
              key="purchasedQty"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="text-weight-medium">{{props.row.purchasedQty}}</span>
              </div>
            </q-td>
            <q-td
              key="timeToZeroed"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="text-weight-medium">{{props.row.timeToZeroed}} min.</span>
              </div>
            </q-td>
            <q-td
              key="id"
              :props="props"
            >
              <q-btn
                class="no-shadow q-mx-xs"
                round
                dense
                flat
                color="info"
                icon="edit"
                @click="OpenModal(props.row, 1)"
              >
                <q-tooltip
                  v-if="!$q.platform.is.mobile"
                  anchor="bottom middle"
                  self="top middle"
                  :offset="[0, 8]"
                >
                  Edit product
                </q-tooltip>
              </q-btn>
              <q-btn
                class="no-shadow q-mx-xs"
                round
                dense
                flat
                color="red"
                icon="delete"
                @click="Delete(props.row.id)"
              >
                <q-tooltip
                  v-if="!$q.platform.is.mobile"
                  anchor="bottom middle"
                  self="top middle"
                  :offset="[0, 8]"
                >
                  Delete product
                </q-tooltip>
              </q-btn>
              <q-btn
                class="no-shadow q-mx-xs"
                round
                dense
                flat
                color="dark"
                icon="add_shopping_cart"
                @click="OpenModal(props.row, 2)"
              >
                <q-tooltip
                  v-if="!$q.platform.is.mobile"
                  anchor="bottom middle"
                  self="top middle"
                  :offset="[0, 8]"
                >
                  Purchase
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
import editQuantity from './quantity'
export default {
  name: 'ListInventory',
  components: { editProduct, editQuantity },
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
          { field: 'description', name: 'description', label: 'Description', align: 'left', style: 'width: 30%', sortable: true },
          { field: 'sizes', name: 'sizes', label: 'Size', align: 'left', style: 'width: 10%', sortable: true },
          { field: 'availableQty', name: 'availableQty', label: 'Stock', align: 'left', style: 'width: 10%', sortable: true },
          { field: 'purchasedQty', name: 'purchasedQty', label: 'Purchased', align: 'left', style: 'width: 10%', sortable: true },
          { field: 'timeToZeroed', name: 'timeToZeroed', label: 'Time To Zeroed', align: 'left', style: 'width: 10%', sortable: true },
          { field: 'id', name: 'id', label: 'Actions', align: 'left', style: 'width: 10%' }
        ]
      },
      searchFilter: '',
      modal: false,
      product: { id: 0 }
    }
  },
  mounted () {
    this.Load()
  },
  methods: {
    Load () {
      this.$axios.get('/Products', {
        params: {
          filter: {
            where: { isActive: true }
          }
        }
      })
        .then(Res => {
          this.Tabela.tableData = Res.data
          this.Tabela.loading = false
        })
        .catch(Err => {
          this.Tabela.loading = false
          this.AxiosCatch(Err)
        })
    },
    OpenModal (product, typeModal) {
      this.modal = typeModal
      this.product = product
    },
    Refresh () {
      this.modal = false
      this.Load()
    },
    Delete (id) {
      this.$q.dialog({
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir o(s) produto(s) selecionada(s)?',
        ok: 'Sim',
        cancel: 'Cancelar'
      })
        .then(() => {
          this.$axios.patch(`/Products/${id}`, { isActive: false })
            .then(Res => {
              this.Tabela.loading = true
              this.Tabela.tableData = []
              this.Load()
            })
            .catch(this.AxiosCatch)
        })
    }
  }
}
</script>

<style>
</style>
