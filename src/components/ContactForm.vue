<!-- src/components/ContactForm.vue -->
<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

// Props: recibimos el contacto a editar (si hay)
const props = defineProps({
  contact: Object
})

// Emitimos un evento 'save' cuando se envía el formulario
const emit = defineEmits(['save'])

// Formulario reactivo
const form = ref({
  id: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: ''
})

// Si recibimos un contacto para editar, llenamos el formulario
watch(() => props.contact, (newContact) => {
  if (newContact) {
    form.value = { ...newContact }
  } else {
    form.value = { id: null, firstName: '', lastName: '', phone: '', email: '' }
  }
}, { immediate: true })

// Enviar formulario
const save = () => {
  emit('save', { ...form.value }) // enviamos los datos al padre
  resetForm()
}

// Limpiar formulario
const resetForm = () => {
  form.value = { id: null, firstName: '', lastName: '', phone: '', email: '' }
}
</script>

<template>
  <form @submit.prevent="save">
    <input v-model="form.firstName" placeholder="First Name" required />
    <input v-model="form.lastName" placeholder="Last Name" required />
    <input v-model="form.phone" placeholder="Phone" required />
    <input v-model="form.email" placeholder="Email" required />
    <button type="submit">{{ form.id ? 'Update' : 'Add' }} Contact</button>
    <button type="button" @click="resetForm">Clear</button>
  </form>
</template>

<style scoped>
/* Agrega estilos si quieres */
input{
    display: block;
}
</style>