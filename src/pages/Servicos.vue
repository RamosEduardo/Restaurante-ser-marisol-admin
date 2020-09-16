<template>
  <div>
    <nav-bar />
    <b-container>
      <b-row style="margin-top: 20px; display:flex; justify-content:center">
        <b-col lg="10" md="10" sm="12">
          <input-servicos @adiciona-servico="setServicos" class="mb-4" />
          <b-list-group>
            <b-list-group-item v-for="(item, index) in servicos" :key="index">
              <div class="d-flex justify-content-between align-items-center">
                <b-col cols="10">
                  <b-row>
                    <div class="ml-3" v-b-toggle="item + '-' + index">{{ item.descricao }}</div>
                  </b-row>
                </b-col>

                <b-col cols="2">
                  <b-row :name="item.id">
                    <b-button
                      @click="removerItem(item.id)"
                      variant="outline-danger"
                      size="sm"
                      class="d-flex justify-content-center align-items-center pt-10"
                    >
                      <b-icon icon="trash-fill" />
                    </b-button>
                  </b-row>
                </b-col>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import Botao from "../components/Botao";
import InputServicos from "../components/InputServicos";
import NavBar from "../components/NavBar";
import _ from "lodash";
import server from "../service/server";

export default {
  data() {
    return {
      servicos: [],
    };
  },

  methods: {
    async listServicos() {
      const { data } = await server.get("/servicosOferecidos")
      this.servicos = data
    },

    setServicos(servico) {
      const { descricao, id } = servico;
      const servicoNovo = { id, descricao };
      this.servicos.push(servicoNovo);
    },

    removerItem(idItem) {
      server.delete("/servicosOferecidos/" + idItem).then(() => {
        const newServico = _.filter(this.servicos, function (o) {
          return o.id !== idItem;
        });
        this.servicos = newServico;
      });
    },
  },

  components: {
    // "button-icon": Botao,
    "input-servicos": InputServicos,
    "nav-bar": NavBar,
  },

  async created() {
    await this.listServicos();
  },
};
</script>