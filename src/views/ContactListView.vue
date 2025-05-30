<script setup>
import { useContactStore } from "../stores/contactStore";
import { ref, computed, onMounted } from "vue";
import ContactForm from "../components/ContactForm.vue";

const contactStore = useContactStore();
const contacts = computed(() => contactStore.contacts);
const selectedContact = ref(null);

// Al cargar la vista, trae los contactos reales de la API
onMounted(() => {
  contactStore.fetchContacts();
  console.log("👀 Lista de contactos (mounted):", contactStore.contacts);
});


const saveContact = async (contact) => {
  if (contact.id) {
    // El contacto ya existe → estamos editando
    await contactStore.updateContact(contact);
  } else {
    // Es un contacto nuevo → estamos creando
    const newId = Date.now();
    await contactStore.addContact({ ...contact, id: newId });
  }
  await contactStore.fetchContacts();
  selectedContact.value = null;
};

const editContact = (contact) => {
  selectedContact.value = { ...contact };
};

const deleteContact = async (id) => {
  await contactStore.removeContact(id);
};
</script>

<template>
  <div class="px-5 pt-0.5">
    <h1 class="text-3xl mt-2.5 mb-1.5">Lista de Contactos</h1>
    <hr class="mb-4 border-gray-300" />

    <!-- Contenedor principal: flex para la división 30%/70% -->
    <div class="md:flex md:space-x-4">
      <!-- Formulario (30%) -->
      <div class="md:flex-[0_0_30%]">
        <ContactForm :contact="selectedContact" @save="saveContact" />
      </div>

      <!-- Línea vertical separadora (solo md+) -->
      <div class="hidden md:block w-px bg-gray-300"></div>

      <!-- Lista de contactos (70%) -->
      <div class="md:flex-[0_0_70%] mt-4 md:mt-0">
        <table class="min-w-full border border-gray-300 text-left text-sm text-gray-700">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 font-semibold">Nombres</th>
              <th class="p-2 font-semibold">Apellidos</th>
              <th class="p-2 font-semibold">Telefono</th>
              <th class="p-2 font-semibold">Correo</th>
              <th class="p-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id" class="border-t border-gray-200 hover:bg-gray-50">
              <td class="py-1 px-2">{{ contact.firstName }}</td>
              <td class="py-1 px-2">{{ contact.lastName }}</td>
              <td class="py-1 px-2">{{ contact.phone }}</td>
              <td class="py-1 px-2">{{ contact.email }}</td>
              <td class="py-1 space-x-2 px-2">
                <button @click="editContact(contact)" class="text-blue-500">Editar</button>
                <button @click="deleteContact(contact.id)" class="text-red-500">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
