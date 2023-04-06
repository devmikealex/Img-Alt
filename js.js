// INIT
const PREFIX = 'AAAAA-'

document.querySelector('button').addEventListener('click', () => {
    const img = document.createElement('img')
    img.src =
        'https://motor.ru/thumb/1280x720/filters:quality(75)/imgs/2020/09/07/14/4099186/52d8f45d1ae944564ab28538f5a79af4894c5106.jpg'
    document.body.appendChild(img)
})

// CSS
const style = document.createElement('style')
style.textContent = `
.${PREFIX}marker {
    border: 4px solid red;

}
.${PREFIX}markerInput {
    border: 4px solid blue;
}
`
document.head.appendChild(style)

// Mod ALT
const images = document.querySelectorAll('img')
images.forEach((image) => {
    processImage(image)
})

// Observer
const targetNode = document.body
const config = { childList: true, subtree: true }
const observer = new MutationObserver(processNewImage)
observer.observe(targetNode, config)

// Functions

async function processImage(image) {
    image.setAttribute('alt', await GetRandowWord())
    image.classList.add(PREFIX + 'marker')
    image.addEventListener('click', (e) => {
        e.target.classList.add(`${PREFIX}markerInput`)
        setTimeout(() => {
            const result = prompt('New ALT', e.target.alt)
            if (result) e.target.setAttribute('alt', result)
            e.target.classList.remove(`${PREFIX}markerInput`)
        }, 0)
    })
}

function processNewImage(mutationList, observer) {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            const newNode = mutation.addedNodes[0]
            if (newNode.tagName === 'IMG') processImage(newNode)
        }
    }
}

async function GetRandowWord() {
    const resp = await fetch('https://random-word-api.herokuapp.com/word')
    const words = await resp.json()
    const word = words[0]
    console.log('🚀 word:', word)
    return word
}
