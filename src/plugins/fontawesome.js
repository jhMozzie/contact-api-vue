// src/plugins/fontawesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Agrega los íconos que usarás
library.add(faPen, faTrash);

export default FontAwesomeIcon;