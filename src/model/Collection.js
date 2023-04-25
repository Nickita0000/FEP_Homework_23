class Collection {
    #initialList = []

    fetch() {
        return UsersListAPI
            .getList()
            .then((list) => {
                this.#initialList = list
                console.log(this.#initialList)
            })
    }

    getList() {
        return this.#initialList
    }

    delete(id) {
        this.deleteListItem(id)
        UsersListAPI
            .deleteUser(id)

        return Promise.resolve()
    }

    create(contact) {
        return UsersListAPI
            .createUser(contact)
            .then((newContact) => {
                this.addListItem(newContact)

                return newContact
            })
    }

    update(id, contact) {
        return UsersListAPI
            .updateUser(id, contact)
            .then((newContact) => {
                this.editListItem(newContact, id)

                return newContact
            })
    }

    deleteListItem(id) {
        return this.#initialList
            .filter(contactItem => contactItem.id !== id)
    }

    editListItem(newContact, id) {
        return this.#initialList = this.#initialList
            .map(contactItem => contactItem.id === id ? newContact : contactItem)
    }

    addListItem(newContact) {
        return this.#initialList
            .push(newContact);
    }

    findContactById(id) {
        return this.#initialList = this.#initialList
            .find(contact => contact.id === id)
    }
}
