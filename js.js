document.querySelector('button').addEventListener('click', () => {
    const img = document.createElement('img')
    img.src =
        'https://motor.ru/thumb/1280x720/filters:quality(75)/imgs/2020/09/07/14/4099186/52d8f45d1ae944564ab28538f5a79af4894c5106.jpg'
    document.body.appendChild(img)
})
