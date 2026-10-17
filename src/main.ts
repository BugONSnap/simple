import { mount } from 'svelte';
import '@fontsource/gloock/400.css';
import '@fontsource-variable/hanken-grotesk';
import './app.css';
import App from './App.svelte';

mount(App, { target: document.getElementById('app')! });
