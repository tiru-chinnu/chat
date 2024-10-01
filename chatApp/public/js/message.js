function init() {
    let username = prompt('Enter your username')
    if (username !== '' && username !== null && !username.includes(' ') && !username.includes('.')) {
        sessionStorage.setItem('username', username)
    }
    else {
        init()
    }
}
init()
const socket = new WebSocket(`ws:/${window.location.host}`),
    input = document.querySelector('input[type="text"]')
socket.onopen = (e) => {
    socket.addEventListener('message', (e) => {
        const { username, message } = JSON.parse(e.data)
        if (message !== '' && username !== '') {
            const elem = document.createElement('div'),
                user = document.createElement('div'),
                msg = document.createElement('div')
            elem.classList.add('msg')
            user.classList.add('user')
            msg.classList.add('input_msg')
            user.innerText = username
            msg.innerText = message
            elem.append(user, msg)
            if (sessionStorage.getItem('username') == username) {
                elem.style.alignSelf = 'flex-end'
                user.style.right = 0
                user.style.left = 'unset'
            }
            document.querySelector('.messages').append(elem)
            elem.scrollIntoView({ behavior: 'smooth' })
        }
    })

}
document.querySelector('form[chat="true"]').addEventListener('submit', (e) => {
    e.preventDefault()
    socket.send(JSON.stringify({
        username: sessionStorage.getItem('username'),
        message: input.value
    }))
    input.value = ''
})