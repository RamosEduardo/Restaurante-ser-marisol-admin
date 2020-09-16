<template>
<div>

  <b-form-input
    v-focus="true"
    v-model="servico"
    @keyup.enter="addServico"
    class="mr-lg-2"
    placeholder="Adicionar Serviço"
  />
</div>
</template>

<script>

import { Servicos } from "../models/Servicos";
import Focus from "../directives/focus";
import server from "../service/server";

export default {
  directives: {
    focus: Focus,
  },
  data () {
    return {
      servico: '',
    }
  },
  methods: {
    addServico () {
      let value = this.servico
      let servico = this.createServico(value)

      server.post('/servicosOferecidos', servico).then((resp) => {
        const { descricao } = servico
        this.servico = {
          id: resp.data.id,
          descricao,
        }
        
        this.clearField()
      });
    },
    createServico (value) {
      let servico = new Servicos()
      servico.descricao = value
      return servico
    },
    clearField () {
      this.$emit('adiciona-servico', this.servico);
      this.servico = ''
    }
  }
}
</script>