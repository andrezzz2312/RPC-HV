// Variables
let videoloop = ''
let video1 = ''
let video2 = ''
let video3 = ''
let textContent = ''
let label = ''
let labelCont = ''
let paragraph = ''
let line = ''
let svg1 = ''
let circle = ''
let backButton = ''
let backButtonContainer = ''
let containVideoWidth = ''
let containVideoHeight = ''
let video1check = false
let video2check = false
let video3check = false

let pCont = ''
let list = ''
let x = window.matchMedia('(max-height: 550px)')
const loop = document.querySelector('#loopVideo')
const loopContainer = document.querySelector('#loop')
const videoHolder = document.querySelector('#videoHolder')
const mainButtons = document.querySelector('#mainButtons')
const showCont = document.querySelector('#showCont')
const svgContainer = document.querySelectorAll('.svgContainer')
const buttonContainer = document.querySelectorAll('.buttonContainer')
const mainContainer = document.querySelector('.container')
const loader = document.querySelector('.loader')
const viewR_button = document.querySelector('#viewR_button')
const initial = document.querySelector('.initial')
const warningText = document.querySelector('.warningText')
const warning = document.querySelector('.warning')
const expand = document.querySelector('#expand')
const contract = document.querySelector('#contract')
const close = document.querySelector('#close')
const alertdiv = document.querySelector('.alertdiv')
const modalalert = document.querySelector('.modalalert')
const quality = document.querySelector('#quality_button')

let details = navigator.userAgent
let regexp = /android|iphone|kindle|ipad/i
let ios = /iphone|ipad/i
let macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i
let isMobileDevice = regexp.test(details)
let isIOS = ios.test(details)
let isMac = macosPlatforms.test(details)

// Display fullscreen button
if (!isMobileDevice) {
	fullscreen_button.style.display = 'none'
} else {
	if (isIOS) {
		fullscreen_button.style.display = 'none'
	}
}
if (isMac) {
	alertdiv.style.display = 'flex'
}

// Set which videos are going to swap
function InterpolateVideo(videoToPause, videoToVanish, videoToPlay) {
	videoToPause.pause()
	videoToVanish.classList.add('short-vanish')
	setTimeout(() => {
		videoToPlay.play()
	}, 250)
}

// loop.currentTime = 60
// Vanish/show the main buttons and svgs
function HideShowMainButtons() {
	mainButtons.classList.toggle('show')
	mainButtons.classList.toggle('disabled')
	mainButtons.classList.toggle('short-vanish')
}

// Vanish/show when a main button is pressed
function HideShowCont() {
	showCont.classList.remove('hidden')
	showCont.classList.toggle('short-vanish')
	showCont.classList.toggle('show')
}

// Set animations for the buttons
function animations() {
	labelCont.style.animation =
		'growtall 0.5s cubic-bezier(0.86, 0.01, 0.77, 0.18) forwards '
	label.style.animation = 'fadein 0.5s ease-in-out forwards'
	pCont.style.animation =
		'grow 0.5s cubic-bezier(0.86, 0.01, 0.77, 0.18) forwards'
	list.style.animation = 'fadein 0.5s ease-in-out forwards'
	labelCont.style.animationDelay = '0.5s'
	label.style.animationDelay = '1s'
	pCont.style.animationDelay = '1s'
	list.style.animationDelay = '1.5s'
}

// Create the video tags storaged in videoContainer div
function createVideos(source1, source2, source3) {
	if (source1) {
		video1 = document.createElement('video')
		video1.src = source1
		video1.muted = true
		video1.setAttribute('playsinline', 'playsinline')
		video1.controls = false
		video1.autoplay = true
		video1.classList.add('video')
		video1.style.zIndex = '-2'
		video1.pause()
		loopContainer.appendChild(video1)
	}
	if (source2) {
		video2 = document.createElement('video')
		video2.src = source2
		video2.loop = true
		video2.muted = true
		video2.setAttribute('playsinline', 'playsinline')

		video2.controls = false
		video2.autoplay = true
		video2.classList.add('video')
		video2.style.zIndex = '-3'
		video2.pause()
		loopContainer.appendChild(video2)
	}
	if (source3) {
		video3 = document.createElement('video')
		video3.src = source3
		video3.muted = true
		video3.autoplay = true
		video3.setAttribute('playsinline', 'playsinline')
		video3.controls = false
		video3.classList.add('video')
		video3.style.zIndex = '-4'
		video3.pause()
		loopContainer.appendChild(video3)
	}
}

// Create the content storaged in showCont div / Left and Top position of the container div, label title and content of the paragraph
function createContent(textLeft, textTop, labelTitle, pContent, labelPad) {
	const centerContainerMade = document.createElement('div')
	centerContainerMade.classList.add('centerContainer')
	centerContainerMade.setAttribute('id', 'centerContainer_text')
	const textContainerMade = document.createElement('div')
	textContainerMade.classList.add('textContainer')
	textContainerMade.style.width = containVideoWidth + 'px'
	textContainerMade.style.height = containVideoHeight + 'px'

	textContent = document.createElement('div')

	textContent.classList.add('text')
	textContent.style.left = textLeft
	textContent.style.top = textTop

	labelCont = document.createElement('div')
	labelCont.addEventListener('click', function (e) {
		labelCont.classList.add('checkers')
	})

	labelCont.classList.add('labelCont')

	label = document.createElement('label')
	label.classList.add('label')
	label.innerHTML = labelTitle

	textContent.appendChild(labelCont)
	labelCont.appendChild(label)

	fontvar = `calc(11px + (23 - 11) * ((${
		containVideoWidth + 'px'
	} - 320px) / (1440 - 320)))`

	label.style.fontSize = fontvar

	if (pContent) {
		fontvar = `calc(8px + (20 - 8) * ((${
			containVideoWidth + 'px'
		} - 320px) / (1440 - 320)))`

		pCont = document.createElement('div')
		pCont.classList.add('pCont')

		if (labelPad) {
			labelCont.style.padding = labelPad
		}

		setTimeout(() => {
			textContent.style.width = labelCont.offsetWidth + 'px'
		}, 300)

		list = document.createElement('ul')
		pContent.forEach((e) => {
			paragraph = document.createElement('li')
			paragraph.textContent = e
			paragraph.style.fontSize = fontvar
			list.appendChild(paragraph)
		})
		pCont.appendChild(list)
		textContent.appendChild(pCont)
	}

	showCont.appendChild(textContent)

	showCont.appendChild(centerContainerMade)

	centerContainerMade.appendChild(textContainerMade)
	textContainerMade.appendChild(textContent)
}

// Create the svgs for the showCont div / 4 first parameters are the x and y points of the first and second point respectively, last 2 are the x and y points of the dot

function setFontSizes() {
	const test = document.querySelectorAll('.button')

	let fontvar = `calc(9px + (20 - 9) * ((${
		containVideoWidth + 'px'
	} - 320px) / (1440 - 320)))`

	for (let i = 0; i < test.length; i++) {
		test[i].style.fontSize = fontvar
	}

	let fontvarViewR = `calc(7px + (17 - 7) * ((${
		containVideoWidth + 'px'
	} - 320px) / (1440 - 320)))`

	viewR_button.style.fontSize = fontvarViewR
}

function backButtonFunction() {
	ArreglarLineas()

	backButton.style.pointerEvents = 'none'
	InterpolateVideo(video2, video2, video3)
	HideShowCont()
	loop.style.zIndex = '-5'
	loop.classList.remove('short-vanish')
	loop.currentTime = 0
	loop.pause()
	video3.addEventListener('ended', () => {
		video3.classList.add('short-vanish')
		setTimeout(() => {
			loop.play()
		}, 500)

		HideShowMainButtons()
		setTimeout(() => {
			loop.style.zIndex = '-1'
			video1.remove()
			video2.remove()
			video3.remove()
			showCont.innerHTML = ''
		}, 500)
	})
}

function createBackButton() {
	const centerContainerMade = document.createElement('div')
	centerContainerMade.classList.add('centerContainer')
	centerContainerMade.setAttribute('id', 'centerContainer_backButton')
	const buttonContainerMade = document.createElement('div')
	buttonContainerMade.classList.add('buttonContainer')
	buttonContainerMade.style.width = containVideoWidth + 'px'
	buttonContainerMade.style.height = containVideoHeight + 'px'
	backButton = document.createElement('button')
	let fontvar = `calc(7px + (17 - 7) * ((${
		containVideoWidth + 'px'
	} - 320px) / (1440 - 320)))`
	backButton.style.fontSize = fontvar
	backButton.classList.add('viewR_a')
	backButton.textContent = 'Back to Features'
	backButtonContainer = document.createElement('div')
	backButtonContainer.classList.add('viewR_container')
	showCont.appendChild(centerContainerMade)
	centerContainerMade.append(buttonContainerMade)
	buttonContainerMade.appendChild(backButtonContainer)
	backButtonContainer.appendChild(backButton)

	backButton.addEventListener('click', backButtonFunction)
}

function ArreglarLineas() {
	for (let i = 0; i < svgContainer.length; i++) {
		svgContainer[i].style.width = containVideoWidth + 'px'
		svgContainer[i].style.height = containVideoHeight + 'px'
	}
	for (let i = 0; i < buttonContainer.length; i++) {
		buttonContainer[i].style.width = containVideoWidth + 'px'
		buttonContainer[i].style.height = containVideoHeight + 'px'
	}
	// mainButtons.style.opacity = '0'
	if (!mainButtons.classList.contains('disabled')) {
		mainButtons.classList.add('show')
	}
}

function getRenderedSize(contains, cWidth, cHeight, width, height, pos) {
	var oRatio = width / height,
		cRatio = cWidth / cHeight
	return function () {
		if (contains ? oRatio > cRatio : oRatio < cRatio) {
			this.width = cWidth
			this.height = cWidth / oRatio
		} else {
			this.width = cHeight * oRatio
			this.height = cHeight
		}
		this.left = (cWidth - this.width) * (pos / 100)
		this.right = this.width + this.left
		return this
	}.call({})
}

function getImgSizeInfo(img) {
	var pos = window
		.getComputedStyle(img)
		.getPropertyValue('object-position')
		.split(' ')
	return getRenderedSize(
		true,
		img.offsetWidth,
		img.offsetHeight,
		img.videoWidth,
		img.videoHeight,
		parseInt(pos[0])
	)
}

loop.addEventListener('loadedmetadata', function (e) {
	containVideoWidth = getImgSizeInfo(loop).width
	containVideoHeight = getImgSizeInfo(loop).height
	setFontSizes()
	ArreglarLineas()

	initial.classList.add('short-vanish')
	setTimeout(() => {
		initial.style.zIndex = '-200'
	}, 500)
})

if (loop.readyState >= 1) {
	setFontSizes()
	containVideoWidth = getImgSizeInfo(loop).width
	containVideoHeight = getImgSizeInfo(loop).height
	ArreglarLineas()

	initial.classList.add('short-vanish')
	setTimeout(() => {
		initial.style.zIndex = '-200'
	}, 500)
}

window.addEventListener('DOMContentLoaded', function () {
	setFontSizes()
	if (window.matchMedia('(max-width: 520px)').matches) {
		if (window.matchMedia('(orientation: portrait)').matches) {
			warningText.innerHTML =
				' Use the device in landscape mode in order to properly use this website'
			warning.style.opacity = '1'
			warning.style.zIndex = '300'
		}
	}
})

window.addEventListener('resize', function () {
	if (loop.readyState >= 1) {
		containVideoWidth = getImgSizeInfo(loop).width
		containVideoHeight = getImgSizeInfo(loop).height

		setFontSizes()

		if (!mainButtons.classList.contains('disabled')) {
			ArreglarLineas()
		}
	}
	if (window.matchMedia('(max-width: 520px)').matches) {
		if (window.matchMedia('(orientation: portrait)').matches) {
			warningText.innerHTML =
				' Use the device in landscape mode in order to properly use this website'
			warning.style.opacity = '1'
			warning.style.zIndex = '300'
		}
	} else {
		if (window.matchMedia('(orientation: landscape)').matches) {
			warning.style.opacity = '0'
			warning.style.zIndex = '-100'
			window.scrollTo(0, document.body.scrollHeight)
		}
	}
	// if(){}
})

////////// Event Listeners for the main buttons //////////

fullscreen_button.addEventListener('click', function (e) {
	expand.classList.toggle('disabledb')
	contract.classList.toggle('disabledb')

	if (!document.fullscreenElement) {
		mainContainer.webkitRequestFullscreen()
		mainContainer.webkitEnterFullscreen()
		mainContainer.requestFullscreen()
	} else {
		document.exitFullscreen()
		document.webkitExitFullscreen()
	}
})

easyC_button.addEventListener('click', function (e) {
	HideShowMainButtons()

	createVideos(
		'assets/easyC/easyC1.mp4',
		'assets/easyC/easyC2.mp4',
		'assets/easyC/easyC3.mp4'
	)

	createContent(
		'15%',
		'13%',
		`Fast Changeover&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
		[
			`Tolless`,
			'Supported by scales, pointers and quick release handles',
			'HMI guides user through numbered changeover points with interactive guide',
			'Live sensor map',
			'Live sensor maps',
			'Advanced maintenance features',
			'Complete in under 5min by trained technician ',
		],
		'2vh 4vh 1.5vh 3.5vh'
	)

	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const textContainer = document.querySelector('#centerContainer_text')

			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)
			textContainer.remove()

			backButtonContainer.remove()
			createContent(
				'15%',
				'13%',
				`Fast Changeover&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
				[
					`Tolless`,
					'Supported by scales, pointers and quick release handles',
					'HMI guides user through numbered changeover points with interactive guide',
					'Live sensor map',
					'Live sensor maps',
					'Advanced maintenance features',
					'Complete in under 5min by trained technician ',
				],
				'2vh 4vh 1.5vh 3.5vh'
			)

			animations()
			createBackButton()
		}
	})

	check1()

	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)
		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 3000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					video1.addEventListener('ended', () => {
						animations()
						InterpolateVideo(loop, video1, video2)
						HideShowCont()
					})
				}, 500)
			}
		}
	}
})

reliableP_button.addEventListener('click', function (e) {
	HideShowMainButtons()

	createVideos(
		'assets/reliableP/reliableP1.mp4',
		'assets/reliableP/reliableP2.mp4',
		'assets/reliableP/reliableP3.mp4'
	)

	createContent(
		'65%',
		'40%',
		`Reliable Product\nAcquisition and Packing`,
		[
			`Vision and line tracking`,
			'Allows robot to calculate pick position',
			'Allows random product orientation',
		],
		'2vh 4vh 1.5vh 3.5vh'
	)

	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const textContainer = document.querySelector('#centerContainer_text')

			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)
			textContainer.remove()

			backButtonContainer.remove()
			createContent(
				'55.5%',
				'38%',
				`Intuitive aHMI with\nPallet Configuration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
				[`Easily create, modify, copy or clear recipes`],
				'2vh 4vh 1.5vh 3.5vh'
			)
			animations()
			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)
		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 3000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					video1.addEventListener('ended', () => {
						animations()
						InterpolateVideo(loop, video1, video2)
						HideShowCont()
					})
				}, 500)
			}
		}
	}
})

scalable_button.addEventListener('click', function (e) {
	HideShowMainButtons()

	createVideos(
		'assets/scalable/scalable1.mp4',
		'assets/scalable/scalable2.mp4',
		'assets/scalable/scalable3.mp4'
	)

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const textContainer = document.querySelector('#centerContainer_text')

			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)
			textContainer.remove()

			backButtonContainer.remove()
			createContent(
				'70%',
				'30%',
				'Scalable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
				[
					'One, two or three delta robot modules',
					'Increases speed from 65 to 160 products per minute ',
				],
				'2vh 4vh 1.5vh 3.5vh'
			)
			animations()

			createBackButton()
		}
	})
	createContent(
		'70%',
		'30%',
		'Scalable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		[
			'One, two or three delta robot modules',
			'Increases speed from 65 to 160 products per minute ',
		],
		'2vh 4vh 1.5vh 3.5vh'
	)

	createBackButton()

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)
		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 3000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					video1.addEventListener('ended', () => {
						animations()
						InterpolateVideo(loop, video1, video2)
						HideShowCont()
					})
				}, 500)
			}
		}
	}
})

superiorC_button.addEventListener('click', function (e) {
	HideShowMainButtons()

	createVideos(
		'assets/superiorC/superiorC1.mp4',
		'assets/superiorC/superiorC2.mp4',
		'assets/superiorC/superiorC3.mp4'
	)

	createContent(
		'11%',
		'37.5%',
		'Superior Case Operation',
		[
			`High friction side belt case conveyor`,
			'Provides reliable case containment',
		],
		'2vh 4vh 1.5vh 3.5vh'
	)

	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const textContainer = document.querySelector('#centerContainer_text')

			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)
			textContainer.remove()

			backButtonContainer.remove()
			createContent(
				'11%',
				'37.5%',
				'Continous&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\nOperation',
				[`Exchange full pallet while other pallet is being built`],
				'2vh 4vh 1.5vh 3.5vh'
			)
			animations()
			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)
		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 3000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					video1.addEventListener('ended', () => {
						animations()
						InterpolateVideo(loop, video1, video2)
						HideShowCont()
					})
				}, 500)
			}
		}
	}
})

reliableO_button.addEventListener('click', function (e) {
	HideShowMainButtons()

	createVideos(
		'assets/reliableO/reliableO1.mp4',
		'assets/reliableO/reliableO2.mp4',
		'assets/reliableO/reliableO3.mp4'
	)
	createContent(
		'65%',
		'35%',
		`Reliable Operation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
		[
			'Robot Mean Time Between Failures: over 100,000 hrs',
			'Allows robot to calculate pick position',
		],
		'2vh 4vh 1.5vh 3.5vh'
	)

	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const textContainer = document.querySelector('#centerContainer_text')

			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)
			textContainer.remove()

			backButtonContainer.remove()
			createContent(
				'65%',
				'35%',
				`Reliable Operation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
				[
					'Robot Mean Time Between Failures: over 100,000 hrs',
					'Allows robot to calculate pick position',
				],
				'2vh 4vh 1.5vh 3.5vh'
			)
			animations()
			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)

		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 3000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					video1.addEventListener('ended', () => {
						animations()
						InterpolateVideo(loop, video1, video2)
						HideShowCont()
					})
				}, 500)
			}
		}
	}
})
secureP_button.addEventListener('click', function (e) {
	HideShowMainButtons()

	createVideos(
		'assets/secureP/secureP1.mp4',
		'assets/secureP/secureP2.mp4',
		'assets/secureP/secureP3.mp4'
	)
	createContent(
		'65%',
		'35%',
		`Reliable Operation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
		[
			'Robot Mean Time Between Failures: over 100,000 hrs',
			'Allows robot to calculate pick position',
		],
		'2vh 4vh 1.5vh 3.5vh'
	)

	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const textContainer = document.querySelector('#centerContainer_text')

			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)
			textContainer.remove()

			backButtonContainer.remove()
			createContent(
				'65%',
				'35%',
				`Reliable Operation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
				[
					'Robot Mean Time Between Failures: over 100,000 hrs',
					'Allows robot to calculate pick position',
				],
				'2vh 4vh 1.5vh 3.5vh'
			)
			animations()
			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)

		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 3000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					video1.addEventListener('ended', () => {
						animations()
						InterpolateVideo(loop, video1, video2)
						HideShowCont()
					})
				}, 500)
			}
		}
	}
})
dualF_button.addEventListener('click', function (e) {
	HideShowMainButtons()

	createVideos(
		'assets/dualF/dualF1.mp4',
		'assets/dualF/dualF2.mp4',
		'assets/dualF/dualF3.mp4'
	)
	createContent(
		'65%',
		'35%',
		`Reliable Operation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
		[
			'Robot Mean Time Between Failures: over 100,000 hrs',
			'Allows robot to calculate pick position',
		],
		'2vh 4vh 1.5vh 3.5vh'
	)

	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const textContainer = document.querySelector('#centerContainer_text')

			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)
			textContainer.remove()

			backButtonContainer.remove()
			createContent(
				'65%',
				'35%',
				`Reliable Operation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
				[
					'Robot Mean Time Between Failures: over 100,000 hrs',
					'Allows robot to calculate pick position',
				],
				'2vh 4vh 1.5vh 3.5vh'
			)
			animations()
			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)

		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 3000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					video1.addEventListener('ended', () => {
						animations()
						InterpolateVideo(loop, video1, video2)
						HideShowCont()
					})
				}, 500)
			}
		}
	}
})

// Check when the spinner is fully loaded
var SirvOptions = {
	spin: {
		onready: function () {
			initial.classList.remove('show')
			initial.classList.add('short-vanish')
			loader.style.zIndex = '-100'
			setTimeout(() => {
				initial.style.zIndex = '-200'
			}, 300)
		},
	},
}

// View rotation button
viewR_button.addEventListener('click', function (e) {
	loader.classList.remove('short-vanish')
	loader.style.zIndex = '1'
	initial.style.zIndex = '0'
	initial.classList.remove('short-vanish')
	initial.classList.add('show')

	HideShowMainButtons()
	HideShowCont()

	const centerContainerMade = document.createElement('div')
	centerContainerMade.classList.add('centerContainer')
	centerContainerMade.style.opacity = '0'
	centerContainerMade.classList.add('show')
	centerContainerMade.style.zIndex = '100'
	centerContainerMade.setAttribute('id', 'centerContainer_backButton')
	const buttonContainerMade = document.createElement('div')
	buttonContainerMade.classList.add('buttonContainer')
	buttonContainerMade.setAttribute('id', 'buttonContainer_backButton')
	buttonContainerMade.style.width = containVideoWidth + 'px'
	buttonContainerMade.style.height = containVideoHeight + 'px'
	backButton = document.createElement('button')
	backButton.classList.add('viewR_a')
	backButton.textContent = 'Back to Features'
	let fontvar = `calc(7px + (17 - 7) * ((${
		containVideoWidth + 'px'
	} - 320px) / (1440 - 320)))`
	backButton.style.fontSize = fontvar
	backButtonContainer = document.createElement('div')
	backButtonContainer.classList.add('viewR_container')

	mainContainer.appendChild(centerContainerMade)
	centerContainerMade.append(buttonContainerMade)
	buttonContainerMade.appendChild(backButtonContainer)

	backButtonContainer.appendChild(backButton)

	window.addEventListener('resize', function (e) {
		if (centerContainerMade.hasChildNodes()) {
			buttonContainerMade.style.width = containVideoWidth + 'px'
			buttonContainerMade.style.height = containVideoHeight + 'px'

			let fontvar = `calc(7px + (17 - 7) * ((${
				containVideoWidth + 'px'
			} - 320px) / (1440 - 320)))`
			backButton.style.fontSize = fontvar
		}
	})

	backButton.addEventListener('click', function () {
		ArreglarLineas()
		backButton.style.pointerEvents = 'none'
		loop.style.zIndex = '-5'
		loop.currentTime = 0
		loop.classList.remove('short-vanish')

		centerContainerMade.classList.remove('show')
		centerContainerMade.classList.add('short-vanish')

		HideShowCont()
		setTimeout(() => {
			initial.classList.remove('show')
			initial.classList.add('short-vanish')
			loader.style.zIndex = '-100'
			setTimeout(() => {
				initial.style.zIndex = '-200'
			}, 300)
		}, 500)

		HideShowMainButtons()

		setTimeout(() => {
			loop.style.zIndex = '-1'
			showCont.innerHTML = ''

			centerContainer_backButton.remove()
		}, 1000)
	})

	setTimeout(() => {
		const centerContainerMade = document.createElement('div')
		centerContainerMade.classList.add('centerContainer')
		centerContainerMade.setAttribute('id', 'centerContainer_model')
		const model = document.createElement('div')
		model.classList.add('Sirv')
		model.setAttribute(
			'data-src',
			'https://rotation.marketscale.com/Companies/PearsonPackaging/37741_DualDeltaCatcher_RTL_HZ/37741_DualDeltaCatcher_RTL_HZ.spin'
		)

		showCont.appendChild(model)
	}, 1000)
})

close.addEventListener('click', function (e) {
	modalalert.style.pointerEvents = 'none'
	modalalert.style.transform = 'scale(0)'
	alertdiv.style.opacity = 0
	alertdiv.style.pointerEvents = 'none'
})
