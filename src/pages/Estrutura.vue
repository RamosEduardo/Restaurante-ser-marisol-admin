<template>
    <div>
      <nav-bar />
      <b-container v-if="estrutura.length > 0 || viewCreate">
        <b-row style="margin-top: 20px; display:flex; justify-content:center">
          <b-col lg="10" md="10" sm="12">
            <input-estrutura
              @adiciona-estrutura="setEstrutura"
              class="mb-4"
            />
            <b-list-group>
              <b-list-group-item
                v-for="(item, index) in estrutura"
                :key="index"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <b-col cols="10">
                    <b-row>
                      <div class="ml-3" v-b-toggle="item + '-' + index">
                        {{ item.titulo }}
                      </div>
                    </b-row>
                  </b-col>

                  <div style="display: flex; justify-content: flex-end; flex-direction: column">
                    <b-button @click="removerItem(item.id)" variant="outline-danger" size="sm" class="d-flex justify-content-center align-items-center pt-10">
                      <b-icon icon="trash-fill"/>
                    </b-button>
                  </div>
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-container>

      <b-container v-else>
        <div style="width: 100%;margin-top: 30px; display: flex; flex-direction: column; height: 100%; justify-content: center; align-items: center">
          <img style="width: 20%" src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTAgMzgzLjQ3M2g4Mi4yMzRsMzcuODg1LTU4LjE0MmMxMC43MDYtMTYuNDMxIDI4LjkyNy0yNi4zMzEgNDguNDY0LTI2LjMzMWgxMDcuNzQ3YzE2LjUzMyAwIDI5LjkzNSAxMy40NzYgMjkuOTM1IDMwLjEgMCAxNi42MjQtMTMuNDAyIDMwLjEtMjkuOTM1IDMwLjFoLTQ0LjQyYy0xNi41MzMgMC0yOS45MzUgMTMuNDc2LTI5LjkzNSAzMC4xIDAgMTYuNjI0IDEzLjQwMiAzMC4xIDI5LjkzNSAzMC4xaDI1LjY0MmMxMC4xMDUgMCAxOS44ODYtMy41ODEgMjcuNjI2LTEwLjExM2wxMjEuNjkxLTEwMi42NzRjMTAuNjk4LTkuMDI5IDI1Ljk1Mi0xMC4xMzIgMzcuODI1LTIuNzM1IDE3LjA5OCAxMC42NTMgMjAuNDc4IDM0LjI0OSA3LjA2NSA0OS4zMjFsLTExOC4wNjIgMTMwLjAxNGMtMTYuMzAyIDE4LjMxOC0zOS41OTIgMjguNzg3LTY0LjAzOSAyOC43ODdoLTI2OS42NTh6IiBmaWxsPSIjZmVkYmFjIi8+PHBhdGggZD0ibTI3Ni4zMyAzNTkuMTk5YzE2LjUzMyAwIDI5LjkzNS0xMy40NzYgMjkuOTM1LTMwLjEgMC0xNi42MjQtMTMuNDAyLTMwLjEtMjkuOTM1LTMwLjFoLTIwLjMzdjYwLjE5OWgyMC4zM3oiIGZpbGw9IiNmZWJlODUiLz48cGF0aCBkPSJtNDQ0LjY5MyAzMDMuODc3Yy0xMS44NzMtNy4zOTctMjcuMTI3LTYuMjk0LTM3LjgyNSAyLjczNWwtMTIxLjY5IDEwMi42NzNjLTcuNzM5IDYuNTMyLTE3LjUyMSAxMC4xMTMtMjcuNjI2IDEwLjExM2gtMS41NTJ2OTIuNjAyaDEzLjY1OGMyNC40NDcgMCA0Ny43MzYtMTAuNDY5IDY0LjAzOC0yOC43ODdsMTE4LjA2MS0xMzAuMDE2YzEzLjQxNC0xNS4wNzEgMTAuMDM0LTM4LjY2Ny03LjA2NC00OS4zMnoiIGZpbGw9IiNmZWJlODUiLz48cGF0aCBkPSJtNDU4IDI5OS4zOTZoLTQwNGMtMjkuODIzIDAtNTQtMjQuMTc3LTU0LTU0IDAtNS41MjMgNC40NzctMTAgMTAtMTBoNDkyYzUuNTIzIDAgMTAgNC40NzcgMTAgMTAgMCAyOS44MjMtMjQuMTc3IDU0LTU0IDU0eiIgZmlsbD0iI2FiY2NkMSIvPjxwYXRoIGQ9Im01MDIgMjM1LjM5NmgtMjQ2djY0aDIwMmMyOS44MjMgMCA1NC0yNC4xNzcgNTQtNTQgMC01LjUyMy00LjQ3Ny0xMC0xMC0xMHoiIGZpbGw9IiM3Yzk2YTYiLz48ZyBmaWxsPSIjYzEzNDQ3Ij48cGF0aCBkPSJtNDI4LjkxNyAxODYuMjU4aC0zOS4xNjdjLTguMjg0IDAtMTUtNi43MTYtMTUtMTVzNi43MTYtMTUgMTUtMTVoMzkuMTY3YzguMjg0IDAgMTUgNi43MTYgMTUgMTVzLTYuNzE2IDE1LTE1IDE1eiIvPjxwYXRoIGQ9Im0zNjMuMTM5IDExMi44NTRjLTQuNDAxIDAtOC43NjItMS45MjctMTEuNzI1LTUuNjMyLTUuMTc0LTYuNDctNC4xMjMtMTUuOTA5IDIuMzQ3LTIxLjA4M2wzMC41ODktMjQuNDYxYzYuNDY5LTUuMTczIDE1LjkwOC00LjEyNSAyMS4wODMgMi4zNDcgNS4xNzQgNi40NyA0LjEyMyAxNS45MDktMi4zNDcgMjEuMDgzbC0zMC41ODkgMjQuNDYxYy0yLjc2NSAyLjIxMS02LjA3MyAzLjI4NS05LjM1OCAzLjI4NXoiLz48cGF0aCBkPSJtMjk2LjcxNiA2Ny4zMDFjLTEuNTIgMC0zLjA2NC0uMjMyLTQuNTg5LS43MjItNy44ODgtMi41MzItMTIuMjI5LTEwLjk3OS05LjY5Ny0xOC44NjdsMTEuOTcyLTM3LjI5MmMyLjUzMi03Ljg4OCAxMC45OC0xMi4yMjkgMTguODY3LTkuNjk3IDcuODg4IDIuNTMyIDEyLjIyOSAxMC45NzkgOS42OTcgMTguODY3bC0xMS45NzIgMzcuMjkyYy0yLjA0MyA2LjM2My03LjkzNSAxMC40MTktMTQuMjc4IDEwLjQxOXoiLz48L2c+PHBhdGggZD0ibTIxNS4yODQgNjcuMzAxYy02LjM0NCAwLTEyLjIzNi00LjA1NS0xNC4yNzktMTAuNDE5bC0xMS45NzEtMzcuMjkyYy0yLjUzMi03Ljg4OCAxLjgxLTE2LjMzNCA5LjY5OC0xOC44NjcgNy44ODctMi41MzMgMTYuMzM1IDEuODEgMTguODY3IDkuNjk4bDExLjk3MSAzNy4yOTJjMi41MzIgNy44ODgtMS44MSAxNi4zMzQtOS42OTggMTguODY3LTEuNTIzLjQ4OC0zLjA2OS43MjEtNC41ODguNzIxeiIgZmlsbD0iI2ZmNWY2MiIvPjxwYXRoIGQ9Im0xNDguODYxIDExMi44NTRjLTMuMjg1IDAtNi41OTMtMS4wNzQtOS4zNTgtMy4yODZsLTMwLjU4OS0yNC40NjFjLTYuNDctNS4xNzQtNy41MjEtMTQuNjEzLTIuMzQ3LTIxLjA4MyA1LjE3NC02LjQ2OSAxNC42MTMtNy41MjEgMjEuMDgzLTIuMzQ3bDMwLjU4OSAyNC40NjFjNi40NyA1LjE3NCA3LjUyMSAxNC42MTMgMi4zNDcgMjEuMDgzLTIuOTYyIDMuNzA2LTcuMzIzIDUuNjMzLTExLjcyNSA1LjYzM3oiIGZpbGw9IiNmZjVmNjIiLz48cGF0aCBkPSJtMTIyLjI1IDE4Ni4yNThoLTM5LjE2N2MtOC4yODQgMC0xNS02LjcxNi0xNS0xNXM2LjcxNi0xNSAxNS0xNWgzOS4xNjdjOC4yODQgMCAxNSA2LjcxNiAxNSAxNXMtNi43MTYgMTUtMTUgMTV6IiBmaWxsPSIjZmY1ZjYyIi8+PC9zdmc+" />
          <span style="margin-top: 40px">
              Nenhum Item Cadastrado...
          </span>
          <div style="margin-top: 20px">
              <b-button @click="viewCreate = !viewCreate" variant="success" size="sm" class="d-flex justify-content-center align-items-center pt-10 mb-3">
                  <b-icon icon="file-plus" style="margin-right: 10px"/>
                  Adicionar Item da Estrutura
              </b-button>
          </div>
        </div>
      </b-container>
    </div>
</template>

<script>
// import Botao from "../components/Botao";
import InputTask from "../components/InputTask";
import NavBar from '../components/NavBar'
import _ from "lodash";
import server from "../service/server";

export default {
  data() {
    return {
      estrutura: [],
      viewDescription: false,
      viewEstrutura: false,
      viewCreate: false,
    };
  },

  methods: {
    listEstrutura() {
      server.get("/estrutura").then((resp) => {
        this.estrutura = resp.data.estrutura;
      });
    },

    setEstrutura(titulo) {
        const estrutura = {titulo}
        this.estrutura.push(estrutura);
    },

    removerItem(idItem) {
        server.delete("/estrutura/" + idItem)
        .then(() => {
            const newEstrutura = _.filter(this.estrutura, (o) => { return o.id !== idItem; });
            this.estrutura = newEstrutura;
        });
    }

  },

  components: {
    // "button-icon": Botao,
    "input-estrutura": InputTask,
    "nav-bar": NavBar,
  },

  async created() {
    await this.listEstrutura();
  },
};
</script>