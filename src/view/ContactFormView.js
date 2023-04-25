class ContactFormView {
    constructor(options) {
        this.$form = this.init()
        this.$inputs = this.$form.find('input')
        this.options = options
    }

    init() {
        return $(`
        <form id="userForm">
             <input id="id" type="hidden">
             <input id="name" type="text" placeholder="Your name">
             <input id="surname" type="text" placeholder="Your surname">
             <input id="phone" type="number" placeholder="Phone number">
             <button id="buttonSave">Save</button>
        </form>`)
            .on('submit', this.onFormSubmit.bind(this))
    }

    onFormSubmit(e) {
        e.preventDefault()

        const contact = this.getFormData()

        if(!this.isPersonDataValid(contact)) {
            showError(new Error('Введите корректные данные!'))
            return
        }

        this.options.onSubmit(contact)
    }

    renderFormView(root) {
        root.append(this.$form)
    }

    isPersonDataValid(person) {
        return (person.name !== '') && (person.surname !== '') && (person.phone !== '') && (isNaN(person.phone) === false)
    }

    getFormData() {
        const data = {}

        for (const input of this.$inputs) {
            data[input.id] = input.value
        }

        return data
    }

    fillForm(data) {
        for (const input of this.$inputs) {
            input.value = data[input.id]
        }
    }


    clearForm() {
        for (const input of this.$inputs) {
            input.value = ''
        }
    }

}