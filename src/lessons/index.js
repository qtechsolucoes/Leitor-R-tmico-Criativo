// src/lessons/index.js

import { module1 } from './module1.js';
import { module2 } from './module2.js';
import { module3 } from './module3.js';
import { module4 } from './module4.js';
import { module5 } from './module5.js';
import { module6 } from './module6.js';
import { module7 } from './module7.js';
import { module8 } from './module8.js';
import { module9 } from './module9.js';   // Módulo 9 adicionado
import { module10 } from './module10.js'; // Módulo 10 adicionado

// Une todos os 10 módulos em um único array
export const lessons = [
    ...module1,
    ...module2,
    ...module3,
    ...module4,
    ...module5,
    ...module6,
    ...module7,
    ...module8,
    ...module9,   // Módulo 9 adicionado
    ...module10   // Módulo 10 adicionado
];