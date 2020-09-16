<template>
  <!-- <b-row>
    <div>
      <b-form-input
        v-focus="true"
        v-model="estrutura"
        @keyup.enter="addEstrutura"
        class="mr-lg-2"
        placeholder="Adicionar Item da Estrutura"
      />
    </div>
    <div>
      <b-button>
        
      </b-button>
    </div>
  </b-row> -->
  <div style="display: flex; flex-direction: row; flex-wrap: wrap" >
    <div style="
      display: flex;
      flex-direction: column;
      width: 80%;
      justify-content: flex-start;
      padding: 2px;
    ">
      <b-form-input
        id="input-small"
        class="mt-2"
        size="sm"
        v-model="estrutura"
        placeholder="Informe o Item da Estrutura"
      />
    </div>

    <div
      style="
        display: flex;
        flex-direction: column;
        width: 20%;
        justify-content: flex-end;
        padding: 2px;  
      "
    >
      <b-button @click="addEstrutura" variant="outline-success" size="sm" class="d-flex justify-content-center align-items-center pt-10">
        <b-icon icon="plus"/>
        Adicionar
      </b-button>
    </div>
    
  </div>
</template>

<script>

import { Estrutura } from "../models/Estrutura";
import Focus from "../directives/focus";

export default {
  directives: {
    focus: Focus,
  },
  data () {
    return {
      estrutura: '',
    }
  },
  methods: {
    addEstrutura () {

      let value = this.estrutura
      let estrutura = this.createEstrutura(value)

      this.$http.post('http://localhost:3333/estrutura', estrutura).then((resp) => {
        // const { titulo, icone } = task
        // this.task = {
        //   id: resp.body.id[0],
        //   titulo: titulo,
        //   status: ''
        // }
        console.log(resp);
        
        this.clearField()
      });
    },
    createEstrutura (value) {
      let estrutura = new Estrutura()
      estrutura.titulo = value
      return estrutura
    },
    clearField () {
      this.$emit('adiciona-estrutura', this.estrutura);
      this.estrutura = ''
    }
  }
}
</script>