//#region Variables

// References
const form = document.getElementById('form')
const finalWrapper = document.getElementById('final-wrapper')
const final = document.getElementById('final')
const css = document.getElementById('css')

// QueryParams
const paramBoxWidth = 'box-width'
const paramBoxHeight = 'box-height'
const paramBoxRadius = 'box-radius'
const paramBoxMargin = 'box-margin'
const paramBoxColor = 'box-color'
const paramBgColor = 'bg-color'
const paramBoxShadowColor = 'box-shadow-color'
const paramBoxShadowX = 'box-shadow-x'
const paramBoxShadowY = 'box-shadow-y'
const paramBlurRadius = 'blur-radius'
const paramSpreadRadius = 'spread-radius'

// Defaults
const defaultBoxWidth = 200
const defaultBoxHeight = 200
const defaultBoxRadius = 5
const defaultBoxMargin = 20
const defaultBoxColor = '#ffffff'
const defaultBgColor = 'transparent'
const defaultBoxShadowColor = '#111'
const defaultBoxShadowX = 0
const defaultBoxShadowY = 3
const defaultBlurRadius = 5
const defaultSpreadRadius = 0

// Inputs
const inputBoxWidth = document.getElementById('box-width')
const inputBoxHeight = document.getElementById('box-height')
const inputBoxRadius = document.getElementById('box-radius')
const inputBoxMargin = document.getElementById('box-margin')
const inputBoxColor = document.getElementById('box-color')
const inputBgColor = document.getElementById('bg-color')
const inputBoxShadowColor = document.getElementById('box-shadow-color')
const inputBoxShadowX = document.getElementById('box-shadow-x')
const inputBoxShadowY = document.getElementById('box-shadow-y')
const inputBlurRadius = document.getElementById('blur-radius')
const inputSpreadRadius = document.getElementById('spread-radius')

//#endregion

//#region Functions

// Input
function ReadQueryParams() {
  const urlParams = new URLSearchParams(location.search)

  inputBoxWidth.value = +urlParams.get(paramBoxWidth) || defaultBoxWidth
  inputBoxHeight.value = +urlParams.get(paramBoxHeight) || defaultBoxHeight
  inputBoxRadius.value = +urlParams.get(paramBoxRadius) || defaultBoxRadius
  inputBoxMargin.value = +urlParams.get(paramBoxMargin) || defaultBoxMargin
  inputBoxColor.value = urlParams.get(paramBoxColor) || defaultBoxColor
  inputBgColor.value = urlParams.get(paramBgColor) || defaultBgColor
  inputBoxShadowColor.value = urlParams.get(paramBoxShadowColor) || defaultBoxShadowColor
  inputBoxShadowX.value = +urlParams.get(paramBoxShadowX) || defaultBoxShadowX
  inputBoxShadowY.value = +urlParams.get(paramBoxShadowY) || defaultBoxShadowY
  inputBlurRadius.value = +urlParams.get(paramBlurRadius) || defaultBlurRadius
  inputSpreadRadius.value = +urlParams.get(paramSpreadRadius) || defaultSpreadRadius
}

function CopyText(text) {
  const temp = document.createElement('textarea')
  temp.value = text
  document.body.appendChild(temp)
  temp.select()
  document.execCommand('copy')
  temp.remove()
}

function CopyCSS() {
  CopyText(css.innerText)
}

function GenerateLink() {
  const newParams = new URLSearchParams()

  if (+inputBoxWidth.value !== defaultBoxWidth) {
    newParams.append(paramBoxWidth, inputBoxWidth.value)
  }
  if (+inputBoxHeight.value !== defaultBoxHeight) {
    newParams.append(paramBoxHeight, inputBoxHeight.value)
  }
  if (+inputBoxRadius.value !== defaultBoxRadius) {
    newParams.append(paramBoxRadius, inputBoxRadius.value)
  }
  if (+inputBoxMargin.value !== defaultBoxMargin) {
    newParams.append(paramBoxMargin, inputBoxMargin.value)
  }
  if (inputBoxColor.value !== defaultBoxColor) {
    newParams.append(paramBoxColor, inputBoxColor.value)
  }
  if (inputBgColor.value !== defaultBgColor) {
    newParams.append(paramBgColor, inputBgColor.value)
  }
  if (inputBoxShadowColor.value !== defaultBoxShadowColor) {
    newParams.append(paramBoxShadowColor, inputBoxShadowColor.value)
  }
  if (+inputBoxShadowX.value !== defaultBoxShadowX) {
    newParams.append(paramBoxShadowX, inputBoxShadowX.value)
  }
  if (+inputBoxShadowY.value !== defaultBoxShadowY) {
    newParams.append(paramBoxShadowY, inputBoxShadowY.value)
  }
  if (+inputBlurRadius.value !== defaultBlurRadius) {
    newParams.append(paramBlurRadius, inputBlurRadius.value)
  }
  if (+inputSpreadRadius.value !== defaultSpreadRadius) {
    newParams.append(paramSpreadRadius, inputSpreadRadius.value)
  }

  const newURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/?' + newParams.toString()

  CopyText(newURL)
}

// If download true, downloads and stay on page, else show the image on new page
function GeneratePNG(download) {
  const boxWidth = +inputBoxWidth.value
  const boxHeight = +inputBoxHeight.value
  const boxMargin = +inputBoxMargin.value

  const canvas = document.createElement('canvas')
  
  canvas.width = boxWidth + boxMargin * 2
  canvas.height = boxHeight + boxMargin * 2

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = inputBgColor.value
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.shadowOffsetX = +inputBoxShadowX.value
  ctx.shadowOffsetY = +inputBoxShadowY.value
  ctx.shadowBlur = +inputBoxRadius.value
  ctx.shadowColor = inputBoxShadowColor.value

  RoundedRect(ctx, boxMargin, boxMargin, boxWidth, boxHeight, +inputBoxRadius.value)

  ctx.fillStyle = inputBoxColor.value
  ctx.fill()

  // Link
  const link = document.createElement('a')
  link.setAttribute('download', 'box.png')
  link.setAttribute('href', canvas.toDataURL())
  link.click()
  link.remove()
}

// https://stackoverflow.com/a/7838871
function RoundedRect(ctx, x, y, w, h, r) {
  if (r * 2 > w) r = w / 2
  if (r * 2 > h) r = h / 2
 
  ctx.beginPath()
  ctx.moveTo(x+r, y)
  ctx.arcTo(x+w, y  , x+w, y+h, r)
  ctx.arcTo(x+w, y+h, x  , y+h, r)
  ctx.arcTo(x  , y+h, x  , y  , r)
  ctx.arcTo(x  , y  , x+w, y  , r)
  ctx.closePath()
}

function UpdateFinal() {
  const boxWidth = inputBoxWidth.value + 'px'
  const boxHeight = inputBoxHeight.value + 'px'
  const boxRadius = inputBoxRadius.value + 'px'
  const boxMargin = inputBoxMargin.value + 'px'
  const boxColor = inputBoxColor.value
  const bgColor = inputBgColor.value
  const boxShadowColor = inputBoxShadowColor.value
  const boxShadowX = inputBoxShadowX.value + 'px'
  const boxShadowY = inputBoxShadowY.value + 'px'
  const blurRadius = inputBlurRadius.value + 'px'
  const spreadRadius = inputSpreadRadius.value + 'px'

  finalWrapper.style.backgroundColor = bgColor

  final.style.width = boxWidth
  final.style.height = boxHeight
  final.style.margin = boxMargin
  final.style.borderRadius = boxRadius
  final.style.backgroundColor = boxColor
  final.style.boxShadow = `${boxShadowX} ${boxShadowY} ${blurRadius} ${spreadRadius} ${boxShadowColor}`

  css.innerText =
`.wrapper {
  background-color: ${bgColor};
}

.box {
  background-color: ${boxColor};
  width: ${boxWidth};
  height: ${boxHeight};
  margin: ${boxMargin};
  border-radius: ${boxRadius};
  box-shadow: ${boxShadowX} ${boxShadowY} ${blurRadius} ${spreadRadius} ${boxShadowColor};
}`
}

//#endregion

form.oninput = function(evt) {
  evt.preventDefault()
  UpdateFinal()
}

ReadQueryParams()
UpdateFinal()
