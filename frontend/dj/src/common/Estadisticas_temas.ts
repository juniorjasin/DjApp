//Interfaces
import { Estadisticas_tema_actual } from './Estadisticas_tema_actual';
import { Estadisticas_tema_propuesta } from './Estadisticas_tema_propuesta';
// import { Boliche } from 'Boliche';

export interface Estadisticas_temas{
	estadisticas_tema_actual:Estadisticas_tema_actual;
	estadisticas_tema_propuesta:Array <Estadisticas_tema_propuesta>;
}