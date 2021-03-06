import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './views/Inicio.vue'
import Pacientes from './views/Pacientes.vue'
import Clientes from './views/Clientes.vue'
import DetalleCliente from './views/DetalleCliente.vue'
import DetallePaciente from './views/DetallePaciente.vue'
import RegistrosMedicos from './views/RegistrosMedicos.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'inicio',
      component: Login
    },
    // Muestra la pagina principal.
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    // Muestra la lista de pacientes.
    {
      path: '/pacientes',
      name: 'pacientes',
      component: Pacientes
    },
    // Muestra el detalle de un paciente dado su id.
    {
      path: '/pacientes/:id',
      name: 'paciente',
      props: true,
      component: DetallePaciente
    },
    // Muestra la lista de clientes.
    {
      path: '/clientes',
      name: 'clientes',
      component: Clientes
    },
    // Muestra el detalle de un cliente dado su id.
    {
      path: '/clientes/:id',
      name: 'cliente',
      props: true,
      component: DetalleCliente
    },
    // Muestra la lista de registros medicos.
    {
      path: '/registros',
      name: 'registrosMedicos',
      component: RegistrosMedicos
    }

  ]
})
