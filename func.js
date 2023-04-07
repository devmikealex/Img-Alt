// eslint-disable-next-line
;(() => {
    // INIT
    const PREFIX = 'AAAAA-'
    let count = 0

    // CSS injection
    const style = document.createElement('style')
    style.textContent = `.${PREFIX}marker {border: 4px solid red;box-sizing: border-box;}
        .${PREFIX}markerInput {border: 4px solid blue;}`
    document.head.appendChild(style)

    // Mod ALT from start
    checkIMGtags(document)

    // Observer
    const observer = new MutationObserver(processNewImage)
    observer.observe(document.body, { childList: true, subtree: true })

    // Functions --------------------

    async function processImage(image) {
        image.setAttribute('alt', await GetRandowWord())
        image.classList.add(PREFIX + 'marker')
        image.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopImmediatePropagation()

            e.target.classList.add(`${PREFIX}markerInput`)
            setTimeout(() => {
                const result = prompt('New ALT', e.target.alt)
                if (result) e.target.setAttribute('alt', result)
                e.target.classList.remove(`${PREFIX}markerInput`)
            }, 0)
        })
    }

    function processNewImage(mutationList) {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                for (const newNode of mutation.addedNodes) {
                    if (newNode.tagName === 'IMG') {
                        processImage(newNode)
                    } else {
                        checkIMGtags(newNode)
                    }
                }
            }
        }
    }

    function checkIMGtags(node) {
        node.querySelectorAll('img').forEach((image) => {
            processImage(image)
        })
    }

    async function GetRandowWord() {
        const resp = await fetch('https://random-word-api.herokuapp.com/word')
        const words = await resp.json()
        console.log('🚀 word:', ++count, words[0])
        return words[0]
        // быстрее получать сразу кучу слов разом в массив и потом выдавать по 1-му
        // return 1001
    }
})()
