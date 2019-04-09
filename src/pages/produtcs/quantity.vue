<template>
  <div class="row flex-center q-pa-none">
    <q-card>
      <q-card-title class="bg-pink-11 text-white q-py-sm">
        Set Quantity
      </q-card-title>
      <q-card-main class="row q-mx-sm">
        <q-field
          class="col-12 q-px-md"
          label="Quantity"
          label-width="12"
          :error="$v.form.purchasedQty.$error"
          :helper="`There are ${product.availableQty} diapers available`"
        >
          <q-input
            v-model="form.purchasedQty"
            type="number"
            color="light"
          />
        </q-field>
      </q-card-main>
      <q-card-actions
        class="q-mx-md q-mb-lg"
        align="center"
      >
        <q-btn
          class="q-pa-md"
          label="Voltar"
          icon="arrow_back_ios"
          color="teal-11"
          text-color="pink-11"
          rounded
          size="form-inverted"
          v-close-overlay
        />
        <q-btn
          class="q-pa-md"
          label="Salvar"
          icon="save"
          color="teal-11"
          text-color="pink-11"
          rounded
          size="form-inverted"
          @click="Save"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { AxiosCatchMixin } from '../../mixins/AxiosCatch'
import { required, integer, minValue, maxValue } from 'vuelidate/lib/validators'
const touchMap = new WeakMap()
export default {
  name: 'EditProduct',
  props: ['product'],
  mixins: [AxiosCatchMixin],
  data () {
    return {
      isNotNew: (this.product.id || '').length > 0,
      form: {
        id: this.product.id,
        purchasedQty: 0
      }
    }
  },
  validations () {
    const validate = {
      form: {
        purchasedQty: {
          required,
          integer,
          minValue: minValue(1),
          maxValue: maxValue(this.product.availableQty)
        }
      }
    }

    return validate
  },
  methods: {
    delayTouch ($v) {
      $v.$reset()
      if (touchMap.has($v)) clearTimeout(touchMap.get($v))
      touchMap.set($v, setTimeout($v.$touch, 1000))
    },
    Save () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify('O Formulário possui erros. Verifique os dados Informados.')
      } else {
        let purchasedQtyCopy = this.form.purchasedQty
        let form = JSON.parse(JSON.stringify(this.form))
        form.purchasedQty += this.product.purchasedQty
        form.availableQty = this.product.availableQty - this.form.purchasedQty
        const formSave = this.isNotNew
          ? this.$axios.patch(`/Products/${this.product.id}`, {
            purchasedQty: form.purchasedQty,
            availableQty: form.availableQty
          })
          : this.$axios.post(`/Products`, {
            purchasedQty: form.purchasedQty,
            availableQty: form.availableQty
          })

        formSave
          .then(Res => {
            this.$q.notify({
              type: 'positive',
              message: `You bought ${purchasedQtyCopy} items!`
            })
            this.$emit('refresh')
          })
          .catch(this.AxiosCatchMixin)
      }
    }
  }
}
</script>
