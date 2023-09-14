
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'maz-ui/css/main.css'

import ".//assets/css/theme.min.css"
import ".//assets/libs/bootstrap-icons/font/bootstrap-icons.css";
import 'vue-toast-notification/dist/theme-sugar.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'datatables.net-dt/css/jquery.dataTables.css'
import 'datatables.net/js/jquery.dataTables'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import VueToast from 'vue-toast-notification';
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazSlider from 'maz-ui/components/MazSlider'
import MazInputPrice from 'maz-ui/components/MazInputPrice'
import MazBtn from 'maz-ui/components/MazBtn'
const app = createApp(App)
app.component('MazPhoneNumberInput', MazPhoneNumberInput)
app.component('MazInputPrice', MazInputPrice)
app.component('MazSlider', MazSlider)
app.component('MazBtn', MazBtn)

app.use(VueToast);

app.use(VueSweetalert2);
app.use(router).mount('#app');


