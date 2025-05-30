<!-- src/components/ContactForm.vue -->
<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";

// Props: recibimos el contacto a editar (si hay)
const props = defineProps({
  contact: Object,
});

// Emitimos un evento 'save' cuando se envía el formulario
const emit = defineEmits(["save"]);

// Formulario reactivo
const form = ref({
  id: null,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
});

// Si recibimos un contacto para editar, llenamos el formulario
watch(
  () => props.contact,
  (newContact) => {
    if (newContact) {
      form.value = { ...newContact };
    } else {
      form.value = {
        id: null,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      };
    }
  },
  { immediate: true }
);

// Enviar formulario
const save = () => {
  emit("save", { ...form.value }); // enviamos los datos al padre
  resetForm();
};

// Limpiar formulario
const resetForm = () => {
  form.value = { id: null, firstName: "", lastName: "", phone: "", email: "" };
};
</script>

<template>
  <form @submit.prevent="save" class="space-y-2">
    <input
      v-model="form.firstName"
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      placeholder="Ingrese su nombre"
      required
    />
    <input
      v-model="form.lastName"
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      placeholder="Ingrese su apellido"
      required
    />
    <input
      v-model="form.phone"
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      placeholder="Ingrese su telefono"
      required
    />
    <input
      v-model="form.email"
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      placeholder="Ingrese su correo electronico"
      required
    />
    <div class="flex space-x-2">
      <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" type="submit">{{ form.id ? "Actualizar" : "Agregar" }} Contacto</button>
      <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" type="button" @click="resetForm">Limpiar Formulario</button>
    </div>
  </form>
</template>

<style scoped></style>
