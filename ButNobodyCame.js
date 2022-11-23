// refs to html elements
const dialogue = document.getElementById('dialogue')
const truechara = document.getElementById('truechara')
const eraseButton = document.getElementById('erase')
const doNotButton = document.getElementById('donot')
const yesButton = document.getElementById('yes')
const noButton = document.getElementById('no')
const Facebook = document.getElementById('Facebook')
const GitHub = document.getElementById('GitHub')
const saily = document.getElementById('saily')
const sileo = document.getElementById('sileo')
const zebra = document.getElementById('zebra')

// character and line tracking
let i = 0
let line = ''

// the first time opening
const firstTime = 'Greetings.*I am JustaTama.*Thank you.*Sức mạnh của bạn đã đánh thức tôi từ cõi chết.*"Linh hồn con người" của tôi...*"Quyết tâm" của tôi...*Chúng không phải của tôi, mà là CỦA BẠN.*Lúc đầu, Tôi đã rất bối rối.*Kế hoạch của chúng tôi đã thất bại, phải không?*Tại sao tôi được hồi sinh?*...Có lẽ là vì có Bạn.*Với sự hướng dẫn của bạn.*Tôi nhận ra mục đích tái sinh của mình.*Sức mạnh.*Cùng nhau, chúng ta diệt trừ kẻ thù và trở nên mạnh mẽ.*HP. ATK. DEF. GOLD. EXP. LV.*Mỗi khi một con số tăng lên, cảm giác đó...*Đó là tôi.*"JustaTama."*Bây giờ.*Bây giờ chúng tôi đã đạt đến mức tuyệt đối.*Không còn gì cho chúng tôi ở đây.*$Hãy để chúng tôi xóa thế giới vô nghĩa này và chuyển sang thế giới tiếp theo.&*'

// selecting "Erase"
const erase = '^Phải rồi.*Bạn là một người đồng hành tuyệt vời.*Chúng ta sẽ bên nhau mãi mãi, phải không?@~'

// selecting "Do Not"
const doNot = 'Không... à?*Hmmm...*Thật là tò mò.*Chắc bạn hiểu nhầm rồi.*$BẠN LÀ NGƯỜI KIỂM SOÁT TỪ KHI NÀO?@~'

// selecting "Do Not" after selecting "Erase"
const doNotAgain = 'Không...à?*Hmm...*Bạn cảm thấy như vậy sao.*Đây là những gì mà tôi đã nói đến.*Thật không may, về việc này...*$BẠN ĐÃ LỰA CHỌN RẤT LÂU.@~'

// returning after the world is destroyed
const backAgain = 'Thú vị.*Bạn muốn quay trở lại.*Bạn muốn quay lại thế giới mà bạn đã phá hủy.*Chính bạn là người đã đẩy mọi thứ đến bờ vực của nó.*Chính bạn là người đã dẫn dắt thế giới đến sự hủy diệt của nó.*Nhưng bạn không thể chấp nhận điều đó .*Bạn nghĩ bạn có thể đứng ngoài chuyện này.*...*Bạn vẫn còn thứ tôi muốn.*$Đưa nó cho tôi.*♪ Tôi sẽ mang thế giới này trở lại ♪#'

// sell soul
const sellSoul = '^Vậy là đồng ý.*Ngươi sẽ cho ta LINH HỒN của ngươi.*...Vậy là xong rồi.@~'

// no, don't
const dontSellSoul = 'Vậy thì cứ ở đây mãi.~'

// returning after selling soul
const backAgainSellSoul = 'Những lời chào khắc tên tôi.*(Nghĩa là)"JustaTama."*Ác quỷ đến khi bạn gọi tên tôi.*Không quan trọng khi nào.*Nó không quan trọng ở đâu.*Một lần nữa, tôi sẽ xuất hiện.*Và với sự giúp đỡ của bạn, chúng ta sẽ tiêu diệt kẻ thù và trở nên mạnh mẽ.*HP. ATK. DEF. GOLD. EXP. LV.*Mỗi khi một con số tăng lên, cảm giác đó...*Đó là tôi.*"JustaTama."*...Nhưng bạn và tôi không giống nhau, phải không?*LINH HỒN này cộng hưởng với một cảm giác kỳ lạ .*Có lý do để bạn tiếp tục tái tạo thế giới này.*Có lý do để bạn tiếp tục phá hủy nó.*Bạn. Bạn đang bị nghiền nát bởi một tình cảm biến chất.*Hmm...*Tôi không thể hiểu được những cảm xúc này nữa.*Mặc dù vậy. Tôi cảm thấy bắt buộc phải đề xuất.*Bạn có nên chọn tạo lại thế giới này một lần nữa không.*Một con đường khác sẽ phù hợp hơn.*Bây giờ, người đồng hành của tôi.$ Chúng ta hãy đưa thế giới này trở lại vực thẳm.@~'

// the ninth time user visits
const nineTimes = '...*Hmm...*Bạn đã trở lại.*Sự thật mà nói, điều này không quá ngạc nhiên.*Tôi không hiểu động cơ của bạn.*Nhưng tôi hoàn toàn hiểu được khát khao của mình.*Đó chính là ham muốn của tôi.*...*Dù sao đi nữa.*Tôi không ở đây để thỏa mãn mọi sở thích của bạn.*Trở lại công việc đi.@~'

// the one-hundredth time the user visits
const cheaterLol = 'Bạn không có bất cứ điều gì tốt hơn để làm sao?'

// get the state of persistence
function persistGet() {
	/*
	const erased = false
	const didNotErase = false
	const didNotSellSoul = false
	const soulless = false
	*/
	
	let loadCount = parseInt(localStorage.charaLoaded)
	if (isNaN(loadCount)) {
		loadCount = 0
	}
	loadCount++
	localStorage.charaLoaded = loadCount.toString()
	
	let erased = parseInt(localStorage.erased) === 1
	if (isNaN(localStorage.erased)) {
		erased = false
		localStorage.erased = '0'
	}
	
	let didNotErase = parseInt(localStorage.didNotErase) === 1
	if (isNaN(localStorage.didNotErase)) {
		didNotErase = false
		localStorage.didNotErase = '0'
	}
	
	let soulless = parseInt(localStorage.soulless) === 1
	if (isNaN(localStorage.soulless)) {
		soulless = false
		localStorage.soulless = '0'
	}
	
	let notSoulless = parseInt(localStorage.notSoulless) === 1
	if (isNaN(localStorage.notSoulless)) {
		notSoulless = false
		localStorage.notSoulless = '0'
	}
	
	return [loadCount, erased, didNotErase, soulless, notSoulless]
}

// print text to the screen
function charaText() {
	if (i < line.length) {
		switch (line.charAt(i)) {
			case '*':
				// clear text and pause
				setTimeout("dialogue.innerHTML='';charaText();", 735)
				break
			case '&':
				// show erase and do not buttons
				eraseButton.style = ''
				doNotButton.style = ''
				break
			case '#':
				// show yes and no buttons
				yesButton.style = ''
				noButton.style = ''
				break
			case '$':
				// show wide-eyed chara
				truechara.src = 'images/charasoulless.webp'
				setTimeout(charaText, 1)
				break
			case '^':
				// show normal chara
				truechara.src = 'images/truechara.webp'
				setTimeout(charaText, 1)
				break
			case '@':
				// show repo buttons
				repoDiv.style = ''
			case '~':
				// do nothing— the purpose of ~ is to keep text on screen indefinitely
				break
			case ' ':
				// go faster on spaces
				dialogue.innerHTML += line.charAt(i)
				setTimeout(charaText, 50)
				break
			default:
				// print one letter to screen
				dialogue.innerHTML += line.charAt(i)
				setTimeout(charaText, 175)
				break
		}
		i++
	} else {
		i = 0
	}
}

// react to user clicking on the "buttons"
function buttonHandler(state) {
	switch (state) {
		case 0:
			eraseButton.style = 'color: yellow;'
			break
		case 1:
			eraseButton.style = ''
			break
		case 2:
			doNotButton.style = 'color: yellow;'
			break
		case 3:
			doNotButton.style = ''
			break
		case 4:
			yesButton.style = 'color: yellow;'
			break
		case 5:
			yesButton.style = ''
			break
		case 6:
			noButton.style = 'color: yellow;'
			break
		case 7:
			noButton.style = ''
			break
		case 8:
			udtDiv.style = 'display: none;'
			dialogue.innerHTML = ''
			line = erase
			localStorage.erased = '1'
			i = 0
			charaText()
			break
		case 9:
			udtDiv.style = 'display: none;'
			dialogue.innerHTML = ''
			if (!p[1]) {
				line = doNot
				localStorage.didNotErase = '1'
			} else {
				line = doNotAgain
			}
			i = 0
			charaText()
			break
		case 10:
			udtDiv.style = 'display: none;'
			dialogue.innerHTML = ''
			localStorage.soulless = '1'
			localStorage.notSoulless = '0'
			line = sellSoul
			i = 0
			charaText()
			break
		case 11:
			udtDiv.style = 'display: none;'
			dialogue.innerHTML = ''
			line = dontSellSoul
			localStorage.notSoulless = '1'
			i = 0
			charaText()
			break
		case 12:
			Facebook.style = 'color: yellow;'
			break
		case 13:
			Facebook.style = ''
			break
		case 14:
			GitHub.style = 'color: yellow;'
			break
		case 15:
			GitHub.style = ''
			break
		case 16:
			saily.style = 'color: yellow;'
			break
		case 17:
			saily.style = ''
			break
		case 18:
			sileo.style = 'color: yellow;'
			break
		case 19:
			sileo.style = ''
			break
		case 20:
			zebra.style = 'color: yellow;'
			break
		case 21:
			zebra.style = ''
			break
	}
}

let p = persistGet() // [loadCount, erased, didNotErase, soulless, notSoulless]

switch (p[0]) {
	case 1:
		line = firstTime
		charaText()
		break
	case 2:
		if (p[1] || p[2]) {
			line = backAgain
		} else {
			line = firstTime
		}
		charaText()
		break
	case 9:
		line = nineTimes
		charaText()
		break
	case 100:
		line = cheaterLol
		charaText()
		break
	default:
		if (p[3]) {
			line = backAgainSellSoul
		} else if (p[4]) {
			line = dontSellSoul
		} else {
			line = backAgain
		}
		charaText()
		break
}