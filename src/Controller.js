class Controller {
    constructor($root) {
        this.contactsCollection = new Collection()
        this.contactFormView = new ContactFormView({ onSubmit: this.save.bind(this) })
        this.contactListView = new ContactListView({
            onDeleteBtn: this.onDeleteButtonClick.bind(this),
            onEditBtn: (id => {
                const contact = this.contactsCollection.findContactById(id)

                this.contactFormView.fillForm(contact)
            })
        })

        this.contactFormView.renderFormView($root)
        this.contactListView.renderListView($root)

        this.contactsCollection.fetch()
            .then(() => {
                this.contactListView.renderServerList(this.contactsCollection.getList())
            })
            .catch(e => this.showError(e))
    }

    save(contact) {
        if(contact.id){
            this.contactsCollection.update(contact.id, contact)
                .then((newContact) => {
                    this.contactListView.replaceContact(contact.id, newContact)
                    this.contactFormView.clearForm()
                })
                .catch(e => this.showError(e))
        } else {
            this.contactsCollection.create(contact)
                .then((contact) => {
                    this.contactListView.renderUsersList(contact)
                    this.contactFormView.clearForm()
                })
                .catch(e => this.showError(e))
        }
    }

    onDeleteButtonClick(id) {
        this.contactsCollection.delete(id).catch(e => this.showError(e))

        this.contactListView.removeCurrentContact(id)
    }

    showError(e) {
        alert(e.message)
    }
}