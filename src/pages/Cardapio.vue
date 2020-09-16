<template>
  <div>
    <nav-bar />
    <b-row style="display:flex;justify-content:center;margin-top:10px">
      <b-col cols="8">
        <b-button
          v-if="cardapios.length > 0"
          @click="newCardapioView = !newCardapioView"
          variant="success"
          size="sm"
          class="d-flex justify-content-center align-items-center pt-10 mb-3"
        >
          <b-icon icon="file-plus" />Novo Cardápio
        </b-button>
        <b-list-group v-if="cardapios.length > 0">
          <b-list-group-item v-for="(cardapio, index) in cardapios" :key="`cardapio-`+index">
            <span cols="12">
              <b-row>
                <b-col cols="6" @click="cardapio.visible = !cardapio.visible">
                  Cardápio: {{ cardapio.titulo }}
                  <b-icon-arrow-down />
                </b-col>
                <b-col cols="6">
                  <div style="display: flex; justify-content: flex-end">
                    <b-button
                      @click="adicionarPrato(index)"
                      style="z-index:1000;margin-right: 10px"
                      variant="success"
                      size="sm"
                      class="d-flex justify-content-center align-items-center pt-10"
                    >
                      <b-icon icon="plus" />Adicionar Prato
                    </b-button>
                    <b-button
                      @click="removerCardápio(cardapio.id)"
                      variant="danger"
                      size="sm"
                      class="d-flex justify-content-center align-items-center pt-10"
                    >
                      <b-icon icon="trash-fill" />Excluir Cardápio
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </span>

            <b-collapse v-model="cardapio.visible" class="mt-2">
              <div
                v-for="(produto, indexProduto) in cardapio.produtosCardapio"
                :key="`produto-`+indexProduto"
                style="padding:5px"
              >
                <b-row class="row-product">
                  <div style="display: flex; flex-direction: row; margin-top: auto; padding: 10px">
                    <div>
                      <b-icon
                        icon="trash-fill"
                        @click="removerPratoCardapio(produto.id,index)"
                        variant="danger"
                        style="cursor: pointer;"
                      />
                    </div>
                    <span style="margin-left: 10px; margin-right: 30px">{{ produto.nome }}</span>
                  </div>
                </b-row>
              </div>

              <hr />

              <b-row v-show="newAdd" class="my-1">
                <b-col lg="7" sm="12">Nome do Produto:</b-col>

                <b-col lg="5" sm="12">
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      <b-icon
                        @click="newCategoria = !newCategoria"
                        style="cursor: pointer;"
                        variant="success"
                        icon="plus"
                      />Categoria:
                    </div>
                  </div>
                </b-col>
              </b-row>

              <b-row v-show="newAdd" class="my-1">
                <b-col lg="7" sm="12">
                  <b-form-input
                    v-model="pratoAdd.nome"
                    class="mt-2"
                    id="input-small"
                    size="sm"
                    placeholder="Informe o Produto"
                  ></b-form-input>
                </b-col>

                <b-col lg="5" sm="12">
                  <b-row>
                    <b-col cols="8">
                      <b-form-select
                        class="mt-2"
                        size="sm"
                        v-model="pratoAdd.idCategoriaProduto"
                        :options="listCategoriasCardapio"
                      />
                    </b-col>
                    <b-col cols="4" style="margin-auto">
                      <div
                        style="display: flex; flex-direction: row; justify-content: flex-end;padding-top: 10px"
                      >
                        <b-button
                          @click="salvarPrato(cardapio)"
                          style="margin-right: 10px"
                          variant="outline-success"
                          size="sm"
                          class="d-flex justify-content-center align-items-center pt-10"
                        >
                          <b-icon icon="plus" />
                        </b-button>
                        <b-button
                          @click="newAdd = !newAdd"
                          variant="outline-danger"
                          size="sm"
                          class="d-flex justify-content-center align-items-center pt-10"
                        >
                          <b-icon icon="trash-fill" />
                        </b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-collapse>
          </b-list-group-item>
        </b-list-group>
        <div
          v-else
          style="width: 100%;margin-top: 30px; display: flex; flex-direction: column; height: 100%; justify-content: center; align-items: center"
        >
          <img
            style="width: 20%"
            src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTAgMzgzLjQ3M2g4Mi4yMzRsMzcuODg1LTU4LjE0MmMxMC43MDYtMTYuNDMxIDI4LjkyNy0yNi4zMzEgNDguNDY0LTI2LjMzMWgxMDcuNzQ3YzE2LjUzMyAwIDI5LjkzNSAxMy40NzYgMjkuOTM1IDMwLjEgMCAxNi42MjQtMTMuNDAyIDMwLjEtMjkuOTM1IDMwLjFoLTQ0LjQyYy0xNi41MzMgMC0yOS45MzUgMTMuNDc2LTI5LjkzNSAzMC4xIDAgMTYuNjI0IDEzLjQwMiAzMC4xIDI5LjkzNSAzMC4xaDI1LjY0MmMxMC4xMDUgMCAxOS44ODYtMy41ODEgMjcuNjI2LTEwLjExM2wxMjEuNjkxLTEwMi42NzRjMTAuNjk4LTkuMDI5IDI1Ljk1Mi0xMC4xMzIgMzcuODI1LTIuNzM1IDE3LjA5OCAxMC42NTMgMjAuNDc4IDM0LjI0OSA3LjA2NSA0OS4zMjFsLTExOC4wNjIgMTMwLjAxNGMtMTYuMzAyIDE4LjMxOC0zOS41OTIgMjguNzg3LTY0LjAzOSAyOC43ODdoLTI2OS42NTh6IiBmaWxsPSIjZmVkYmFjIi8+PHBhdGggZD0ibTI3Ni4zMyAzNTkuMTk5YzE2LjUzMyAwIDI5LjkzNS0xMy40NzYgMjkuOTM1LTMwLjEgMC0xNi42MjQtMTMuNDAyLTMwLjEtMjkuOTM1LTMwLjFoLTIwLjMzdjYwLjE5OWgyMC4zM3oiIGZpbGw9IiNmZWJlODUiLz48cGF0aCBkPSJtNDQ0LjY5MyAzMDMuODc3Yy0xMS44NzMtNy4zOTctMjcuMTI3LTYuMjk0LTM3LjgyNSAyLjczNWwtMTIxLjY5IDEwMi42NzNjLTcuNzM5IDYuNTMyLTE3LjUyMSAxMC4xMTMtMjcuNjI2IDEwLjExM2gtMS41NTJ2OTIuNjAyaDEzLjY1OGMyNC40NDcgMCA0Ny43MzYtMTAuNDY5IDY0LjAzOC0yOC43ODdsMTE4LjA2MS0xMzAuMDE2YzEzLjQxNC0xNS4wNzEgMTAuMDM0LTM4LjY2Ny03LjA2NC00OS4zMnoiIGZpbGw9IiNmZWJlODUiLz48cGF0aCBkPSJtNDU4IDI5OS4zOTZoLTQwNGMtMjkuODIzIDAtNTQtMjQuMTc3LTU0LTU0IDAtNS41MjMgNC40NzctMTAgMTAtMTBoNDkyYzUuNTIzIDAgMTAgNC40NzcgMTAgMTAgMCAyOS44MjMtMjQuMTc3IDU0LTU0IDU0eiIgZmlsbD0iI2FiY2NkMSIvPjxwYXRoIGQ9Im01MDIgMjM1LjM5NmgtMjQ2djY0aDIwMmMyOS44MjMgMCA1NC0yNC4xNzcgNTQtNTQgMC01LjUyMy00LjQ3Ny0xMC0xMC0xMHoiIGZpbGw9IiM3Yzk2YTYiLz48ZyBmaWxsPSIjYzEzNDQ3Ij48cGF0aCBkPSJtNDI4LjkxNyAxODYuMjU4aC0zOS4xNjdjLTguMjg0IDAtMTUtNi43MTYtMTUtMTVzNi43MTYtMTUgMTUtMTVoMzkuMTY3YzguMjg0IDAgMTUgNi43MTYgMTUgMTVzLTYuNzE2IDE1LTE1IDE1eiIvPjxwYXRoIGQ9Im0zNjMuMTM5IDExMi44NTRjLTQuNDAxIDAtOC43NjItMS45MjctMTEuNzI1LTUuNjMyLTUuMTc0LTYuNDctNC4xMjMtMTUuOTA5IDIuMzQ3LTIxLjA4M2wzMC41ODktMjQuNDYxYzYuNDY5LTUuMTczIDE1LjkwOC00LjEyNSAyMS4wODMgMi4zNDcgNS4xNzQgNi40NyA0LjEyMyAxNS45MDktMi4zNDcgMjEuMDgzbC0zMC41ODkgMjQuNDYxYy0yLjc2NSAyLjIxMS02LjA3MyAzLjI4NS05LjM1OCAzLjI4NXoiLz48cGF0aCBkPSJtMjk2LjcxNiA2Ny4zMDFjLTEuNTIgMC0zLjA2NC0uMjMyLTQuNTg5LS43MjItNy44ODgtMi41MzItMTIuMjI5LTEwLjk3OS05LjY5Ny0xOC44NjdsMTEuOTcyLTM3LjI5MmMyLjUzMi03Ljg4OCAxMC45OC0xMi4yMjkgMTguODY3LTkuNjk3IDcuODg4IDIuNTMyIDEyLjIyOSAxMC45NzkgOS42OTcgMTguODY3bC0xMS45NzIgMzcuMjkyYy0yLjA0MyA2LjM2My03LjkzNSAxMC40MTktMTQuMjc4IDEwLjQxOXoiLz48L2c+PHBhdGggZD0ibTIxNS4yODQgNjcuMzAxYy02LjM0NCAwLTEyLjIzNi00LjA1NS0xNC4yNzktMTAuNDE5bC0xMS45NzEtMzcuMjkyYy0yLjUzMi03Ljg4OCAxLjgxLTE2LjMzNCA5LjY5OC0xOC44NjcgNy44ODctMi41MzMgMTYuMzM1IDEuODEgMTguODY3IDkuNjk4bDExLjk3MSAzNy4yOTJjMi41MzIgNy44ODgtMS44MSAxNi4zMzQtOS42OTggMTguODY3LTEuNTIzLjQ4OC0zLjA2OS43MjEtNC41ODguNzIxeiIgZmlsbD0iI2ZmNWY2MiIvPjxwYXRoIGQ9Im0xNDguODYxIDExMi44NTRjLTMuMjg1IDAtNi41OTMtMS4wNzQtOS4zNTgtMy4yODZsLTMwLjU4OS0yNC40NjFjLTYuNDctNS4xNzQtNy41MjEtMTQuNjEzLTIuMzQ3LTIxLjA4MyA1LjE3NC02LjQ2OSAxNC42MTMtNy41MjEgMjEuMDgzLTIuMzQ3bDMwLjU4OSAyNC40NjFjNi40NyA1LjE3NCA3LjUyMSAxNC42MTMgMi4zNDcgMjEuMDgzLTIuOTYyIDMuNzA2LTcuMzIzIDUuNjMzLTExLjcyNSA1LjYzM3oiIGZpbGw9IiNmZjVmNjIiLz48cGF0aCBkPSJtMTIyLjI1IDE4Ni4yNThoLTM5LjE2N2MtOC4yODQgMC0xNS02LjcxNi0xNS0xNXM2LjcxNi0xNSAxNS0xNWgzOS4xNjdjOC4yODQgMCAxNSA2LjcxNiAxNSAxNXMtNi43MTYgMTUtMTUgMTV6IiBmaWxsPSIjZmY1ZjYyIi8+PC9zdmc+"
          />
          <span style="margin-top: 40px">Nenhum Cardápio Cadastrado...</span>
          <div style="margin-top: 20px">
            <b-button
              @click="newCardapioView = !newCardapioView"
              variant="success"
              size="sm"
              class="d-flex justify-content-center align-items-center pt-10 mb-3"
            >
              <b-icon icon="file-plus" />Criar Cardápio
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-modal
      title="Adicionar Categoria"
      hide-footer
      id="modal-no-backdrop"
      hide-backdrop
      v-model="newCategoria"
    >
      <b-row>
        <b-col>
          <b-form-input
            v-model="categoriaAdd.nome"
            class="mt-2"
            id="input-small"
            size="sm"
            placeholder="Informe o nome da Categoria"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-button
            @click="adicionarCategoria"
            variant="outline-success"
            size="sm"
            style="width:100%"
            class="d-flex mt-2 justify-content-center align-items-center pt-10"
          >Adicionar</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      title="Adicionar Cardápio"
      hide-footer
      id="cardapio-modal"
      hide-backdrop
      v-model="newCardapioView"
    >
      <b-row>
        <b-col>
          <b-form-input
            v-model="newCardapio.titulo"
            class="mt-2"
            id="input-small"
            size="sm"
            placeholder="Informe o título do cardápio"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-button
            @click="adicionarCardapio"
            variant="outline-success"
            size="sm"
            style="width:100%"
            class="d-flex mt-2 justify-content-center align-items-center pt-10"
          >Adicionar</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>


<script>
import _ from "lodash";
import NavBar from "../components/NavBar";
import servEmpty from "../assets/serving-dish.svg";
import server from "../service/server.js";

export default {
  data() {
    return {
      cardapios: [],
      categoriaCardapio: [],
      visible: false,
      pratoAdd: {},
      categoriaAdd: {},
      newAdd: false,
      newCategoria: false,
      newCardapio: {},
      newCardapioView: false,
      servEmpty,
    };
  },

  components: {
    "nav-bar": NavBar,
  },

  computed: {
    listCategoriasCardapio() {
      return this.categoriaCardapio.map((categoria) => {
        return {
          value: categoria.id,
          text: categoria.nome,
        };
      });
    },
  },

  methods: {
    adicionarPrato(cardapioIndex) {
      if (!this.cardapios[cardapioIndex].visible)
        this.cardapios[cardapioIndex].visible = true;
      this.newAdd = !this.newAdd;
    },
    removerCardápio(idCardapio) {
      server.delete("/cardapios/" + idCardapio).then(() => {
        const cardapios = _.filter(this.cardapios, (cardapio) => {
          return cardapio.id !== idCardapio;
        });
        this.cardapios = cardapios;
      });
    },

    removerPratoCardapio(idPrato, indexCardapio) {
      server.delete("/produto-cardapio/" + idPrato).then(() => {
        const produtosCardapio = _.filter(
          this.cardapios[indexCardapio].produtosCardapio,
          (produto) => {
            return produto.id !== idPrato;
          }
        );
        this.cardapios[indexCardapio].produtosCardapio = produtosCardapio;
      });
    },

    salvarPrato({ id }) {
      this.pratoAdd.idCardapio = id;

      server.post("/produto-cardapio", this.pratoAdd).then((resp) => {
        const idProdutoCardapio = resp.data[0];

        this.cardapios.forEach((cardapio) => {
          if (cardapio.id == this.pratoAdd.idCardapio) {
            if (!cardapio.produtosCardapio) {
              cardapio.produtosCardapio = [];
            }
            cardapio.produtosCardapio.push({
              id: idProdutoCardapio,
              nome: this.pratoAdd.nome,
              idCategoriaProduto: this.pratoAdd.idCategoriaProduto,
            });
          }
        });
        this.pratoAdd = {};
        this.newAdd = false;
      });
    },

    async adicionarCardapio() {
      const { data } = await server.post("/cardapios", this.newCardapio);
      this.newCardapioView = false;
      this.cardapios.push({
        id: data.id,
        titulo: this.newCardapio.titulo,
      });
    },

    async adicionarCategoria() {
      const { data } = await server.post(
        "/categoria-cardapio",
        this.categoriaAdd
      );
      this.newCategoria = false;
      this.categoriaCardapio.push({
        id: data.id,
        nome: this.categoriaAdd.nome,
      });
    },

    async listCardapios() {
      const { data } = await server.get("/cardapios");
      data.map((cardapio) => {
        cardapio.visible = false;
      });
      this.cardapios = data;
    },

    async listCategoriasProdutos() {
      const { data } = await server.get("/categoria-cardapio");
      const { categoriasCardapio } = data;
      this.categoriaCardapio = categoriasCardapio;
    },
  },

  created() {
    this.listCardapios();
    this.listCategoriasProdutos();
  },
};
</script>

<style scoped>
.mt-5 {
  margin-top: 2px;
}
.row-product:hover {
  border-radius: 6px;
  background-color: rgba(161, 161, 165, 0.178);
  transition-duration: 0.5s;
}
</style>