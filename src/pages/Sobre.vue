<template>
  <section>
    <b-overlay :show="isLoading" rounded="sm">
      <nav-bar />
        <b-row style="display:flex;justify-content:center;margin-top:20px">
          <b-col cols="10">
            <div role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block href="#" v-b-toggle.accordion-1 variant="dark">Missão</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-form-textarea id="textarea" v-model="sobre.missao" rows="3" max-rows="20" />
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block href="#" v-b-toggle.accordion-2 variant="dark">Visão</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-form-textarea id="textarea" v-model="sobre.visao" rows="3" max-rows="20" />
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block href="#" v-b-toggle.accordion-3 variant="dark">Valores</b-button>
                </b-card-header>
                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-form-textarea id="textarea" v-model="sobre.valores" rows="3" max-rows="20" />
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block href="#" v-b-toggle.accordion-4 variant="dark">Nossa História</b-button>
                </b-card-header>
                <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-form-textarea
                      id="textarea"
                      v-model="sobre.nossaIdentidade"
                      rows="3"
                      max-rows="20"
                    />
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </b-col>
        </b-row>
      <b-row style="display:flex;justify-content:center;margin-top:20px">
        <b-col cols="10">
          <div style="display: flex; justify-content: flex-end; padding: 10px">
            <!-- <b-button @click="cancelar" variant="danger" size="sm" class="d-flex justify-content-center align-items-center pt-10">
                            <b-icon icon="trash" class="mr-2"/>
                            Cancelar
            </b-button>-->
            <b-button
              @click="salvar"
              style="margin-left: 10px"
              variant="success"
              size="sm"
              class="d-flex justify-content-center align-items-center pt-10"
            >
              <b-icon icon="check-all" class="mr-2" />Salvar
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-overlay>
  </section>
</template>

<script>
import NavBar from "../components/NavBar";
import _ from "lodash";
import server from "../service/server";

export default {
  data() {
    return {
      sobre: [],
      sobre__copy: [],
      isLoading: false,
    };
  },

  components: {
    "nav-bar": NavBar,
  },

  methods: {
    async listSobre() {
      const { data } = await server.get("/infos");
      this.sobre = data;
      this.sobre__copy = _.clone(data);
    },

    cancelar() {
      this.sobre = this.sobre__copy;
    },

    async salvar() {
      this.isLoading = true;
      const info = this.sobre;
      await server.put("/infos/1", JSON.stringify({ info }));
      this.isLoading = false;
    },
  },

  created() {
    this.listSobre();
  },
};
</script>