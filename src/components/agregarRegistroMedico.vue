<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
     <v-toolbar card dark color="green">
            <v-btn icon dark @click="dialog=false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Nuevo Registro</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    

    <v-btn slot="activator" color="purple" dark class="mb-2">
      <v-icon small left>add</v-icon>Nuevo Registro
    </v-btn>
    <v-card>
      <v-card-text>
        <v-container grid-list-md>
          <v-flex>
            <v-textarea v-model="editedItem.patologia" label="Patología" autofocus="true"></v-textarea>
          </v-flex>
          <v-layout row wrap>
            <v-flex>
              <v-textarea v-model="editedItem.motivo" label="Motivo" autofocus="true"></v-textarea>
            </v-flex>
            <v-flex>
              <v-textarea v-model="editedItem.anamnesis" label="Anamnesia"></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.peso" label="Peso" suffix="kgs"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.temperatura" label="Temperatura" suffix="°C"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.hidratacion" label="Hidratación"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.pulso" label="Pulso"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.frecuencia_cardiaca"
                label="Frecuencia Cardiaca"
                suffix="bpm"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.frecuencia_respiratoria"
                label="Frecuencia Respiratoria"
                suffix="bpm"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.mucosas" label="Mucosas"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.tiempo_de_llenado_capilar"
                label="Tiempo de llenado capilar"
                suffix="segs"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.ganglios" label="Ganglios"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.reflejo_tusigeno" label="Reflejo Tusigeno"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.reflejo_deglutorio" label="Reflejo Deglutorio"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.palpitacion_abdominal"
                label="Palpitación Abdominal"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.palmopercusion" label="Palmopercusión"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.tonsilas" label="Tonsilas"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.conciencia" label="Conciencia"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.condicion_corporal" label="Condición Corporal"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn right color="red" v-on:click="close" dark>Cancelar</v-btn >
          <v-btn left color="green" v-on:click="save" dark>Guardar</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import "../Utils";

export default {
  props: {
    //id del registroMedico a editar
    id_paciente: Number,
    id_registro: Number,
    update_db: Boolean
  },

  data: function() {
    return {
      valid: false,
      dialog: false,

      registrosMedicos: null,

      editedItem: {
        id: "",
        motivo: "",
        paciente: "",
        id_paciente: "",
        fecha: "",
        anamnesis: "",
        peso: 0,
        temperatura: 0,
        hidratacion: "",
        pulso: 0,
        frecuencia_cardiaca: 0,
        frecuencia_respiratoria: 0,
        mucosas: "",
        tiempo_de_llenado_capilar: 0,
        ganglios: "",
        reflejo_tusigeno: "",
        reflejo_deglutorio: "",
        palpitacion_abdominal: "",
        palmopercusion: "",
        condicion_corporal: "",
        tonsilas: "",
        conciencia: ""
      }
    };
  },

  created() {
    this.initialize();
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    initialize() {
      if (this.$props.id_paciente) {
        this.editedItem.id_paciente = this.$props.id_paciente;
        return;
      }
      this.$http
        .get("http://localhost:3000/api/registros/" + this.$props.id_registro)
        .then(function(response) {
          this.editedItem = response.body;
        });
    },

    //Limpia el item de datos nulos o vacios (strings = "")
    cleanedItem(item) {
      var newItem = JSON.parse(JSON.stringify(item));
      for (var propName in newItem) {
        if (
          newItem[propName] == null ||
          !newItem[propName] ||
          newItem[propName] == 0 ||
          newItem[propName] == ""
        ) {
          delete newItem[propName];
        }
      }

      return newItem;
    },

    // Cierra el dialogo.
    close: function() {
      this.dialog = false;
    },

    save: function() {
      if (this.editedItem.id) {
        this.$http
          .put(
            "http://localhost:3000/api/registros",
            cleanedItem(this.editedItem)
          )
          .then(function() {
            this.$root.$emit("db_update");
            this.dialog = false;
          });
      } else {
        delete this.editedItem.id;
        this.$http
          .post(
            "http://localhost:3000/api/registros",
            this.cleanedItem(this.editedItem)
          )
          .then(function(response) {
            this.$root.$emit("db_update");
          });
      }
      this.close();
    }
  }
};
</script>