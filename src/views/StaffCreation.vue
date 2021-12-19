<template>
    <form class="container"> 
        <h2>Create an employee</h2>
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="data.username" placeholder="Username" required>
        </div>
        <div class="row">
            <div class="col">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="data.name" required>
            </div>
            <div class="col">
                <label for="surname" class="form-label">Surname</label>
                <input type="text" id="surname" class="form-control" placeholder="Surname" v-model="data.surname" required>
            </div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="data.password" required>
        </div>
        <div class="form-group">
            <label for="role">Role</label>
            <select id="role" class="form-control" v-model="data.role">
                <option value="administrator" selected>Admin</option>
                <option value="manager">Manager</option>
            </select>
        </div>
        <button type="button" @click="create" class="btn btn-primary mt-2">Create</button>

    <!-- Modal for notification -->
        <b-modal ref="notification" :title="modalTitle" :cancel-disabled="true" :ok-disabled="true">
            <p class="my-4">{{modalText}}</p>
            <template #modal-footer="">

            </template>
        </b-modal>

    </form>

</template>
    <script>
    import { apiMixin } from '../mixins/apiMixin';

    export default {
        mixins: [apiMixin],
        data (){
            return {
                data: {
                    username: undefined,
                    name: undefined,
                    surname: undefined,
                    role: 'administrator'
                },
                modalTitle: '',
                modalText: ''
            }
        },
        methods: {
            async create () {
                const { status } =  await this.createStaff(this.data)
                let okVariant = ''
                if(status === 200){
                    this.modalTitle = 'Employee created'
                    this.modalText = 'Employee created correcly'
                    okVariant = 'success'
                }
                else {
                    this.modalTitle = 'Something wrong...'
                    this.modalText = 'Please retry later'
                    okVariant = 'danger'
                    }
                    this.showNotification(this.modalTitle, this.modalText, okVariant)
            },
            showNotification(title, text, okVariant) {
                this.boxTwo = ''
                this.$bvModal.msgBoxOk(text, {
                title,
                size: 'sm',
                buttonSize: 'sm',
                okVariant,
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
                })  
                .then(value => {
                    this.boxTwo = value
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        metaInfo() {
            return { 
                title: "Create employee",
            }
        }
    }
    </script>


    <style scoped>
        form{
        text-align: left;
        max-width: 600px;
        margin: auto;
        padding: 3em;
        height: 100%;
        background-color: white;
        border-radius: 5px;
        }
        form h1, h2{
            text-align: center;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }
        form h1{
            font-size: 2rem;
        }
        form h2{
            font-size: 1.5rem;
        }
        .d-flex{
            gap: 0.3em
        }
    </style>