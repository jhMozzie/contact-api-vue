import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../services/axiosInstance";

export const useContactStore = defineStore("contact", () => {
    // States
    const contacts = ref([])

    // Obtener lista de contactos
    const fetchContacts = async () => {
      console.log("Obteniendo contactos...")
      try {
        const res = await axiosInstance.get("/contacts");
        contacts.value = res.data;
      } catch (err) {
        console.error("Error al obtener contactos: ", err);
      }
    }

   // Actions
  const addContact = async (contact) => {
    try {
      const res = await axiosInstance.post("/contacts", contact);
      contacts.value.push(res.data);
    } catch (err) {
      console.error("Error al agregar contacto: ", err);
    }
  }

  const updateContact = async (updatedContact) => {
  try {
    const res = await axiosInstance.put(`/contacts/${updatedContact.id}`, updatedContact);
    const index = contacts.value.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      contacts.value[index] = res.data;
    }
  } catch (error) {
    console.error("Error al actualizar contacto: ", error);
  }
}

  const removeContact = async (id) =>{
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      contacts.value = contacts.value.filter(c => c.id !== id);
    } catch (error) {
      console.error("Error al eliminar contacto: ", error);
    }
  }

  return { contacts, fetchContacts, addContact, removeContact, updateContact };
})
