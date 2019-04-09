<template>
  <div class="row flex-center q-pa-none">
    <q-card>
      <q-card-title class="bg-pink-11 text-white q-py-sm">
        {{isNotNew ? 'Edit' : 'New'}} Product
      </q-card-title>
      <q-card-main class="row q-mx-sm">
        <q-field
          class="col-12 q-px-md q-pt-lg"
          label="Model"
          label-width="12"
          :error="$v.form.model.$error"
          error-label="Campo obrigatório."
        >
          <q-input
            v-model="form.model"
            color="light"
          />
        </q-field>
        <q-field
          class="col-12 q-px-md"
          label="Description"
          label-width="12"
          :error="$v.form.description.$error"
          error-label="Campo obrigatório."
        >
          <q-input
            v-model="form.description"
            type="textarea"
            color="light"
          />
        </q-field>
        <q-field
          class="col-6 q-px-md"
          label="Size"
          label-width="12"
          :error="$v.form.sizes.$error"
          error-label="Campo obrigatório."
        >
          <q-input
            v-model="form.sizes"
            color="light"
          />
        </q-field>
        <q-field
          class="col-6 q-px-md"
          label="Stock"
          label-width="12"
          :error="$v.form.availableQty.$error"
          error-label="Campo obrigatório."
        >
          <q-input
            v-model="form.availableQty"
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
import { required, minLength, maxLength, integer } from 'vuelidate/lib/validators'
const touchMap = new WeakMap()
export default {
  name: 'EditProduct',
  props: ['productId'],
  mixins: [AxiosCatchMixin],
  data () {
    return {
      isNotNew: (this.productId || '').length > 0,
      form: {
        id: this.productId,
        model: null,
        description: null,
        sizes: null,
        availableQty: 0
      }
    }
  },
  validations () {
    const validate = {
      form: {
        model: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(140)
        },
        sizes: {
          required,
          maxLength: maxLength(140)
        },
        description: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(240)
        },
        availableQty: {
          required,
          integer
        }
      }
    }

    return validate
  },
  mounted () {
    this.Load()
  },
  methods: {
    delayTouch ($v) {
      $v.$reset()
      if (touchMap.has($v)) clearTimeout(touchMap.get($v))
      touchMap.set($v, setTimeout($v.$touch, 1000))
    },
    Load () {
      if (this.isNotNew) {
        this.$axios.get(`/Products/${this.form.id}`)
          .then(Res => { this.form = Res.data })
          .catch(this.AxiosCatchMixin)
      }
    },
    Save () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify('O Formulário possui erros. Verifique os dados Informados.')
      } else {
        let form = JSON.parse(JSON.stringify(this.form))
        const formSave = this.isNotNew
          ? this.$axios.patch(`/Products/${this.productId}`, {
            model: form.model,
            description: form.description,
            sizes: form.sizes,
            availableQty: form.availableQty
          })
          : this.$axios.post(`/Products`, {
            model: form.model,
            description: form.description,
            sizes: form.sizes,
            availableQty: form.availableQty
          })

        formSave
          .then(Res => {
            this.$q.notify({
              type: 'positive',
              message: 'Cadastro realizado com sucesso!'
            })
            this.$emit('refresh')
          })
          .catch(this.AxiosCatchMixin)
      }
    }
  }
}
</script>
