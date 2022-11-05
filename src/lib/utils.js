import { db } from '$lib/firebase';
import { collection, addDoc, query, onSnapshot  } from 'firebase/firestore';


const dateTimeFormat = new Intl.DateTimeFormat('en-PH', { dateStyle: 'full', timeStyle: 'short' });

export let date = new Date().toLocaleDateString('en-PH', { weekday:"short", year:"numeric", month:"short", day:"numeric"});
export let time = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: "2-digit" });

export function formatDateTime(date, time) {
	const dateTime = new Date(date + ' ' + time);
	return dateTimeFormat.format(dateTime);
}

export function formatDate(date){
	return new Date(date).toLocaleDateString('en-PH', { weekday:"short", year:"numeric", month:"long", day:"numeric"});
}


export let cars = [`Jeepney`, `Tricycle`, `SUV`, `Sedan`, `Van`, `Motorcycle`];
export let motor = [
  {wash: `Full wash`, price: 60},
  {wash: `Pressure wash only`, price: 30},
];
export let tric = [
  {wash: `Full wash`, price: 100},
  {wash: `Pressure wash only`, price: 50},
];
export let jeep = [
  {wash: `Full wash`, price: 250},
  {wash: `Pressure wash only`, price: 125},
];
export let sedan = [
  {wash: `Full wash`, price: 150},
  {wash: `Inner only`, price: 75},
  {wash: `Outer only`, price: 75}
];
export let suv = [
  {wash: `Full wash`, price: 200},
  {wash: `Inner only`, price: 100},
  {wash: `Outer only`, price: 100}
];
export let van = [
  {wash: `Full wash`, price: 230},
  {wash: `Inner only`, price: 115},
  {wash: `Outer only`, price: 115}
];
