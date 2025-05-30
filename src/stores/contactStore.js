import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../services/axiosInstance";

export const useContactStore = defineStore("contact", () => {
  const contacts = ref([]);

  const fetchContacts = async () => {
  try {
    const res = await axiosInstance.get("/contacts");
    console.log("⚡ Nuevos contactos:", res.data); // Agrega este log para ver los datos
    contacts.value = res.data;
  } catch (err) {
    console.error("Error al obtener contactos: ", err);
  }
};

  const addContact = async (contact) => {
    try {
      await axiosInstance.post("/contacts", contact);
      await fetchContacts(); // 🔥 Confía en esto para actualizar la lista
    } catch (err) {
      console.error("Error al agregar contacto: ", err);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      await axiosInstance.put(`/contacts/${updatedContact.id}`, updatedContact);
      await fetchContacts(); // 🔥 Confía en esto para actualizar la lista
    } catch (error) {
      console.error("Error al actualizar contacto: ", error);
    }
  };

  const removeContact = async (id) => {
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      await fetchContacts(); // 🔥 Confía en esto para actualizar la lista
    } catch (error) {
      console.error("Error al eliminar contacto: ", error);
    }
  };

  return { contacts, fetchContacts, addContact, updateContact, removeContact };
});