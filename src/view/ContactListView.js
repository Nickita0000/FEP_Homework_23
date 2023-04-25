class ContactListView {
    static SELECTOR_BTN_EDIT = '.buttonChange'
    static SELECTOR_BTN_DELETE = '.buttonDelete'
    static SELECTOR_DATA_USER = '.user'

    constructor(options) {
        this.$initTitleView = this.init()
        this.$contactList = this.$initTitleView.find('#contactList')
        this.options = options
    }

    init(){
        return $(`
        <table>
            <tbody id="contactList">
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </tbody>
        </table>`)
            .on('click', ContactListView.SELECTOR_BTN_DELETE, this.onDeleteBtnClick.bind(this))
            .on('click', ContactListView.SELECTOR_BTN_EDIT, this.onEditBtnClick.bind(this))
    }

    onEditBtnClick(e){
        const id = this.findClickElement(e.target)

        this.options.onEditBtn(id)
    }

    onDeleteBtnClick(e){
        const id = this.findClickElement(e.target)

        this.options.onDeleteBtn(id)
    }

    renderListView($root) {
        const $html = this.$initTitleView

        $root.append($html)
    }

    htmlUser(contact) {
        return `
        <tr class="user" data-id="${contact.id}">
            <td class="user__name">${contact.name}</td>
            <td class="user__surname">${contact.surname}</td>
            <td class="user__phone">${contact.phone}</td>
            <td>
                <button class="buttonChange">Edit</button>
                <button class="buttonDelete">Delete</button>
            </td>
        </tr>
        `
    }

    renderServerList(list) {
        const htmlServerEL = list.map(this.htmlUser)
        this.$contactList.html(htmlServerEL)
    }

    renderUsersList(contact) {
        const html = this.htmlUser(contact)

        this.$contactList.append(html)
    }

    replaceContact(id, contact) {
        const $initContact = this.$contactList.find(`[data-id="${id}"]`)
        const newContactItem = this.htmlUser(contact)

        $initContact.replaceWith(newContactItem)
    }

    findClickElement(area) {
        return area.closest(ContactListView.SELECTOR_DATA_USER).dataset.id
    }

    removeCurrentContact(id) {
        this.$contactList.find(`[data-id="${id}"]`).remove()
    }
}