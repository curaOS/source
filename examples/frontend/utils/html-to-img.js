import html2canvas from 'html2canvas'

export const htmlToImg = (html, type = 'image/jpeg', quality = 1) => {
    return html2canvas(html).then(async (canvas) => {
        const croppedCanvas = document.createElement('canvas'),
            croppedCanvasContext = croppedCanvas.getContext('2d'),
            cropPositionTop = 0,
            cropPositionLeft = 0,
            cropWidth = canvas.width,
            cropHeight = canvas.height

        croppedCanvas.width = cropWidth
        croppedCanvas.height = cropHeight

        croppedCanvasContext.drawImage(
            canvas,
            cropPositionLeft,
            cropPositionTop
        )

        const base64Image = croppedCanvas.toDataURL(type, quality)

        return base64Image
    })
}
